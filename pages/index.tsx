import { ethers } from 'ethers';
import * as React from 'react';

import contractABI from '../artifacts/contracts/AMA.sol/AMA.json';
import ConnectWallet from '../components/ConnectWallet';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Questions from '../components/Questions';
import Skeleton from '../components/Skeleton';
import SubmitQuestion from '../components/SubmitQuestion';

const METAMASK_ACTIONS = {
  eth_accounts: 'eth_accounts',
  eth_requestAccounts: 'eth_requestAccounts',
};

export default function Index() {
  const { questions, ask, answer, getAnswer } = useQuestions();
  const { account, connect } = useEthAccount();

  return (
    <Layout>
      <Header />
      {account ? (
        <>
          {account && <SubmitQuestion onSubmit={ask} />}
          {questions.length > 0 && (
            <Questions
              items={questions}
              onAnswer={answer}
              getAnswer={getAnswer}
            />
          )}
        </>
      ) : (
        <>
          <ConnectWallet onConnect={connect}>
            Connect to participate
          </ConnectWallet>
          <Skeleton />
        </>
      )}
    </Layout>
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

    const results = await contract.getQuestions();
    setQuestions(results);
  }, [account]);

  async function ask(text) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI.abi,
      signer,
    );

    const txn = await contract.ask(text, { gasLimit: 300000 });
    console.log('Mining...', txn.hash);
    await txn.wait();
    console.log('Mined -- ', txn.hash);
    getQuestions();
  }

  async function answer(question, text) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI.abi,
      signer,
    );

    const txn = await contract.answer(
      question.creator,
      question.timestamp,
      text,
    );
    console.log('Mining...', txn.hash);
    await txn.wait();
    console.log('Mined -- ', txn.hash);
  }

  async function getAnswer(question) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI.abi,
      signer,
    );

    return contract.getAnswer(question.creator, question.timestamp);
  }

  React.useEffect(() => {
    getQuestions();
  }, [account, getQuestions]);

  return { questions, ask, answer, getAnswer };
}
