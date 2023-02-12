import { Endpoint } from "endpoint-client";
import { CategoryObject } from "../object/category.object";

// GET /categories
export type GetCategoriesParameter = {
    withPopularTags?: boolean;
};
export type GetCategoriesResponse = {
    categories: CategoryObject[];
};
export const GetCategories: Endpoint<
    GetCategoriesParameter,
    GetCategoriesResponse
> = {
    method: "GET",
    path: "/categories",
    queryParams: ["withPopularTags"],
};

// POST /categories
export type PostCategoryParameter = {
    name: string;
    thumbnailUrl: string;
};
export type PostCategoryResponse = {
    success: true;
};
export const PostCategory: Endpoint<
    PostCategoryParameter,
    PostCategoryResponse
> = {
    method: "POST",
    path: "/categories",
    bodyParams: ["name", "thumbnailUrl"],
};
