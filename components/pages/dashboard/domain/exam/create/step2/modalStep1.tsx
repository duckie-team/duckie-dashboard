import {
    Button,
    Flex,
    H3,
    Select,
    SlideBox,
    Text,
    TextField,
    useSlideBox,
} from "opize-design-system";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ExamAPI } from "../../../../../../../lib/client/endpoints";
import { ModalDiv } from "./share";

type CreateProblemModalStep1Form = {
    text: string;
    type: ExamAPI.Object.QuestionObject["type"];
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
    } = useForm<CreateProblemModalStep1Form>();

    const submit = (data: CreateProblemModalStep1Form) => {
        if (data.type === "text") {
            setQuestion({
                text: data.text,
                type: data.type,
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
