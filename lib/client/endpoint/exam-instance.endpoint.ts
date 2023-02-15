import { Endpoint } from "endpoint-client";
import { ExamInstanceObject } from "../object/examInstance.object";

// POST /exam-instance
export type PostExamInstanceParameter = {
    examId: number;
};
export type PostExamInstanceResponse = {
    success: true;
};
export const PostExamInstance: Endpoint<
    PostExamInstanceParameter,
    PostExamInstanceResponse
> = {
    method: "POST",
    path: "/exam-instance",
    bodyParams: ["examId"],
};

// GET /exam-instance/:id
export type GetExamInstanceParameter = {
    id: number;
};
export type GetExamInstanceResponse = ExamInstanceObject;
export const GetExamInstance: Endpoint<
    GetExamInstanceParameter,
    GetExamInstanceResponse
> = {
    method: "GET",
    path: (e) => `/exam-instance/${e.id}`,
    pathParams: ["id"],
};

// POST /exam-instance/:id/submit
export type PostExamInstanceSubmitParameter = {
    id: number;
    submitted: string[];
};
export type PostExamInstanceSubmitResponse = {
    examScoreImageUrl: string;
};
export const PostExamInstanceSubmit: Endpoint<
    PostExamInstanceSubmitParameter,
    PostExamInstanceSubmitResponse
> = {
    method: "POST",
    path: (e) => `/exam-instance/${e.id}/submit`,
    bodyParams: ["submitted"],
    pathParams: ["id"],
};
