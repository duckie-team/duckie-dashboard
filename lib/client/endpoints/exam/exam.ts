import { Endpoint } from "../../types/endpoint";
import { CreateExamObject, ExamObject } from "./object/exam";

// POST /exams
export type PostExamParameter = CreateExamObject;
export const PostExam: Endpoint<PostExamParameter, PostExamResponse> = {
    path: () => `/exams`,
    method: "post",
    bodyParams: [
        "buttonText",
        "categoryId",
        "certifyingStatement",
        "description",
        "isPublic",
        "mainTagId",
        "problems",
        "subTagIds",
        "thumbnailType",
        "title",
        "thumbnailImageUrl",
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
