import { Endpoint } from "endpoint-client";
import { CreateExamObject, ExamObject } from "../object/exam.object";

// POST /exams
export type PostExamParameter = CreateExamObject;
export type PostExamResponse = {
    success: true;
};
export const PostExam: Endpoint<PostExamParameter, PostExamResponse> = {
    method: "POST",
    path: "/exams",
    bodyParams: [
        "buttonTitle",
        "categoryId",
        "certifyingStatement",
        "description",
        "mainTagId",
        "problems",
        "status",
        "subTagIds",
        "thumbnailType",
        "thumbnailUrl",
        "title",
    ],
};

// GET /exams
export type GetExamsParameter = {
    tagId?: number;
};
export type GetExamsResponse = {
    exams: ExamObject[];
};
export const GetExams: Endpoint<GetExamsParameter, GetExamsResponse> = {
    method: "GET",
    path: "/exams",
    queryParams: ["tagId"],
};

// GET /exams/:id
export type GetExamParameter = {
    id: number;
};
export type GetExamResponse = ExamObject;
export const GetExam: Endpoint<GetExamParameter, GetExamResponse> = {
    method: "GET",
    path: (e) => `/exams/${e.id}`,
    pathParams: ["id"],
};

// PATCH /exams/:id
export type PatchExamParameter = {
    id: number;
    status?: "READY" | "REJECTED" | "PENDING";
    isJumbotron?: boolean;
};
export type PatchExamResponse = {
    success: true;
};
export const PatchExam: Endpoint<PatchExamParameter, PatchExamResponse> = {
    method: "PATCH",
    path: (e) => `/exams/${e.id}`,
    bodyParams: ["isJumbotron", "status"],
    pathParams: ["id"],
};

// GET /exams/me/following
export type GetExamsMeFollowingParameter = {
    page?: number;
};
export type GetExamsMeFollowingResponse = {
    exams: ExamObject[];
};
export const GetExamsMeFollowing: Endpoint<
    GetExamsMeFollowingParameter,
    GetExamsMeFollowingResponse
> = {
    method: "GET",
    path: "/exams/me/following",
};

// POST /exams/thumbnail
export type PostExamThumbnailParameter = {
    title: string;
    mainTag: string;
    category: string;
    nickName: string;
    certifyingStatement: string;
    type: "text" | "image";
};
export type PostExamThumbnailResponse = {
    url: string;
};
export const PostExamThumbnail: Endpoint<
    PostExamThumbnailParameter,
    PostExamThumbnailResponse
> = {
    method: "POST",
    path: "/exams/thumbnail",
    bodyParams: [
        "category",
        "certifyingStatement",
        "mainTag",
        "nickName",
        "title",
        "type",
    ],
};
