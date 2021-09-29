// @ts-check
import Layout from '../components/Layout';
import { AddressProvider } from '../hooks/use-address';
import { globalCss } from '../stitches.config';

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: 'url(/fonts/inter-variable.woff2) format("woff2")',
    },
    {
      fontFamily: 'Inter',
      fontWeight: '700',
      fontDisplay: 'swap',
      src: 'url(/fonts/inter-bold.woff2) format("woff2")',
    },
    {
      fontFamily: 'Inter',
      fontWeight: '900',
      fontDisplay: 'swap',
      src: 'url(/fonts/inter-black.woff2) format("woff2")',
    },
  ],
  html: {
    boxSizing: 'border-box',
  },
  '*,*:before,*:after': {
    boxSizing: 'inherit',
  },
  body: {
    color: '$white',
    background:
      'radial-gradient(39% 58% at 94% 6%, $green15 0%, $green00 68%), radial-gradient(44% 44% at 64% 10%, $orange15 0%, $white00 82%), linear-gradient(222deg, $orange05 10%, $white00 60%), $black',
    backgroundAttachment: 'fixed',
    fontFamily: '$sans',
    margin: 0,
    padding: 0,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  a: {
    color: '$orange',
  },
});

export default function MyApp({ Component, pageProps }) {
  globalStyles();
  return (
    <AddressProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AddressProvider>
  );
}
