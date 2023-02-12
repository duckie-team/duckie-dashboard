import { Endpoint } from "../../types/endpoint";

// POST /file
export type PostFileParameter = {
    file: any;
    type:
        | "profile"
        | "problem-question-image"
        | "problem-question-audio"
        | "problem-question-video"
        | "problem-answer"
        | "exam-thumbnail"
        | "exam-thumbnail-resource";
};
export const PostFile: Endpoint<PostFileParameter, PostFileResponse> = {
    path: () => "/files",
    method: "post",
    bodyParams: ["file", "type"],
    pathParams: [],
    queryParams: [],
    contentType: "multipart/form-data",
};
export type PostFileResponse = {
    url: string;
};
