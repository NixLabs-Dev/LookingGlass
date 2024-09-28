import { Metadata } from 'next';
import { AppProps } from 'next/app';
import "@public/globals.scss";

export const metadata: Metadata = {
    title: "NixLabs Networks",
    description: "Boldly powering projects across the net with affordable, stable, and reliable network, cloud, and collocation services.",
  };
  
export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
        <link rel="icon" type="image/png" href="/logo.png" />
        <Component {...pageProps} />
    </>
 
  )
}