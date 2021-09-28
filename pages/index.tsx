import { ethers } from 'ethers';
import * as React from 'react';

import contractABI from '../artifacts/contracts/AMA.sol/AMA.json';
import ConnectWallet from '../components/ConnectWallet';
import Header from '../components/Header';
import SubmitQuestion from '../components/SubmitQuestion';

const METAMASK_ACTIONS = {
  eth_accounts: 'eth_accounts',
  eth_requestAccounts: 'eth_requestAccounts',
};

export default function Index() {
  const { questions, ask } = useQuestions();
  const { account, connect } = useEthAccount();
  const [question, setQuestion] = React.useState('');

  return (
    <div style={{ maxWidth: 600, marginLeft: 300, marginTop: 100 }}>
      <Header />
      {!account && (
        <ConnectWallet onConnect={connect}>Connect wallet to ask</ConnectWallet>
      )}
      {account && <SubmitQuestion onSubmit={ask} />}
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
