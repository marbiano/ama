import { styled } from '../stitches.config';

const Root = styled('div', {
  position: 'relative',
  width: '100vw',
  paddingBottom: '10rem',
  // height: '100vh',
  // overflow: 'hidden',

  '&:after': {
    content: '',
    display: 'block',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '15vh',
    background: 'linear-gradient(to bottom, $black00 0%, $black 80%)',
    zIndex: 3,
    pointerEvents: 'none',
  },
});

const Container = styled('div', {
  maxWidth: 600,
  marginLeft: 300,
  marginTop: 100,
});

export default function Layout({ children }) {
  return (
    <Root>
      <Container>{children}</Container>
    </Root>
  );
}
