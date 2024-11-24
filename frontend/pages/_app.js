// pages/_app.js
import Layout from "../components/Layout";
import "../styles/globals.css"; // Global CSS should be imported here

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
