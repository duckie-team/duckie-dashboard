import Link from "next/link";
import { Button, PageHead, PageLayout } from "opize-design-system";
import { useState } from "react";
import { ExamDomainHeader } from "../../../../../components/pages/dashboard/domain/exam/header";
import { RecommendationPreview } from "../../../../../components/pages/dashboard/domain/exam/recommendation/preview";
import { IndexFooter } from "../../../../../components/pages/index";

export default function Page() {
    const [page, setPage] = useState(0);

    return (
        <>
            <ExamDomainHeader now="recommendation" />
            <PageHead title="추천">
                <Link
                    href={"/dashboard/domain/exam/recommendation/create"}
                    passHref
                    legacyBehavior
                >
                    <Button
                        as="a"
                        href="/dashboard/domain/exam/recommendation/create"
                        variant="contained"
                    >
                        생성
                    </Button>
                </Link>
            </PageHead>
            <PageLayout panWidth="360px" panPosition="start">
                <PageLayout.Pane>
                    <RecommendationPreview page={page} />
                </PageLayout.Pane>
                <PageLayout.Content></PageLayout.Content>
            </PageLayout>
            <IndexFooter />
        </>
    );
}
