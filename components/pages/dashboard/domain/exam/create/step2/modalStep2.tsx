import {
    Button,
    Flex,
    H3,
    ItemsTable,
    Select,
    SlideBox,
    Text,
    TextField,
    useModal,
    useSlideBox,
} from "opize-design-system";
import { Check, CheckCircle, Circle, X } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ExamAPI } from "../../../../../../../lib/client/endpoints";
import { ModalDiv } from "./share";

function CreateProblemModalStep2ShortAnswer({
    setCorrectAnswer,
    correctAnswer,
}: {
    correctAnswer?: string;
    setCorrectAnswer: (correctAnswer: string) => void;
}) {
    useEffect(() => {
        setCorrectAnswer("");
    }, [setCorrectAnswer]);

    return (
        <TextField
            placeholder="정답을 입력하세요"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
        />
    );
}

function CreateProblemModalStep2Choices({
    choices,
    setChoices,
    setCorrectAnswer,
    correctAnswer,
}: {
    choices: ExamAPI.Object.ChoiceAnswerObject["choices"];
    setChoices: (choices: ExamAPI.Object.ChoiceAnswerObject["choices"]) => void;
    correctAnswer?: string;
    setCorrectAnswer: (correctAnswer: string) => void;
}) {
    const [createText, setCreateText] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setCorrectAnswer("");
    }, [setCorrectAnswer]);

    const addChoice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!createText) return;
        if (choices.map((e) => e.text).includes(createText)) return;

        setChoices([
            ...choices,
            {
                text: createText,
            },
        ]);
        setCreateText("");
        ref.current?.focus();
    };

    const removeChoice = (text: string) => {
        setChoices(choices.filter((e) => e.text !== text));
    };

    const setAnswer = (text: string) => {
        setCorrectAnswer(String(choices.findIndex((e) => e.text === text)));
    };

    return (
        <>
            <ItemsTable>
                {choices.map((choice, i) => (
                    <ItemsTable.Row key={i}>
                        <ItemsTable.Row.Text text={choice.text} />
                        <Button
                            icon={
                                correctAnswer === String(i) ? (
                                    <Check />
                                ) : (
                                    <Circle />
                                )
                            }
                            variant="text"
                            onClick={() => setAnswer(choice.text)}
                            tooltip={{
                                text: "이 보기를 정답으로 설정합니다.",
                            }}
                        />
                        <Button
                            icon={<X />}
                            color="red"
                            variant="text"
                            onClick={() => removeChoice(choice.text)}
                            tooltip={{
                                text: "삭제하기",
                            }}
                        />
                    </ItemsTable.Row>
                ))}
            </ItemsTable>

            <form onSubmit={(e) => addChoice(e)}>
                <Flex.Column gap="8px">
                    <TextField
                        placeholder={
                            choices.length >= 5
                                ? "최대 5개까지 만들 수 있습니다."
                                : "새로운 보기를 입력하세요"
                        }
                        value={createText}
                        onChange={(e) => setCreateText(e.target.value)}
                        disabled={choices.length >= 5}
                        ref={ref}
                    />

                    <Flex.Between>
                        <Text>{choices.length} / 5</Text>
                        <Button
                            disabled={
                                createText === "" ||
                                choices.map((e) => e.text).includes(createText)
                            }
                            type="submit"
                        >
                            보기 추가
                        </Button>
                    </Flex.Between>
                </Flex.Column>
            </form>
        </>
    );
}

export function CreateProblemModalStep2({
    setAnswer,
    answer,
    setCorrectAnswer,
    correctAnswer,
}: {
    answer?: ExamAPI.Object.AnswerObject;
    setAnswer: (problem: ExamAPI.Object.AnswerObject) => void;
    correctAnswer?: string;
    setCorrectAnswer: (correctAnswer: string) => void;
}) {
    const { move } = useSlideBox();

    const [type, setType] =
        useState<ExamAPI.Object.AnswerObject["type"]>("shortAnswer");

    const [choices, setChoices] = useState<
        ExamAPI.Object.ChoiceAnswerObject["choices"]
    >([]);
    const [imageChoices, setImageChoices] = useState<
        ExamAPI.Object.ImageChoiceAnsWerObject["imageChoice"]
    >([]);

    const submit = () => {
        if (!correctAnswer) {
            toast.warn("정답을 입력해주세요.");
            return;
        }

        if (type === "shortAnswer") {
            setAnswer({
                type: "shortAnswer",
            });
        }

        if (type === "choice") {
            setAnswer({
                type: "choice",
                choices: choices,
            });
        }

        if (type === "imageChoice") {
            setAnswer({
                type: "imageChoice",
                imageChoice: imageChoices,
            });
        }
        move(2);
    };

    return (
        <SlideBox.Page pos={1}>
            <ModalDiv>
                <H3>답</H3>

                <Select
                    value={type}
                    onChange={(e) =>
                        setType(
                            e.target
                                .value as ExamAPI.Object.AnswerObject["type"]
                        )
                    }
                >
                    <Select.Option value={"shortAnswer"}>단답형</Select.Option>
                    <Select.Option value={"choice"}>선택형</Select.Option>
                    <Select.Option value={"imageChoice"}>
                        이미지 선택형
                    </Select.Option>
                </Select>

                {type === "shortAnswer" && (
                    <CreateProblemModalStep2ShortAnswer
                        setCorrectAnswer={setCorrectAnswer}
                        correctAnswer={correctAnswer}
                    />
                )}

                {type === "choice" && (
                    <CreateProblemModalStep2Choices
                        choices={choices}
                        setChoices={setChoices}
                        setCorrectAnswer={setCorrectAnswer}
                        correctAnswer={correctAnswer}
                    />
                )}
                {type === "imageChoice" && <>이미지 선택</>}

                <Flex.Between>
                    <Button variant="contained" onClick={() => move(0)}>
                        이전
                    </Button>
                    <Text>2/3</Text>
                    <Button variant="contained" onClick={() => submit()}>
                        다음
                    </Button>
                </Flex.Between>
            </ModalDiv>
        </SlideBox.Page>
    );
}
