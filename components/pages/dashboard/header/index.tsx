import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Flex, Header } from "opize-design-system";
import styled from "styled-components";
import DuckieTextLogo from "../../../../assets/duckie_text_logo.png";

const LogoDiv = styled.div`
    height: 28px;
`;

type Memu = "index" | "domain";
export function DashboardHeader({ now }: { now: Memu }) {
    const router = useRouter();

    return (
        <Header>
            <Header.Notice></Header.Notice>
            <Header.Nav>
                <Header.Nav.Left>
                    <Link href={"/dashboard"}>
                        <LogoDiv>
                            <Image
                                src={DuckieTextLogo}
                                alt="덕키 로고"
                                height={28}
                                priority
                            />
                        </LogoDiv>
                    </Link>
                </Header.Nav.Left>
                <Header.Nav.Right>
                    <Button>Button</Button>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.SubMenu
                menu={{
                    index: {
                        onClick: () => router.push("/dashboard"),
                        text: "대시보드",
                    },
                    domain: {
                        onClick: () => router.push("/dashboard/domain"),
                        text: "도메인",
                    },
                }}
                selected={now}
            ></Header.SubMenu>
        </Header>
    );
}
