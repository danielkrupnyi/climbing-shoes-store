import Head from "next/head";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from "../components/Layout";
import { store } from "../store/store";
import "../scss/globals.scss";

const persistor = persistStore(store);
const clientId = process.env.NEXT_PAYPAL_ID;

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PayPalScriptProvider
        options={{
          "client-id": clientId,
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8"
            crossOrigin="anonymous"
            async={true}
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    </PersistGate>
  </Provider>
);

export default MyApp;
