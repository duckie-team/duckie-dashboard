export type CreateProblemObject = Omit<ProblemObject, "id">;

export type ProblemObject = {
    question: QuestionObject;
    answer: AnswerObject;
    correctAnswer: string;
    hint?: string;
    memo?: string;
};

// Question
export type QuestionObject =
    | TextQuestionObject
    | ImageQuestionObject
    | AudioQuestionObject
    | VideoQuestionObject;
export type TextQuestionObject = {
    type: "text";
    text: string;
};
export type ImageQuestionObject = {
    type: "image";
    text: string;
    imageUrl: string;
};
export type AudioQuestionObject = {
    type: "audio";
    text: string;
    audioUrl: string;
};
export type VideoQuestionObject = {
    type: "video";
    text: string;
    videoUrl: string;
};

// Answer
export type AnswerObject =
    | ShortAnswerAnswerObject
    | ChoiceAnswerObject
    | ImageChoiceAnsWerObject;
export type ShortAnswerAnswerObject = {
    type: "shortAnswer";
};
export type ChoiceAnswerObject = {
    type: "choice";
    choices: {
        text: string;
    }[];
};
export type ImageChoiceAnsWerObject = {
    type: "imageChoice";
    imageChoice: {
        text: string;
        imageUrl: string;
    }[];
};
