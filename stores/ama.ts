import create from 'zustand';
import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import contractABI from '../artifacts/contracts/AMA.sol/AMA.json';
import { Store } from '../types';

function getContract(): Contract {
  const { ethereum } = window;

  if (!ethereum) {
    console.log('No access to the Ethereum object');
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractABI.abi,
    signer,
  );

  return contract;
}

export const useStore = create<Store>((set, get) => ({
  contract: typeof window !== 'undefined' && getContract(),
  items: [],
  loading: false,
  fetchQuestions: async () => {
    const contract = get().contract;
    const items = await contract.getQuestions();
    set({
      loading: false,
      items: items.map((item) => ({
        creator: item.creator,
        timestamp: item.timestamp,
        timestampAsNumber: item.timestamp.toNumber() * 1000,
        text: item.text,
      })),
    });
  },
  ask: async (text) => {
    const contract = get().contract;
    await contract.ask(text, { gasLimit: 300000 });
    set((state: any) => ({
      ...state,
      loading: true,
      items: state.items.concat([
        { text, timestampAsNumber: Date.now(), loading: true },
      ]),
    }));
    contract.on('NewQuestion', async (creator, timestamp, text) => {
      set((state) => ({
        ...state,
        loading: false,
        items: state.items.map((item) => {
          return item.loading
            ? {
                ...item,
                creator,
                timestamp,
                timestampAsNumber: timestamp.toNumber() * 1000,
                text,
                loading: false,
                added: true,
              }
            : item;
        }),
      }));
    });
  },
  getAnswer: async (question) => {
    const contract = get().contract;
    const answer = await contract.getAnswer(
      question.creator,
      question.timestamp,
      {
        gasLimit: 300000,
      },
    );

    set((state: any) => ({
      ...state,
      items: state.items.map((item) =>
        item.creator === question.creator &&
        item.timestamp === question.timestamp
          ? { ...item, answer }
          : item,
      ),
    }));
  },
  answer: async (question, text) => {
    const contract = get().contract;
    const answer = await contract.answer(
      question.creator,
      question.timestamp,
      text,
      {
        gasLimit: 300000,
      },
    );

    set((state: any) => ({
      ...state,
      items: state.items.map((item) =>
        item.creator === question.creator &&
        item.timestamp === question.timestamp
          ? { ...item, answer: { text, loading: true } }
          : item,
      ),
    }));

    contract.on('NewAnswer', async (creator, timestamp, text) => {
      const answer = { timestamp: timestamp.toNumber() * 1000, text };
      set((state: any) => ({
        ...state,
        items: state.items.map((item) =>
          item.creator === creator && item.answer?.loading
            ? { ...item, answer: { ...answer, loading: false, added: true } }
            : item,
        ),
      }));
    });
  },
}));
