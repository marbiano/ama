import ConnectWallet from '../components/ConnectWallet';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Questions from '../components/Questions';
import Skeleton from '../components/Skeleton';
import SubmitQuestion from '../components/SubmitQuestion';
import useAddress from '../hooks/use-address';

export default function Index() {
  const { address, connect, isLoading, canConnect } = useAddress();

  return (
    <>
      <Header />
      {address && (
        <>
          <SubmitQuestion />
          <Questions />
        </>
      )}
      {!address && !isLoading && (
        <>
          <ConnectWallet onConnect={connect} canConnect={canConnect}>
            Connect to participate
          </ConnectWallet>
          <Skeleton />
        </>
      )}
    </>
  );
}
