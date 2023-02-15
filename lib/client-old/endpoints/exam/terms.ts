import { verify } from "crypto";
import { Endpoint } from "../../types/endpoint";

// POST /terms
export type PostTermsParameter = {
    condition: string;
    version: string;
};
export const PostTerms: Endpoint<PostTermsParameter, PostTermsResponse> = {
    path: () => `/terms`,
    method: "post",
    bodyParams: ["condition", "version"],
    pathParams: [],
    queryParams: [],
};
export type PostTermsResponse = {
    condition: string;
    version: string;
    id: number;
    createdAt: string;
};

// GET /terms/:version
export type GetTermParameter = {
    version: string;
};
export const GetTerms: Endpoint<GetTermParameter, GetTermResponse> = {
    path: (e) => `/terms/${e.version}`,
    method: "get",
    pathParams: ["version"],
    bodyParams: [],
    queryParams: [],
};
export type GetTermResponse = {
    condition: string;
    version: string;
    id: number;
    createdAt: string;
};
