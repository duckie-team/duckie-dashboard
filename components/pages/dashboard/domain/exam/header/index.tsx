import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, cv, Flex, Header, Text, Token } from "opize-design-system";
import styled from "styled-components";
import DuckieTextLogo from "../../../../../../assets/duckie_text_logo.png";
import { useUser } from "../../../../../../hook/useUser";

const LogoDiv = styled.div`
    height: 28px;
`;

const A = styled(Link)`
    text-decoration: none;
    color: ${cv.text1};
    margin-bottom: -6px;
`;

type Menu = "index" | "list" | "create";
export function ExamDomainHeader({ now }: { now: Menu }) {
    const router = useRouter();
    const { user } = useUser();

    return (
        <Header>
            <Header.Notice></Header.Notice>
            <Header.Nav>
                <Header.Nav.Left>
                    <Flex.Row gap="2px">
                        <LogoDiv>
                            <Link href={"/dashboard"}>
                                <Image
                                    src={DuckieTextLogo}
                                    alt="덕키 로고"
                                    height={28}
                                    priority
                                />
                            </Link>
                        </LogoDiv>
                        <A href={"/"}>
                            <Token>덕질고사</Token>
                        </A>
                    </Flex.Row>
                </Header.Nav.Left>

                <Header.Nav.Right></Header.Nav.Right>
            </Header.Nav>
            <Header.SubMenu
                menu={{
                    index: {
                        onClick: () => router.push("/dashboard/domain/exam"),
                        text: "대시보드",
                    },
                    list: {
                        onClick: () =>
                            router.push("/dashboard/domain/exam/list"),
                        text: "리스트",
                    },
                    create: {
                        onClick: () =>
                            router.push("/dashboard/domain/exam/create"),
                        text: "생성",
                    },
                }}
                selected={now}
            ></Header.SubMenu>
        </Header>
    );
}
