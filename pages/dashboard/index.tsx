import { PageLayout } from "opize-design-system";
import { useEffect } from "react";
import styled from "styled-components";
import { DashboardHeader } from "../../components/pages/dashboard/header";
import { IndexFooter } from "../../components/pages/index";
import { useUser } from "../../hook/useUser";

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Dashboard() {
    const user = useUser({ roles: ["ADMIN"] });

    return (
        <>
            <DashboardHeader now="index" />
            <PageLayout minHeight="calc(100vh - 220px)">
                <Center>아직 아무것도 없네요! 😂</Center>
            </PageLayout>
            <IndexFooter />
        </>
    );
}
