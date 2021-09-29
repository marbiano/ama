import { styled } from '../stitches.config';

import EthereumSvg from '../assets/ethereum.svg';
import { motion } from 'framer-motion';

const Root = styled('div', {
  marginTop: '6rem',
  marginBottom: '6rem',
});

const EthereumIcon = styled(EthereumSvg, {
  color: '$white',
});

const Button = styled('button', {
  background: '$orange',
  color: '$white90',
  fontFamily: '$sans',
  fontSize: '1.1rem',
  border: 0,
  borderRadius: '3em',
  padding: '1em 2em',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '.75rem',
  transition: 'background 200ms ease-out',

  '&:hover': {
    background: '$lightOrange',
    color: '$white',
  },

  '&:disabled': {
    background: '$orange75',
    color: '$white50',
    cursor: 'not-allowed',

    [`& ${EthereumIcon}`]: {
      color: '$white50',
    },
  },
});

const Warning = styled('p', {
  margin: '2rem 0 0',
});

export default function ConnectWallet({ onConnect, canConnect, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.2 }}
    >
      <Root>
        <Button type="button" onClick={onConnect} disabled={!canConnect}>
          <EthereumIcon />
          {children}
        </Button>
        {!canConnect && (
          <Warning>
            You need to have{' '}
            <a href="https://metamask.io">an Ethereum wallet</a> in order to use
            this app.
          </Warning>
        )}
      </Root>
    </motion.div>
  );
}
