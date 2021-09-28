import { styled } from '../stitches.config';

import EthereumSvg from '../assets/ethereum.svg';

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
});

export default function ConnectWallet({ onConnect, children }) {
  return (
    <Root>
      <Button type="button" onClick={onConnect}>
        <EthereumIcon />
        {children}
      </Button>
    </Root>
  );
}
