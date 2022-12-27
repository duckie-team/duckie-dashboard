import Head from "next/head";
import {
    cv,
    Flex,
    PageLayout,
    Spacer,
    Text,
    TextArea,
} from "opize-design-system";
import styled from "styled-components";
import { IndexHeader } from "../components/pages/index";
import { IndexFooter } from "../components/pages/index";
import { DuckieIcon } from "../components/share/duckieIcon";

const DuckieIconOuter = styled.div`
    width: 100%;
    height: calc(100vh - 53.5px - 52px);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const DuckieIconInner = styled.div`
    height: 256px;
    width: 256px;
`;

export default function Home() {
    return (
        <>
            <IndexHeader />
            <DuckieIconOuter>
                <DuckieIconInner>
                    <DuckieIcon onHover animation="wave" />
                    <Text
                        size="14px"
                        color={cv.text3}
                        style={{ textAlign: "center" }}
                    >
                        Duckie Admin Dashboard
                    </Text>
                </DuckieIconInner>
            </DuckieIconOuter>
            <IndexFooter />
        </>
    );
}
