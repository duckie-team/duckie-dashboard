import {
    Button,
    Divider,
    FileField,
    Flex,
    H3,
    Select,
    SlideBox,
    Text,
    TextField,
    useSlideBox,
} from "opize-design-system";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { examClient } from "../../../../../../../lib/client-old/client";
import { ExamAPI } from "../../../../../../../lib/client-old/endpoints";
import { APIResponseError } from "../../../../../../../lib/client-old/error";
import { ModalDiv } from "./share";

const ImagePreview = styled.img``;
function TypeImage({ setFileUrl }: { setFileUrl: (url: string) => void }) {
    const [previewFile, setPreviewFile] = useState<string | ArrayBuffer>();
    const [file, setFile] = useState<File>();
    const fileRef = useRef<HTMLInputElement>(null);

    const setFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onloadend = () => {
            if (!reader.result) return;
            setPreviewFile(reader.result);
        };
    };

    const uploadFile = async () => {
        const buffer = await file?.arrayBuffer();

        try {
            const res = await examClient.file.post({
                file: buffer,
                type: "problem-question-image",
            });
            setFileUrl(res.url);
            console.log(res.url);
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error("서버에서 잘못된 응답을 반환했어요.");
                console.error(err);
            } else {
                toast.error("서버와 연결할 수 없어요.");
                console.error(err);
            }
        }
    };

    return (
        <>
            <Divider />
            <Flex.Row gap="4px">
                <FileField
                    accept={"image/*"}
                    type={"file"}
                    ref={fileRef}
                    onChange={(e) => setFileHandler(e)}
                    buttonText="파일 선택"
                />
                <Button width="130px" onClick={() => uploadFile()}>
                    파일 업로드
                </Button>
            </Flex.Row>

            <ImagePreview src={previewFile as string} />
        </>
    );
}

type CreateProblemModalStep1Form = {
    text: string;
    type: ExamAPI.Object.QuestionObject["type"];
    fileUrl: string;
};
export function CreateProblemModalStep1({
    setQuestion,
    question,
}: {
    question?: ExamAPI.Object.QuestionObject;
    setQuestion: (problem: ExamAPI.Object.QuestionObject) => void;
}) {
    const { move, now } = useSlideBox();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<CreateProblemModalStep1Form>({
        defaultValues: {
            type: "text",
        },
    });

    const submit = (data: CreateProblemModalStep1Form) => {
        if (data.type === "text") {
            setQuestion({
                text: data.text,
                type: data.type,
            });
        } else if (data.type === "image") {
            setQuestion({
                text: data.text,
                type: data.type,
                imageUrl: data.fileUrl,
            });
        } else {
            toast.info("아직 텍스트를 제외한 나머지 기능은 지원하지 않습니다.");
            return;
        }
        move(1);
    };

    return (
        <SlideBox.Page pos={0}>
            <form onSubmit={handleSubmit(submit)}>
                <ModalDiv>
                    <H3>질문</H3>
                    <Select {...register("type")}>
                        <Select.Option value={"text"}>텍스트</Select.Option>
                        <Select.Option value={"image"}>이미지</Select.Option>
                        <Select.Option value={"audio"}>오디오</Select.Option>
                        <Select.Option value={"video"}>비디오</Select.Option>
                    </Select>
                    <TextField
                        placeholder="문제를 입력해주세요."
                        {...register("text", {
                            required: "필수 항목입니다.",
                        })}
                        error={errors.text?.message}
                    />
                    {watch("type") !== "text" && (
                        <TextField
                            placeholder="파일 URL"
                            {...register("fileUrl", {
                                required: {
                                    message: "필수 항목입니다.",
                                    value: watch("type") !== "text",
                                },
                            })}
                            error={errors.fileUrl?.message}
                        />
                    )}
                    {watch("type") === "image" && (
                        <TypeImage setFileUrl={(e) => setValue("fileUrl", e)} />
                    )}

                    <Flex.Between>
                        <div />
                        <Text>1/3</Text>
                        <Button variant="contained" type="submit">
                            다음
                        </Button>
                    </Flex.Between>
                </ModalDiv>
            </form>
        </SlideBox.Page>
    );
}
