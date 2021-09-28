import { styled } from '../stitches.config';

const Button = styled('button', {
  background: '$orange',
  color: '$white',
  fontSize: '1rem',
  border: 0,
  borderRadius: 20,
  padding: '.8rem 1.6rem',
  cursor: 'pointer',
});

export default function ConnectWallet({ onConnect, children }) {
  return (
    <Button type="button" onClick={onConnect}>
      {children}
    </Button>
  );
}
