import { Endpoint } from "../../types/endpoint";

// POST /auth/kakao
export type PostAuthKakaoParameter = {
    code: string;
};
export const PostAuthKakao: Endpoint<
    PostAuthKakaoParameter,
    PostAuthKakaoResponse
> = {
    path: () => `/auth/kakao`,
    method: "post",
    bodyParams: ["code"],
    pathParams: [],
    queryParams: [],
};
export type PostAuthKakaoResponse = {
    accessToken: string;
    isNewUser: boolean;
};

// GET /auth/token
export type GetAuthTokenParameter = {};
export const GetAuthToken: Endpoint<
    GetAuthTokenParameter,
    GetAuthTokenResponse
> = {
    path: () => `/auth/token`,
    method: "get",
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type GetAuthTokenResponse = {
    userId: number;
    type: string;
};
