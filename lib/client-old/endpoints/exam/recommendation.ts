import { Endpoint } from "../../types/endpoint";
import { ExamObject } from "./object";

// GET /recommendations
export type GetRecommendationsParameter = {
    page: number;
};
export type GetRecommendationsResponse = {
    jumbotrons?: ExamObject[];
    recommendations: {
        id: number;
        title: string;
        tag: {
            name: string;
            id: number;
        };
        exams: ExamObject[];
    }[];
    page: number;
};
export const GetRecommendations: Endpoint<
    GetRecommendationsParameter,
    GetRecommendationsResponse
> = {
    method: "get",
    path: () => `/recommendations`,
    bodyParams: [],
    pathParams: [],
    queryParams: ["page"],
};

// POST /recommendations
export type PostRecommendationsParameter = {
    tagId: number;
    examIds: number[];
    title: string;
};
export type PostRecommendationsResponse = {};
export const PostRecommendations: Endpoint<
    PostRecommendationsParameter,
    PostRecommendationsResponse
> = {
    method: "post",
    path: () => `/recommendations`,
    bodyParams: ["examIds", "title", "tagId"],
    pathParams: [],
    queryParams: [],
};

// PATCH /recommendations/:id
export type PatchRecommendationsParameter = {
    title: string;
    examIds: number[];
    id: number;
};
export type PatchRecommendationsResponse = {
    success: true;
};
export const PatchRecommendations: Endpoint<
    PatchRecommendationsParameter,
    PatchRecommendationsResponse
> = {
    method: "patch",
    path: (e) => `/recommendations/${e.id}`,
    bodyParams: ["examIds", "title"],
    pathParams: ["id"],
    queryParams: [],
};

// DELETE /recommendations/:id
export type DeleteRecommendationsParameter = {
    id: number;
};
export type DeleteRecommendationsResponse = {
    success: true;
};
export const DeleteRecommendations: Endpoint<
    DeleteRecommendationsParameter,
    DeleteRecommendationsResponse
> = {
    method: "delete",
    path: (e) => `/recommendations/${e.id}`,
    bodyParams: [],
    pathParams: ["id"],
    queryParams: [],
};
