import "../src/sass/main.scss"
import Layout from "../src/components/Layout/Layout"
import { Provider } from "react-redux"
import { useStore } from "../src/store/configureStore"

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
