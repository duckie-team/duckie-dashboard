import { Endpoint } from "../../types/endpoint";

// POST /tags
export type PostTagParameter = {
    name: string;
};
export const PostTag: Endpoint<PostTagParameter, PostTagResponse> = {
    path: () => `/tags`,
    method: "post",
    bodyParams: ["name"],
    pathParams: [],
    queryParams: [],
};
export type PostTagResponse = {};
