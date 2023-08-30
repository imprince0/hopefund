import Head from 'next/head'
import { Inter } from 'next/font/google'
import LandingPage from './landingPage'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>HopeFund</title>
        <meta name="description" content="Your Generosity Creates Hope." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
};
