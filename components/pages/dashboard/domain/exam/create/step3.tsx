import { useRouter } from "next/router";
import {
    Box,
    Button,
    CodeBlock,
    cv,
    Flex,
    H3,
    ItemsTable,
    Select,
    Text,
    TextArea,
    TextField,
    useDialog,
} from "opize-design-system";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CreateExamContext } from "../../../../../../context/pages/dashboard/domain/exam/exam.context";
import { useUser } from "../../../../../../hook/useUser";
import { examClient } from "../../../../../../lib/client";
import { ExamAPI } from "../../../../../../lib/client";
import { APIResponseError } from "../../../../../../lib/client-old/error";

type Step3Form = Pick<
    ExamAPI.Object.CreateExamObject,
    "thumbnailUrl" | "buttonTitle"
> & {
    subTagIds: string;
};

const PreviewImage = styled.img`
    height: 300px;
    object-fit: contain;
    background-color: ${cv.bg_element2};
`;

export function CreateStep3() {
    const { user } = useUser({ roles: ["ADMIN"] });
    const router = useRouter();
    const dialog = useDialog();

    const { setData, data, setStep } = useContext(CreateExamContext);

    const { data: categories } = useQuery(["categories"], () =>
        examClient.categories.list({ withPopularTags: true })
    );

    const [imageType, setImageType] = useState<
        "generatedImage" | "uploadedImage"
    >("generatedImage");
    const [name, setName] = useState(user?.nickName || "");
    const [mainTagName, setMainTagName] = useState("");
    const [showRawData, setShowRawData] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Step3Form>({
        defaultValues: {
            buttonTitle: data.buttonTitle,
            subTagIds: data.subTagIds?.join(","),
            thumbnailUrl: data.thumbnailUrl,
        },
        reValidateMode: "onChange",
    });

    const generateImage = async () => {
        try {
            if (data.categoryId === undefined) {
                toast.error(
                    "[ERROR] 이미지 생성 사전 유효성 검사 실패, 콘솔 참고"
                );
                console.log("categoryId", data.categoryId);
                return;
            }

            const category = categories?.categories.filter(
                (category) => category.id === +(data.categoryId || "-1")
            )[0];

            if (!category) {
                toast.warn(
                    "카테고리 정보를 찾을 수 없습니다. 카테고리 아이디를 확인하세요"
                );
                setStep(1);
                return;
            }

            const res = await examClient.exams.postThumbnail({
                title: data.title || "",
                nickName: name,
                category: category.name,
                certifyingStatement: data.certifyingStatement || "",
                mainTag: mainTagName,
                type: "text",
            });

            setValue("thumbnailUrl", res.url);
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error(`문제가 발생했어요. (${err.code})`);
                console.error(err.body);
            } else {
                toast.error("서버에 연결할 수 없어요.");
                console.error(err);
            }
        }
    };

    const uploadExam = async () => {
        try {
            // TODO: ThumbnailType 선택 추가
            const res = await examClient.exams.post({
                ...(data as ExamAPI.Object.CreateExamObject),
                thumbnailType: "text",
                subTagIds: undefined,
            });
            router.push("/dashboard/domain/exam/list");
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error(`문제가 발생했어요. (${err.code})`);
                if (err.body.errors) {
                    err.body.errors.map((e: any) =>
                        toast.warn(`${e.code} (${e.message})`)
                    );
                }
                console.error(err.body);
            } else {
                toast.error("서버에 연결할 수 없어요.");
                console.error(err);
            }
        }
    };

    const submit = async (form: Step3Form) => {
        setData({
            ...data,
            buttonTitle: form.buttonTitle,
            subTagIds: form.subTagIds
                ? form.subTagIds.split(",").map((e) => +e)
                : [],
            thumbnailUrl: form.thumbnailUrl,
        });

        dialog({
            title: "시험을 생성하시겠어요?",
            content: "한 번 생성한 시험은 수정할 수 없어요.",
            buttons: [
                {
                    children: "취소",
                    variant: "outlined",
                    onClick: () => null,
                },
                {
                    children: "생성",
                    variant: "contained",
                    onClick: () => uploadExam(),
                },
            ],
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Flex.Column gap="32px">
                <Flex.Column gap="8px">
                    <H3>썸네일</H3>
                    <PreviewImage src={watch("thumbnailUrl")} />
                    <TextField
                        placeholder="썸네일 URL"
                        {...register("thumbnailUrl", {
                            required: "필수 항목입니다.",
                        })}
                        error={errors.thumbnailUrl?.message}
                    />
                    <Select
                        value={imageType}
                        onChange={(e) => setImageType(e.target.value as any)}
                    >
                        <Select.Option value={"generatedImage"}>
                            이미지 생성
                        </Select.Option>
                        <Select.Option value={"uploadedImage"}>
                            이미지 업로드
                        </Select.Option>
                    </Select>
                    {imageType === "generatedImage" && (
                        <Box
                            footer={
                                <>
                                    <Text />
                                    <Button
                                        onClick={generateImage}
                                        variant="contained"
                                        disabled={!name || !mainTagName}
                                    >
                                        이미지 생성
                                    </Button>
                                </>
                            }
                        >
                            <TextField
                                placeholder="이름"
                                label="이름"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                placeholder="메인 태그 이름"
                                label="메인태그 이름"
                                value={mainTagName}
                                onChange={(e) => setMainTagName(e.target.value)}
                            />
                        </Box>
                    )}
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">시험 응시하기 버튼 텍스트</Text>
                    <TextField
                        placeholder="나만의 응시하기 버튼을 만들어보세요"
                        maxLength={12}
                        {...register("buttonTitle", {
                            required: "필수 항목입니다.",
                        })}
                        error={errors.buttonTitle?.message}
                    />
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">태그 추가</Text>
                    <Text color={cv.red1}>
                        현재 검색 API가 구현되어 있지 않습니다. 각 서브태그의
                        아이디를 띄어쓰기 없이 쉼포(,)로 연결해 작성해주세요.
                        (ex: 1,2,3)
                    </Text>
                    <TextField
                        placeholder=""
                        {...register("subTagIds", {
                            pattern: {
                                value: /^[0-9,]*$/,
                                message: "형식이 맞지 않습니다.",
                            },
                        })}
                        error={errors.subTagIds?.message}
                    />
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">시험 데이터 미리보기</Text>
                    <Button onClick={() => setShowRawData((e) => !e)}>
                        {showRawData ? "가리기" : "표시"}
                    </Button>
                    {showRawData && (
                        <CodeBlock>{JSON.stringify(data, null, 4)}</CodeBlock>
                    )}
                </Flex.Column>

                <Flex.Between>
                    <Button variant="contained" onClick={() => setStep(2)}>
                        이전
                    </Button>
                    <Text>3/3</Text>
                    <Button variant="contained" type="submit">
                        시험 생성
                    </Button>
                </Flex.Between>
            </Flex.Column>
        </form>
    );
}
