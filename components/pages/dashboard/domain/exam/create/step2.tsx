import {
    Button,
    Flex,
    ItemsTable,
    SlideBox,
    Text,
    useModal,
} from "opize-design-system";
import { X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateExamContext } from "../../../../../../context/pages/dashboard/domain/exam/exam.context";
import { ExamAPI } from "../../../../../../lib/client";
import { CreateProblemModalStep1 } from "./step2/modalStep1";
import { CreateProblemModalStep2 } from "./step2/modalStep2";
import { CreateProblemModalStep3 } from "./step2/modalStep3";

type Step2Form = Pick<ExamAPI.Object.CreateExamObject, "problems">;

function CreateProblemModal({
    problems,
    setProblems,
}: {
    setProblems: (problems: ExamAPI.Object.CreateProblemObject[]) => void;
    problems: ExamAPI.Object.CreateProblemObject[];
}) {
    const [question, setQuestion] = useState<ExamAPI.Object.QuestionObject>();
    const [answer, setAnswer] = useState<ExamAPI.Object.AnswerObject>();
    const [correctAnswer, setCorrectAnswer] = useState("");

    return (
        <>
            <SlideBox>
                <CreateProblemModalStep1
                    question={question}
                    setQuestion={setQuestion}
                />
                <CreateProblemModalStep2
                    answer={answer}
                    setAnswer={setAnswer}
                    correctAnswer={correctAnswer}
                    setCorrectAnswer={setCorrectAnswer}
                />
                <CreateProblemModalStep3
                    question={question}
                    answer={answer}
                    correctAnswer={correctAnswer}
                    setProblems={setProblems}
                    problems={problems}
                />
            </SlideBox>
        </>
    );
}

export function CreateStep2() {
    const modal = useModal();
    const { setData, data, setStep } = useContext(CreateExamContext);

    const problems = data.problems;

    const createProblem = () => {
        modal.open(
            <CreateProblemModal
                setProblems={(problems) =>
                    setData({
                        ...data,
                        problems: problems,
                    })
                }
                problems={data.problems || []}
            />,
            {
                width: "400px",
                isPadding: false,
            }
        );
    };

    const removeProblem = (problem: ExamAPI.Object.CreateProblemObject) => {
        setData({
            ...data,
            problems: problems?.filter((e) => e !== problem),
        });
    };

    const nextStep = () => {
        setStep(3);
    };

    return (
        <Flex.Column gap="32px">
            <ItemsTable>
                {problems?.map((problem, i) => (
                    <ItemsTable.Row key={i}>
                        <ItemsTable.Row.Text
                            text={problem.question?.text || ""}
                            subText={`정답: ${problem.correctAnswer}`}
                        />
                        <ItemsTable.Row.Buttons
                            buttons={[
                                [
                                    {
                                        label: "삭제",
                                        color: "red",
                                        icon: <X />,
                                        onClick: () => removeProblem(problem),
                                    },
                                ],
                            ]}
                        />
                    </ItemsTable.Row>
                ))}
                <ItemsTable.Row>
                    <ItemsTable.Row.Component>
                        <Flex.Between style={{ width: "100%" }}>
                            <Text>{problems?.length || 0} / 10 (최소 5개)</Text>
                            <Button onClick={createProblem}>문제 추가</Button>
                        </Flex.Between>
                    </ItemsTable.Row.Component>
                </ItemsTable.Row>
            </ItemsTable>
            <Flex.Between>
                <Button variant="contained" onClick={() => setStep(1)}>
                    이전
                </Button>
                <Text>2/3</Text>
                <Button
                    variant="contained"
                    onClick={nextStep}
                    disabled={(data.problems?.length || 0) < 5}
                >
                    다음
                </Button>
            </Flex.Between>
        </Flex.Column>
    );
}
