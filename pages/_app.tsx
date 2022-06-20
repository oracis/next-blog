import type { AppProps } from "next/app";
import { StoreProvider } from "store";
import Layout from "../components/Layout";
import "../styles/globals.scss";

interface PageProps extends AppProps {
  initialValue: Record<any, any>;
}

function renderComponent({ Component, pageProps }: PageProps) {
  if ((Component as any).layout === false) {
    return <Component {...pageProps} />;
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

function MyApp({ initialValue, Component, pageProps }: PageProps) {
  function renderComponent() {
    if ((Component as any).layout === false) {
      return <Component {...pageProps} />;
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  }
  return (
    <StoreProvider initialValue={initialValue}>
      {renderComponent()}
    </StoreProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req?.cookies || {};

  return {
    initialValue: {
      user: {
        userInfo: {
          userId,
          nickname,
          avatar,
        },
      },
    },
  };
};
export default MyApp;
