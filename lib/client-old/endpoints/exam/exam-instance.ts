import { Endpoint } from "../../types/endpoint";

// POST /exam-instance
export type PostExamInstanceParameter = {
    id: number;
};
export const PostExamInstance: Endpoint<
    PostExamInstanceParameter,
    PostExamInstanceResponse
> = {
    path: () => `/exam-instance`,
    method: "post",
    bodyParams: ["id"],
    pathParams: [],
    queryParams: [],
};
export type PostExamInstanceResponse = {
    success: true;
};

// POST /exam-instance/:id/submit
export type PostExamInstanceSubmitParameter = {
    submitted: string[];
    id: number;
};
export const PostExamInstanceSubmit: Endpoint<
    PostExamInstanceSubmitParameter,
    PostExamInstanceSubmitResponse
> = {
    path: (e) => `/exam-instance/${e.id}/submit`,
    method: "post",
    bodyParams: ["submitted"],
    pathParams: ["id"],
    queryParams: [],
};
export type PostExamInstanceSubmitResponse = {
    results: string[];
    message: string;
};
