import client from '@/config/apollo';
import { OrdersProvider } from '@/context/orders';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <OrdersProvider>
        <Component {...pageProps} />
      </OrdersProvider>
    </ApolloProvider>
  )
}
