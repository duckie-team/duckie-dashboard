import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { KakaoLoginButton } from "../../components/pages/auth/kakaoLoginButton";
import { IndexHeader } from "../../components/pages/index/index";
import { IndexFooter } from "../../components/pages/index/index";
import { DuckieIcon } from "../../components/share/duckieIcon";
import { examClient } from "../../lib/client-old/client";
import { ExamAPI } from "../../lib/client-old/endpoints";
import { APIResponseError } from "../../lib/client-old/error";

const Center = styled.div`
    width: 100%;
    height: calc(100vh - 53.5px - 52px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CenterInner = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 32px;
`;

export default function Home() {
    const router = useRouter();

    const goKAuth = () => {
        const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_OAUTH_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_OAUTH_REDIRECT_URL}&response_type=code`;
        window.location.href = URL;
    };

    useEffect(() => {
        (async () => {
            const query = router.query;
            if (query.code) {
                try {
                    const res = await examClient.auth.kakaoLogin({
                        code: query.code as string,
                    });
                    router.push("/auth/login");
                    localStorage.setItem("duckieExamToken", res.accessToken);
                    examClient.updateAuth(res.accessToken);
                    router.push("/dashboard");
                } catch (err) {
                    if (err instanceof APIResponseError) {
                        toast.error(`서버가 요청을 거부했습니다. ${err.code}`);
                    } else {
                        toast.error(`서버에 연결할 수 없습니다.`);
                    }
                }
            }
        })();
    }, [router, router.query]);

    return (
        <>
            <IndexHeader />
            <Center>
                <CenterInner>
                    <DuckieIcon onHover animation="wave" />
                    <KakaoLoginButton onClick={() => goKAuth()}>
                        카카오 로그인
                    </KakaoLoginButton>
                </CenterInner>
            </Center>
            <IndexFooter />
        </>
    );
}
