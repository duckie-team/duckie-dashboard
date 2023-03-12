import { cv, Flex, Text, Token } from "opize-design-system";
import styled from "styled-components";
import { ExamObject } from "../../../lib/client/object";

const Divver = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
`;

const Thumbnail = styled.img`
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 15/11;
`;

const Profile = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 32px;
`;

export function ExamItemMedium({
    exam,
    width,
}: {
    exam: ExamObject;
    width: string;
}) {
    return (
        <Divver width={width}>
            <Thumbnail src={exam.thumbnailUrl} />
            <Flex.Between>
                <Flex.Row gap="4px">
                    <Profile src={exam.user?.profileImageUrl} />
                    <Flex.Column>
                        <Text>{exam.title}</Text>
                        <Text size="12px" lineHeight="1">
                            {exam.user?.nickName || "(알 수 없음)"}
                        </Text>
                    </Flex.Column>
                </Flex.Row>
                <Token color="default">{exam.status}</Token>
            </Flex.Between>
        </Divver>
    );
}

const PlaceholderThumbnail = styled.div`
    width: 100%;
    border-radius: 8px;
    background-color: ${cv.bg_element3};
    aspect-ratio: 15/11;
`;
const PlaceholderProfile = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background-color: ${cv.bg_element3};
`;
export function PlaceholderExamItemMedium({ width }: { width: string }) {
    return (
        <Divver width={width}>
            <PlaceholderThumbnail />
            <Flex.Row gap="4px">
                <PlaceholderProfile />
                <Flex.Column>
                    <Text>title</Text>
                    <Text size="12px" lineHeight="1">
                        혀느현스
                    </Text>
                </Flex.Column>
            </Flex.Row>
        </Divver>
    );
}
