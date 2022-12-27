import { PageLayout } from "opize-design-system";
import { useEffect } from "react";
import { DashboardHeader } from "../../components/pages/dashboard/header";
import { IndexFooter } from "../../components/pages/index";
import { useUser } from "../../hook/useUser";
import { examClient } from "../../lib/client/client";

export default function Dashboard() {
    const user = useUser({ roles: ["ADMIN"] });

    return (
        <>
            <DashboardHeader now="index" />
            <PageLayout minHeight="calc(100vh - 220px)"></PageLayout>
            <IndexFooter />
        </>
    );
}
