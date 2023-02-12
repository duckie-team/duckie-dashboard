import { Endpoint } from "endpoint-client";

// POST /terms/create
export type PostTermsParameter = {
    condition: string;
    version: string;
};
export type PostTermsResponse = {
    condition: string;
    version: string;
    id: number;
    createdAt: string;
};
export const PostTerms: Endpoint<PostTermsParameter, PostTermsResponse> = {
    path: () => `/terms`,
    method: "POST",
    bodyParams: ["condition", "version"],
};

// GET /terms/:version
export type GetTermParameter = {
    version: string;
};
export type GetTermResponse = {
    condition: string;
    version: string;
    id: number;
    createdAt: string;
};
export const GetTerm: Endpoint<GetTermParameter, GetTermResponse> = {
    path: (e) => `/terms/${e.version}`,
    method: "GET",
    pathParams: ["version"],
};

// GET /terms/latestVersion
export type GetTermLatestVersionParameter = {};
export type GetTermLatestVersionResponse = {
    version: string;
};
export const GetTermsLatestVersion: Endpoint<
    GetTermLatestVersionParameter,
    GetTermLatestVersionResponse
> = {
    path: (e) => `/terms/latestVersion`,
    method: "GET",
    pathParams: [],
};
