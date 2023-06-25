import { SessionProvider } from "next-auth/react"

import "../styles/globals.css";
import { AppContextProvider } from "@/components/AppContext";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps}/>
      </AppContextProvider>
    </SessionProvider>
  )
}