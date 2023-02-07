import { cv, Flex, Text } from "opize-design-system";
import styled from "styled-components";
import { ExamObject } from "../../../lib/client/endpoints/exam/object";

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

export function ExamItemSmall({
    exam,
    width,
}: {
    exam: ExamObject;
    width: string;
}) {
    return (
        <Divver width={width}>
            <Thumbnail src={exam.thumbnailUrl} />
            <Flex.Row gap="4px">
                <Flex.Column>
                    <Text size="12px" lineHeight="1" color="#222222">
                        {exam.user?.nickName || "(알 수 없음)"}
                    </Text>
                    <Text weight="semibold">{exam.title}</Text>
                    <Text
                        size="12px"
                        lineHeight="1"
                        color="#a8a8a8"
                        style={{
                            marginTop: "4px",
                        }}
                    >
                        응시자 {exam.solvedCount || "(알 수 없음)"}
                    </Text>
                </Flex.Column>
            </Flex.Row>
        </Divver>
    );
}

const PlaceholderThumbnail = styled.div`
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 15/11;
    background-color: ${cv.bg_element3};
`;

export function PlaceholderExamItemSmall({ width }: { width: string }) {
    return (
        <Divver width={width}>
            <PlaceholderThumbnail />
            <Flex.Row gap="4px">
                <Flex.Column>
                    <Text size="12px" lineHeight="1" color="#222222">
                        혀느현스
                    </Text>
                    <Text weight="semibold">title</Text>
                    <Text
                        size="12px"
                        lineHeight="1"
                        color="#a8a8a8"
                        style={{
                            marginTop: "4px",
                        }}
                    >
                        응시자 123
                    </Text>
                </Flex.Column>
            </Flex.Row>
        </Divver>
    );
}
