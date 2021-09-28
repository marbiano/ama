import { styled } from '../stitches.config';

const Root = styled('header', {
  marginBottom: '3rem',
});

const Avatar = styled('img', {
  display: 'block',
  width: 64,
  borderRadius: '50%',
});

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: '900',
  color: '$white',
  margin: '2rem 0 .5rem',
});

const Tagline = styled('h2', {
  fontSize: '1rem',
  fontWeight: '400',
  color: '$white70',
  margin: 0,
});

export default function Header() {
  return (
    <Root>
      <Avatar src="/avatar.jpg" alt="marbiano's avatar" />
      <Title>Ask me anything</Title>
      <Tagline>
        Hi, I’m <a href="https://twitter.com/marbiano3">@marbiano3</a> and you
        can ask me anything.
      </Tagline>
    </Root>
  );
}
