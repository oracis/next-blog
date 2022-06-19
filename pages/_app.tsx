import type { AppProps } from "next/app";
import { StoreProvider } from "store";
import Layout from "../components/Layout";
import "../styles/globals.scss";

interface PageProps extends AppProps {
  initialValue: Record<any, any>;
}

function MyApp({ initialValue, Component, pageProps }: PageProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx.req.cookies;

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
