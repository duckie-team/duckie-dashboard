import { Flex, Text } from "opize-design-system";
import styled from "styled-components";
import { ExamObject } from "../../../lib/client/endpoints/exam/object";

const Divver = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Thumbnail = styled.img`
    width: 100%;
    border-radius: 8px;
`;

const Profile = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 32px;
`;

export function ExamItem({ exam }: { exam: ExamObject }) {
    console.log(exam);

    return (
        <Divver>
            <Thumbnail src={exam.thumbnailUrl} />
            <Flex.Row gap="4px">
                <Profile src={exam.user?.profileImageUrl} />
                <Flex.Column>
                    <Text>{exam.title}</Text>
                    <Text size="12px" lineHeight="1">
                        {exam.user?.nickName || "(알 수 없음)"}
                    </Text>
                </Flex.Column>
            </Flex.Row>
        </Divver>
    );
}

export const ExamItemGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, auto));
    column-gap: 12px;
    row-gap: 20px;
`;
