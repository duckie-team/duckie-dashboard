import { Endpoint } from "../../types/endpoint";

// GET /categories
export type GetCategoriesParameter = {
    withPopularTags: boolean;
};
export const GetExamCategories: Endpoint<
    GetCategoriesParameter,
    GetCategoriesResponse
> = {
    path: () => `/categories`,
    method: "get",
    queryParams: ["withPopularTags"],
    bodyParams: [],
    pathParams: [],
};
export type GetCategoriesResponse = {
    categories: {
        id: number;
        name: string;
        popularTags: {
            name: string;
            id: number;
        }[];
    }[];
};
