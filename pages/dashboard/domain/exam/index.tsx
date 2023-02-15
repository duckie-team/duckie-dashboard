import { CenterLayout, PageLayout } from "opize-design-system";
import { useEffect } from "react";
import styled from "styled-components";
import { ExamDomainHeader } from "../../../../components/pages/dashboard/domain/exam/header";
import { DashboardHeader } from "../../../../components/pages/dashboard/header";
import { IndexFooter } from "../../../../components/pages/index";
import { useUser } from "../../../../hook/useUser";
import { examClient } from "../../../../lib/client-old/client";

export default function Dashboard() {
    const user = useUser({ roles: ["ADMIN"] });

    return (
        <>
            <ExamDomainHeader now="index" />
            <CenterLayout minHeight="calc(100vh - 220px)">
                아직 아무것도 없네요! 😂
                <br />
                원하는 내용이 있다면 현스에게 말해주세요
            </CenterLayout>
            <IndexFooter />
        </>
    );
}
