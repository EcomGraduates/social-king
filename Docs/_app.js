  static async getInitialProps (ctx) {
    return redirect(ctx, 
  }




import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

import { createHttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { InMemoryCache } from 'apollo-cache-inmemory';

import queryString from 'query-string';

const authLink = setContext((_, { headers }) => {
	  return {
		        headers: {
				          ...headers,
				          authorization: Cookies.get('accessToken') ? `Bearer ${Cookies.get('accessToken')}` : "",
				      }
		    }
})

const httpLink = new createHttpLink({
	    credentials: 'same-origin',
	    headers: {
		          accept: '*/*', 
		          'Content-Type': 'application/graphql',
		          'Access-Control-Allow-Origin': '*',
		          "X-Shopify-Access-Token": Cookies.get('accessToken')
		        },
	    fetch,
	    ssrMode: !process.browser,
	    uri: `https://${Cookies.get('shopOrigin')}/admin/api/2019-04/graphql.json`,
})

const client = new ApolloClient({
	    link: authLink.concat(httpLink),
	    cache: new InMemoryCache(),
});

export default function MyApp({ router, ctx }) {
   let { shop } = queryString.parse(props.router.asPath);
    console.log('shop', shop);
    let shopOrigin = Cookies.get("shopOrigin") ? Cookies.get("shopOrigin") : shop;

    const { Component, pageProps } = this.props;
    const config = { apiKey: API_KEY, shopOrigin , forceRedirect: true };

    return (
      <React.Fragment>
        <Head>
          <title>Social King</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider>
            <ApolloProvider client={client}>
              <Component {...pageProps} app={config} />
          </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
};

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  return { Component, router, ctx };
};
