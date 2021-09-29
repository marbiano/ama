import { KeystoreAccount } from '@ethersproject/json-wallets/lib/keystore';
import * as React from 'react';

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
  const { account, connect } = useEthAccount();

  return (
    <Layout>
      <Header />
      {account && (
        <>
          {account && <SubmitQuestion />}
          <Questions />
        </>
      )}
      {account === false && (
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
  const [account, setAccount] = React.useState<KeystoreAccount | boolean>();

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
      setAccount(false);
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
      setAccount(false);
    }
  }

  return { account, connect };
}
