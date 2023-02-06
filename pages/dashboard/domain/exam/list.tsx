import {
    BoxLayout,
    CenterLayout,
    Flex,
    ItemsTable,
    PageLayout,
} from "opize-design-system";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ExamDomainHeader } from "../../../../components/pages/dashboard/domain/exam/header";
import { DashboardHeader } from "../../../../components/pages/dashboard/header";
import { IndexFooter } from "../../../../components/pages/index/index";
import { ExamItem, ExamItemGrid } from "../../../../components/share/exam/item";
import { useUser } from "../../../../hook/useUser";
import { examClient } from "../../../../lib/client/client";
import { ExamAPI } from "../../../../lib/client/endpoints";

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Dashboard() {
    const user = useUser({ roles: ["ADMIN"] });
    const { data: exams, error } = useQuery(
        ["exams"],
        async () => (await examClient.exams.list({})).exams,
        {}
    );

    return (
        <>
            <ExamDomainHeader now="list" />
            {exams?.length !== 0 ? (
                <BoxLayout minHeight="calc(100vh - 220px)" marginTop="8px">
                    <ExamItemGrid>
                        {/* <ItemsTable> */}
                        {exams?.map((exam) => (
                            // <ItemsTable.Row key={exam.id}>
                            //     <ItemsTable.Row.Text
                            //         text={`${exam.id}. ${exam.title}`}
                            //         subText={exam.description}
                            //     />
                            // </ItemsTable.Row>
                            <ExamItem exam={exam} key={exam.id} />
                        ))}
                        {/* </ItemsTable> */}
                    </ExamItemGrid>
                </BoxLayout>
            ) : (
                <CenterLayout minHeight="calc(100vh - 220px)">
                    아직 아무 시험도 작성되지 않았어요. 😂
                </CenterLayout>
            )}
            <IndexFooter />
        </>
    );
}
