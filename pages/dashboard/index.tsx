import { useEffect } from "react";
import { DashboardHeader } from "../../components/pages/dashboard/header";
import { IndexFooter } from "../../components/pages/index";
import { examClient } from "../../lib/client/client";

export default function Dashboard() {
    useEffect(() => {
        (async () => {
            const res = await examClient.user.get({ id: 1 });
            console.log(res);
        })();
    }, []);

    return (
        <>
            <DashboardHeader now="index" />
            <IndexFooter />
        </>
    );
}
