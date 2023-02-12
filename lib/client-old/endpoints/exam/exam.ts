import { Endpoint } from "../../types/endpoint";
import { CreateExamObject, ExamObject } from "./object/exam";

// POST /exams
export type PostExamParameter = CreateExamObject;
export const PostExam: Endpoint<PostExamParameter, PostExamResponse> = {
    path: () => `/exams`,
    method: "post",
    bodyParams: [
        "buttonTitle",
        "categoryId",
        "certifyingStatement",
        "description",
        "isPublic",
        "mainTagId",
        "problems",
        "subTagIds",
        "thumbnailUrl",
        "title",
    ],
    pathParams: [],
    queryParams: [],
};
export type PostExamResponse = {
    success: true;
};

// GET /exams/:id
export type getExamParameter = {
    id: number;
};
export const getExam: Endpoint<getExamParameter, getExamResponse> = {
    path: (e) => `/exams/${e.id}`,
    method: "get",
    pathParams: ["id"],
    bodyParams: [],
    queryParams: [],
};
export type getExamResponse = ExamObject;

// GET /exams
export type GetExamsParameter = {};
export const getExams: Endpoint<GetExamsParameter, GetExamsResponse> = {
    path: () => `/exams`,
    method: "get",
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type GetExamsResponse = {
    exams: ExamObject[];
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
export const PostExamThumbnail: Endpoint<
    PostExamThumbnailParameter,
    PostExamThumbnailResponse
> = {
    path: () => `/exams/thumbnail`,
    method: "post",
    bodyParams: [
        "category",
        "certifyingStatement",
        "mainTag",
        "nickName",
        "title",
        "type",
    ],
    pathParams: [],
    queryParams: [],
};
export type PostExamThumbnailResponse = {
    url: string;
};
