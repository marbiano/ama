import { ethers } from 'ethers';
import * as React from 'react';

import contractABI from '../artifacts/contracts/AMA.sol/AMA.json';

const METAMASK_ACTIONS = {
  eth_accounts: 'eth_accounts',
  eth_requestAccounts: 'eth_requestAccounts',
};

export default function Index() {
  const { questions, ask } = useQuestions();
  const { account, connect } = useEthAccount();
  const [question, setQuestion] = React.useState('');

  return (
    <div>
      Welcome to my AMA{' '}
      {!account && (
        <button type="button" onClick={connect}>
          Connect Wallet
        </button>
      )}
      {account && (
        <>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="button" onClick={() => ask(question)}>
            Ask a question
          </button>
        </>
      )}
      {questions.length > 0 && (
        <ul>
          {questions.map((q) => (
            <li key={q.createdAt}>{q.question}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function useEthAccount() {
  const [account, setAccount] = React.useState();

  React.useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('No access to the Ethereum object');
      return;
    }

    const checkAccounts = async () => {
      try {
        const accounts = await ethereum.request({
          method: METAMASK_ACTIONS.eth_accounts,
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkAccounts();
  }, []);

  async function connect() {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('No access to the Ethereum object');
      return;
    }

    try {
      const accounts = await ethereum.request({
        method: METAMASK_ACTIONS.eth_requestAccounts,
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { account, connect };
}

function useQuestions() {
  const { account } = useEthAccount();
  const [questions, setQuestions] = React.useState([]);

  const getQuestions = React.useCallback(async () => {
    if (!account) {
      console.log('No wallet connected');
      return;
    }

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI.abi,
      signer,
    );

    const rawQuestions = await contract.getAllQuestions();
    setQuestions(
      rawQuestions.map((q) => ({
        creator: q.creator,
        question: q.question,
        createdAt: new Date(q.timestamp.toNumber() * 1000),
      })),
    );
  }, [account]);

  async function ask(question) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI.abi,
      signer,
    );

    const txn = await contract.ask(question, { gasLimit: 300000 });
    console.log('Mining...', txn.hash);
    await txn.wait();
    console.log('Mined -- ', txn.hash);
    getQuestions();
  }

  React.useEffect(() => {
    getQuestions();
  }, [account, getQuestions]);

  return { questions, ask };
}
