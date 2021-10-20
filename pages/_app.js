import "../src/sass/main.scss"
import Layout from "../src/components/Layout/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
