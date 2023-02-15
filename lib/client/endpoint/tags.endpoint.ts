import { Endpoint } from "endpoint-client";

// POST /tags
export type PostTagParameter = {
    name: string;
};
export type PostTagResponse = {};
export const PostTag: Endpoint<PostTagParameter, PostTagResponse> = {
    path: `/tags`,
    method: "POST",
    bodyParams: ["name"],
};
