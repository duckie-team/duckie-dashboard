import { Endpoint } from "endpoint-client";
import { ExamObject } from "../object/exam.object";
import { RecommendationObject } from "../object/recommendation.object";

// POST /recommendations
export type PostRecommendationParameter = {
    tagId?: number;
    examIds: number[];
    title: string;
};
export type PostRecommendationResponse = {
    success: true;
};
export const PostRecommendation: Endpoint<
    PostRecommendationParameter,
    PostRecommendationResponse
> = {
    method: "POST",
    path: "/recommendations",
    bodyParams: ["examIds", "tagId", "title"],
};

// GET /recommendations
export type GetRecommendationsParameter = {
    page?: number;
};
export type GetRecommendationsResponse = {
    jumbotrons?: ExamObject[];
    recommendations: RecommendationObject[];
    page?: number;
};
export const GetRecommendations: Endpoint<
    GetRecommendationsParameter,
    GetRecommendationsResponse
> = {
    method: "GET",
    path: "/recommendations",
    queryParams: ["page"],
};

// PATCH /recommendations/:id
export type PatchRecommendationParameter = {
    title?: string;
    examIds?: number[];
    priority?: number;
    id: number;
};
export type PatchRecommendationResponse = {
    success: true;
};
export const PatchRecommendation: Endpoint<
    PatchRecommendationParameter,
    PatchRecommendationResponse
> = {
    method: "PATCH",
    path: (e) => `/recommendations/${e.id}`,
    bodyParams: ["examIds", "priority", "title"],
    pathParams: ["id"],
};

// DELETE /recommendations/:id
export type DeleteRecommendationParameter = {
    id: number;
};
export type DeleteRecommendationResponse = {
    success: true;
};
export const DeleteRecommendation: Endpoint<
    DeleteRecommendationParameter,
    DeleteRecommendationResponse
> = {
    method: "DELETE",
    path: (e) => `/recommendations/:${e.id}`,
    pathParams: ["id"],
};
