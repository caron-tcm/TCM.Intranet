import { AppProps } from 'next/app';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { HeaderProvider } from '@context/HeaderContext';

import '@styles/global.scss';
import '@styles/react-tabs.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
  <NextAuthProvider session={pageProps.session}>
      <HeaderProvider>
        <Component {...pageProps} />
      </HeaderProvider>      
  </NextAuthProvider>
  )
}

export default MyApp
