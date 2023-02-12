import {
    BoxLayout,
    CenterLayout,
    cv,
    Flex,
    ItemsTable,
    PageHead,
    PageLayout,
} from "opize-design-system";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Slide } from "react-toastify";
import styled from "styled-components";
import { CreateExamPane } from "../../../../../components/pages/dashboard/domain/exam/create/pane";
import { CreateStep1 } from "../../../../../components/pages/dashboard/domain/exam/create/step1";
import { CreateStep2 } from "../../../../../components/pages/dashboard/domain/exam/create/step2";
import { CreateStep3 } from "../../../../../components/pages/dashboard/domain/exam/create/step3";
import { ExamDomainHeader } from "../../../../../components/pages/dashboard/domain/exam/header";
import { DashboardHeader } from "../../../../../components/pages/dashboard/header";
import { IndexFooter } from "../../../../../components/pages/index/index";
import {
    CreateExamContext,
    CreateExamContextProvider,
} from "../../../../../context/pages/dashboard/domain/exam/exam.context";
import { useUser } from "../../../../../hook/useUser";
import { examClient } from "../../../../../lib/client-old/client";
import { ExamAPI } from "../../../../../lib/client-old/endpoints";

function PageContent() {
    const {} = useUser({ roles: ["ADMIN"] });
    const { step } = useContext(CreateExamContext);

    return (
        <PageLayout panPosition="start" marginTop="32px">
            <PageLayout.Content>
                {step === 1 && <CreateStep1 />}
                {step === 2 && <CreateStep2 />}
                {step === 3 && <CreateStep3 />}
            </PageLayout.Content>
            <PageLayout.Pane>
                <CreateExamPane />
            </PageLayout.Pane>
        </PageLayout>
    );
}

export default function Page() {
    const user = useUser({ roles: ["ADMIN"] });

    // 종료 방지
    const preventClose = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
    };

    useEffect(() => {
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();

        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
    }, []);

    return (
        <>
            <ExamDomainHeader now="create" />
            <PageHead title="시험 생성" />
            <CreateExamContextProvider>
                <PageContent />
            </CreateExamContextProvider>
            <IndexFooter />
        </>
    );
}
