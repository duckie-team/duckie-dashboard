import {
    Button,
    CodeBlock,
    Flex,
    H3,
    Select,
    SlideBox,
    Text,
    TextField,
    useModal,
    useSlideBox,
} from "opize-design-system";
import { useForm } from "react-hook-form";
import { toast, useToast } from "react-toastify";
import { ExamAPI } from "../../../../../../../lib/client-old/endpoints";
import { ModalDiv } from "./share";

type CreateProblemModalStep3Form = {
    hint?: string;
    memo?: string;
};
export function CreateProblemModalStep3({
    problems,
    setProblems,
    answer,
    question,
    correctAnswer,
}: {
    question?: ExamAPI.Object.QuestionObject;
    answer?: ExamAPI.Object.AnswerObject;
    setProblems: (problems: ExamAPI.Object.CreateProblemObject[]) => void;
    problems: ExamAPI.Object.CreateProblemObject[];
    correctAnswer?: string;
}) {
    const modal = useModal();
    const { move, now } = useSlideBox();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProblemModalStep3Form>();

    const submit = (data: CreateProblemModalStep3Form) => {
        if (!answer || !question || !correctAnswer) {
            console.error("answer", answer);
            console.error("question", question);
            console.error("correctAnswer", correctAnswer);
            toast.error(
                `[ERROR] 주요 내용이 채워지지 않은 상태로 생성을 시도했습니다. 콘솔을 확인하세요.`
            );
            return;
        }

        setProblems([
            ...problems,
            {
                answer,
                question,
                hint: data.hint,
                memo: data.memo,
                correctAnswer,
            },
        ]);

        modal.close();
    };

    return (
        <SlideBox.Page pos={2}>
            <form onSubmit={handleSubmit(submit)}>
                <ModalDiv>
                    <H3>힌트 & 메모</H3>
                    <TextField
                        placeholder="힌트 (선택)"
                        {...register("hint")}
                    />
                    <TextField
                        placeholder="메모 (선택)"
                        {...register("memo")}
                    />
                    <Flex.Between>
                        <Button variant="contained" onClick={() => move(1)}>
                            이전
                        </Button>
                        <Text>3/3</Text>
                        <Button variant="contained" type="submit">
                            생성
                        </Button>
                    </Flex.Between>
                </ModalDiv>
            </form>
        </SlideBox.Page>
    );
}
