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
                    "[ERROR] ????????? ?????? ?????? ????????? ?????? ??????, ?????? ??????"
                );
                console.log("categoryId", data.categoryId);
                return;
            }

            const category = categories?.categories.filter(
                (category) => category.id === +(data.categoryId || "-1")
            )[0];

            if (!category) {
                toast.warn(
                    "???????????? ????????? ?????? ??? ????????????. ???????????? ???????????? ???????????????"
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
                toast.error(`????????? ???????????????. (${err.code})`);
                console.error(err.body);
            } else {
                toast.error("????????? ????????? ??? ?????????.");
                console.error(err);
            }
        }
    };

    const uploadExam = async () => {
        try {
            // TODO: ThumbnailType ?????? ??????
            const res = await examClient.exams.post({
                ...(data as ExamAPI.Object.CreateExamObject),
                thumbnailType: "text",
                subTagIds: undefined,
            });
            router.push("/dashboard/domain/exam/list");
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error(`????????? ???????????????. (${err.code})`);
                if (err.body.errors) {
                    err.body.errors.map((e: any) =>
                        toast.warn(`${e.code} (${e.message})`)
                    );
                }
                console.error(err.body);
            } else {
                toast.error("????????? ????????? ??? ?????????.");
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
            title: "????????? ??????????????????????",
            content: "??? ??? ????????? ????????? ????????? ??? ?????????.",
            buttons: [
                {
                    children: "??????",
                    variant: "outlined",
                    onClick: () => null,
                },
                {
                    children: "??????",
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
                    <H3>?????????</H3>
                    <PreviewImage src={watch("thumbnailUrl")} />
                    <TextField
                        placeholder="????????? URL"
                        {...register("thumbnailUrl", {
                            required: "?????? ???????????????.",
                        })}
                        error={errors.thumbnailUrl?.message}
                    />
                    <Select
                        value={imageType}
                        onChange={(e) => setImageType(e.target.value as any)}
                    >
                        <Select.Option value={"generatedImage"}>
                            ????????? ??????
                        </Select.Option>
                        <Select.Option value={"uploadedImage"}>
                            ????????? ?????????
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
                                        ????????? ??????
                                    </Button>
                                </>
                            }
                        >
                            <TextField
                                placeholder="??????"
                                label="??????"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                placeholder="?????? ?????? ??????"
                                label="???????????? ??????"
                                value={mainTagName}
                                onChange={(e) => setMainTagName(e.target.value)}
                            />
                        </Box>
                    )}
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">?????? ???????????? ?????? ?????????</Text>
                    <TextField
                        placeholder="????????? ???????????? ????????? ??????????????????"
                        maxLength={12}
                        {...register("buttonTitle", {
                            required: "?????? ???????????????.",
                        })}
                        error={errors.buttonTitle?.message}
                    />
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">?????? ??????</Text>
                    <Text color={cv.red1}>
                        ?????? ?????? API??? ???????????? ?????? ????????????. ??? ???????????????
                        ???????????? ???????????? ?????? ??????(,)??? ????????? ??????????????????.
                        (ex: 1,2,3)
                    </Text>
                    <TextField
                        placeholder=""
                        {...register("subTagIds", {
                            pattern: {
                                value: /^[0-9,]*$/,
                                message: "????????? ?????? ????????????.",
                            },
                        })}
                        error={errors.subTagIds?.message}
                    />
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">?????? ????????? ????????????</Text>
                    <Button onClick={() => setShowRawData((e) => !e)}>
                        {showRawData ? "?????????" : "??????"}
                    </Button>
                    {showRawData && (
                        <CodeBlock>{JSON.stringify(data, null, 4)}</CodeBlock>
                    )}
                </Flex.Column>

                <Flex.Between>
                    <Button variant="contained" onClick={() => setStep(2)}>
                        ??????
                    </Button>
                    <Text>3/3</Text>
                    <Button variant="contained" type="submit">
                        ?????? ??????
                    </Button>
                </Flex.Between>
            </Flex.Column>
        </form>
    );
}
