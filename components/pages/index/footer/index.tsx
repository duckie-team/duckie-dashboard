import Image from "next/image";
import Link from "next/link";
import { cssVar, cv, Flex, Footer, Text } from "opize-design-system";
import styled from "styled-components";
import DuckieTextLogo from "../../../../assets/duckie_text_logo.png";

const A = styled.a`
    text-decoration: none;
    color: ${cv.text3};
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
`;

const ODSA = styled.a`
    text-decoration: none;
    color: ${cv.text4};

    &:hover {
        text-decoration: underline;
    }
`;

export function IndexFooter() {
    return (
        <Flex.Center style={{ marginTop: "32px" }}>
            <Flex.Column gap="8px">
                <Flex.Center>
                    <Image src={DuckieTextLogo} alt="덕키 로고" height={28} />
                </Flex.Center>
                <Flex.Row gap="12px">
                    <A href="https://duckie.team">덕키</A>
                    <A href="https://opensource.duckie.team">오픈소스</A>
                    <A href="https://www.instagram.com/duckie_team/">
                        인스타그램
                    </A>
                    <A href="https://twitter.com/duckie_team">트위터</A>
                    <A href="mailto//developers@duckie.team">이메일</A>
                </Flex.Row>
                <Text
                    size="12px"
                    color={cv.text4}
                    style={{ textAlign: "center", marginTop: "-6px" }}
                >
                    Designed By{" "}
                    <ODSA href="https://design.opize.me" target={"_blank"}>
                        Opize Design System
                    </ODSA>
                </Text>
            </Flex.Column>
        </Flex.Center>
    );
}
