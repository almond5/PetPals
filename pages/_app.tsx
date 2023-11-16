import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`}
        onLoad={() => setGoogleApiLoaded(true)}
      ></Script>
      {googleApiLoaded && <Component {...pageProps} />}
    </SessionProvider>
  );
}
