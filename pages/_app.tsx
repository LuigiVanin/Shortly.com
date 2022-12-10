// import "../styles/reset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
interface AuthProp {
    session: Session;
}

type MyAppProps = AppProps<AuthProp>;

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: MyAppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
