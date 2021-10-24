import React from "react"
import "../src/sass/main.scss"
import { Provider } from "react-redux"
import { useStore } from "../src/store/configureStore"
import Notification from "../src/components/Notification/Notification"

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)

  const Layout = Component.Layout ? Component.Layout : React.Fragment

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Notification />
    </Provider>
  )
}

export default MyApp
