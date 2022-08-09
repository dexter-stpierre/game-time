// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Container, CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <CssBaseline />
    <Container>
      <Component {...pageProps} />
    </Container>
  </>
}

export default MyApp
