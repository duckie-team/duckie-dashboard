import Head from "next/head";
import { IndexHeader } from "../../components/pages/index/index";
import { IndexFooter } from "../../components/pages/index/index";

export default function Home() {
    return (
        <>
            <IndexHeader />
            <IndexFooter />
        </>
    );
}
