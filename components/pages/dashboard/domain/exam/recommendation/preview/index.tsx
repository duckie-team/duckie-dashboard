import { useQuery } from "react-query";
import styled from "styled-components";

const Divver = styled.div`
    border-radius: 8px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 8px;
`;

export function RecommendationPreview({ page }: { page: number }) {
    const {
        data: recommendations,
        error,
        isLoading,
    } = useQuery(["recommendations", page]);

    return <Divver></Divver>;
}
