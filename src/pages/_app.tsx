import '@components:./components/styles/globals.scss';
import type { AppProps } from 'next/app';
import Menu from '../components/menu/Menu';
import Footer from '../components/footer/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Menu /> */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
};
