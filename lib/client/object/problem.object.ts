import { AnswerObject } from "./answer.object";
import { QuestionObject } from "./question.object";

export type ProblemObject = {
    id: number;
    answer?: AnswerObject;
    question?: QuestionObject;
    hint?: string;
    memo?: string;
    correctAnswer?: string;
};
export type CreateProblemObject = Omit<ProblemObject, "id">;
