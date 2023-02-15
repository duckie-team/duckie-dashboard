import { Endpoint } from "endpoint-client";
import { UserObject } from "../object/user.object";

// POST /auth/kakao
export type PostAuthKakaoParameter = {
    code: string;
};
export type PostAuthKakaoResponse = {
    isNewUser: boolean;
    accessToken: string;
    user: UserObject;
};
export const PostAuthKakao: Endpoint<
    PostAuthKakaoParameter,
    PostAuthKakaoResponse
> = {
    method: "POST",
    path: "/auth/kakao",
    bodyParams: ["code"],
};

// GET /auth/token
export type GetAuthTokenParameter = {};
export type GetAuthTokenResponse = {
    userId: number;
    type: "user";
};
export const GetAuthToken: Endpoint<
    GetAuthTokenParameter,
    GetAuthTokenResponse
> = {
    method: "GET",
    path: "/auth/token",
};
