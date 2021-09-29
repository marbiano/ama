import { motion } from 'framer-motion';
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
  margin: '2rem 0 1rem',
  letterSpacing: '-0.025rem',
});

const Tagline = styled('h2', {
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '$white70',
  letterSpacing: '-0.025rem',
  margin: 0,
});

export default function Header() {
  return (
    <Root>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Avatar src="/avatar.jpg" alt="marbiano's avatar" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
      >
        <Title>Ask me anything</Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.5 }}
      >
        <Tagline>
          Hello, I’m <a href="https://twitter.com/marbiano3">@marbiano</a> and
          this is a Web3 based AMA.
        </Tagline>
      </motion.div>
    </Root>
  );
}
