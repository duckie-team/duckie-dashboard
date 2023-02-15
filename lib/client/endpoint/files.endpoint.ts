import { Endpoint } from "endpoint-client";

// POST /files
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
export type PostFileResponse = {
    url: string;
};
export const PostFile: Endpoint<PostFileParameter, PostFileResponse> = {
    method: "POST",
    path: "/files",
    bodyParams: ["file", "type"],
};
