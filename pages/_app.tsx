import { OpizeWrapper } from "opize-design-system";
import type { AppProps } from "next/app";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Flip, ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "opize-design-system/dist/style/font.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Head from "next/head";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Duckie Dashboard</title>
                <meta name="description" content="Duckie Dashboard" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <OpizeWrapper>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={true} />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                        transition={Flip}
                    />
                </QueryClientProvider>
            </OpizeWrapper>
        </>
    );
}

export default MyApp;
