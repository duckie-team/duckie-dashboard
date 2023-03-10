import Link from "next/link";
import { useRouter } from "next/router";
import {
    Flex,
    PageHead,
    PageLayout,
    Text,
    Link as A,
    TextField,
    Box,
    Token,
    Span,
    Button,
    H2,
    H3,
    Checkbox,
} from "opize-design-system";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ExamDomainHeader } from "../../../../../components/pages/dashboard/domain/exam/header";
import { RecommendationPreview } from "../../../../../components/pages/dashboard/domain/exam/recommendation/preview";
import { CreateRecommendationPreview } from "../../../../../components/pages/dashboard/domain/exam/recommendation/preview/create";
import { IndexFooter } from "../../../../../components/pages/index/index";
import { ExamItem } from "../../../../../components/share/exam";
import { examClient } from "../../../../../lib/client-old/client";
import { ExamAPI } from "../../../../../lib/client-old/endpoints";
import { APIResponseError } from "../../../../../lib/client-old/error";

type Tag = {
    name: string;
    id: number;
};

type Exam = ExamAPI.Object.ExamObject;
type Exams = Exam[];

function TagSelector({
    tag,
    setTag,
}: {
    tag?: Tag;
    setTag: (tag: Tag) => void;
}) {
    const [searchText, setSearchText] = useState("");
    const [tags, setTags] = useState<Tag[]>();
    const [page, setPage] = useState(1);

    const search = useCallback(
        async (searchText: string) => {
            try {
                const res = await examClient.search.tags({
                    page: page,
                    query: searchText,
                    type: "TAGS",
                });

                setTags(res.result);

                console.log(res);
            } catch (err) {}
        },
        [page]
    );

    useEffect(() => {
        const debounce = setTimeout(async () => {
            // search
            await search(searchText);
        }, 300);
        return () => clearTimeout(debounce);
    }, [search, searchText]);

    return (
        <Box>
            <TextField
                label="?????? ??????"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {tags && tags.length > 0
                ? tags.map((tagi) => (
                      <Flex.Between key={tagi.id}>
                          <Text>
                              <Span size="12px">{tagi.id} | </Span>
                              {tagi.name}
                          </Text>
                          <Button
                              onClick={() => setTag(tagi)}
                              disabled={tagi.id === tag?.id}
                          >
                              {tagi.id === tag?.id ? "?????????" : "??????"}
                          </Button>
                      </Flex.Between>
                  ))
                : "????????? ?????? ????????? ?????????. ?????? ????????? ?????? ????????? ????????????"}
        </Box>
    );
}

const ExmasScroll = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, auto));
    column-gap: 12px;
    row-gap: 20px;
`;
const ExamWrapper = styled.div`
    position: relative;
`;
const ExamCheckbox = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
`;
function ExamsSelector({
    exams,
    setExams,
}: {
    exams: Exams;
    setExams: (exams: Exams) => void;
}) {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<Exams>();
    const [page, setPage] = useState(1);

    const search = useCallback(
        async (searchText: string) => {
            try {
                const res = await examClient.search.exams({
                    page: page,
                    query: searchText,
                    type: "EXAM",
                });

                setSearchResults(res.result);
            } catch (err) {}
        },
        [page]
    );

    useEffect(() => {
        const debounce = setTimeout(async () => {
            // search
            await search(searchText);
        }, 300);
        return () => clearTimeout(debounce);
    }, [search, searchText]);

    const check = (exam: Exam) => {
        if (exams.map((exam) => exam.id).includes(exam.id)) {
            setExams(exams.filter((i) => i.id !== exam.id));
        } else {
            setExams([...exams, exam]);
        }
    };

    return (
        <Box>
            <TextField
                label="?????? ??????"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <ExmasScroll>
                {searchResults && searchResults.length > 0
                    ? searchResults.map((result) => (
                          <ExamWrapper
                              key={result.id}
                              onClick={() => check(result)}
                          >
                              <ExamItem exam={result} size="small" />
                              <ExamCheckbox>
                                  <Checkbox
                                      checked={exams
                                          .map((exam) => exam.id)
                                          .includes(result.id)}
                                  />
                              </ExamCheckbox>
                          </ExamWrapper>
                      ))
                    : "????????? ?????? ????????? ?????????. ?????? ????????? ?????? ????????? ????????????"}
            </ExmasScroll>
        </Box>
    );
}

export default function Page() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [exams, setExams] = useState<Exams>([]);
    const [tag, setTag] = useState<Tag>();

    const createRecommendation = async () => {
        if (!title || exams.length === 0 || !tag) {
            toast.info("???????????? ???????????????");
            return;
        }

        const data: ExamAPI.Recommendations.PostRecommendationsParameter = {
            examIds: exams.map((exam) => exam.id),
            tagId: tag?.id,
            title: title,
        };

        try {
            const res = await examClient.recommendations.post(data);
            console.log(res);
            router.push("/dashboard/domain/exam/recommendation");
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error(`????????? ??????????????????. ${err.status}`);
                toast.warn(err.body?.message);
                console.error(err.body);
            } else {
                toast.error("????????? ????????? ??? ?????????");
                console.error(err);
            }
        }
    };

    return (
        <>
            <ExamDomainHeader now="recommendation" />
            <PageHead
                title={
                    <Flex.Column>
                        <Text>
                            <Link
                                href={"/dashboard/domain/exam/recommendation"}
                                passHref
                                legacyBehavior
                            >
                                <A
                                    href={
                                        "/dashboard/domain/exam/recommendation"
                                    }
                                >
                                    {"<"} ????????????
                                </A>
                            </Link>
                        </Text>
                        ?????? ??????
                    </Flex.Column>
                }
            />
            <PageLayout panWidth="360px" panPosition="start" gap="20px">
                <PageLayout.Pane>
                    <CreateRecommendationPreview
                        title={title}
                        exams={exams}
                        tag={tag}
                    />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <Flex.Column gap="8px">
                            <H3>??????</H3>
                            <TextField
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="?????? ??? ?????????????"
                            />
                        </Flex.Column>

                        <Flex.Column gap="8px">
                            <H3>??????</H3>
                            <TagSelector tag={tag} setTag={setTag} />
                        </Flex.Column>

                        <Flex.Column gap="8px">
                            <H3>??????</H3>
                            <ExamsSelector exams={exams} setExams={setExams} />
                        </Flex.Column>

                        <Flex.Between>
                            <Text> </Text>
                            <Button
                                variant="contained"
                                onClick={createRecommendation}
                            >
                                ?????? ??????
                            </Button>
                        </Flex.Between>
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <IndexFooter />
        </>
    );
}
