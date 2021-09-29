import * as React from 'react';

const METAMASK_ACTIONS = {
  eth_accounts: 'eth_accounts',
  eth_requestAccounts: 'eth_requestAccounts',
};

type AddressContextType = {
  address: string;
  connect: () => void;
  isLoading: boolean;
  canConnect: boolean;
};

const AddressContext = React.createContext<AddressContextType | null>(null);

export default function useAddress() {
  const context = React.useContext(AddressContext);
  if (context == null) {
    throw new Error(`useAddress must be used within an AddressContext`);
  }

  return context;
}

export function AddressProvider({ children }) {
  const [address, setAddress] = React.useState<string | null>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [canConnect, setCanConnect] = React.useState(true);

  React.useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('No access to the Ethereum object');
      setIsLoading(false);
      setCanConnect(false);
      return;
    }

    const checkAddresses = async () => {
      try {
        const addresses = await ethereum.request({
          method: METAMASK_ACTIONS.eth_accounts,
        });
        if (addresses.length > 0) {
          setAddress(addresses[0]);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    checkAddresses();
  }, []);

  async function connect() {
    const { ethereum } = window;
    setIsLoading(true);

    try {
      const accounts = await ethereum.request({
        method: METAMASK_ACTIONS.eth_requestAccounts,
      });

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  const value: AddressContextType = { address, connect, isLoading, canConnect };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}
