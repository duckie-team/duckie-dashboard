import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, SimpleHeader } from "opize-design-system";
import styled from "styled-components";

import DuckieTextLogo from "../../../../assets/duckie_text_logo.png";

const LogoDiv = styled.div`
    height: 28px;
`;

export function IndexHeader() {
    const router = useRouter();

    return (
        <>
            <SimpleHeader>
                <Link href={"/"}>
                    <LogoDiv>
                        <Image
                            src={DuckieTextLogo}
                            alt="덕키 로고"
                            height={28}
                            priority
                        />
                    </LogoDiv>
                </Link>
                <SimpleHeader.Nav>
                    <SimpleHeader.Nav.Link href="/about">
                        소개
                    </SimpleHeader.Nav.Link>
                    <SimpleHeader.Nav.Link
                        href="https://opensource.duckie.team"
                        target={"_blank"}
                    >
                        오픈소스
                    </SimpleHeader.Nav.Link>
                </SimpleHeader.Nav>
                <Button onClick={() => router.push("/auth/login")}>
                    로그인
                </Button>
            </SimpleHeader>
        </>
    );
}
