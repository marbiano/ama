import * as React from 'react';

const METAMASK_ACTIONS = {
  eth_accounts: 'eth_accounts',
  eth_requestAccounts: 'eth_requestAccounts',
};

export default function Index() {
  const { account, connect } = useEthAccount();

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

  console.log('ACCOUNT IS', account);
  return (
    <div>
      Welcome to my AMA{' '}
      {!account && (
        <button type="button" onClick={connect}>
          Connect Wallet
        </button>
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
