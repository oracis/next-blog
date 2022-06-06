import type { AppProps } from "next/app";
import { StoreProvider } from "store";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider initialValue={{ user: {} }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
