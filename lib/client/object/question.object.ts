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
