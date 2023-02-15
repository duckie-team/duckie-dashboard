import { Endpoint } from "endpoint-client";
import { CategoryObject } from "../object/category.object";
import { UserObject } from "../object/user.object";

// GET /users/:id
export type GetUserParameter = {
    id: number;
};
export type GetUserResponse = UserObject;
export const GetUser: Endpoint<GetUserParameter, GetUserResponse> = {
    path: (e) => `/users/${e.id}`,
    method: "GET",
    pathParams: ["id"],
};

// PATCH /users/:id
export type PatchUserParameter = {
    categories?: number[];
    tags?: number[];
    profileImageUrl?: string;
    nickName?: string;
    status?: UserObject["status"];

    id: number;
};
export type PatchUserResponse = UserObject;
export const PatchUser: Endpoint<PatchUserParameter, PatchUserResponse> = {
    path: (e) => `/users/${e.id}`,
    method: "PATCH",
    pathParams: ["id"],
    bodyParams: ["categories", "nickName", "profileImageUrl", "tags"],
};

// GET /users/:nickname/duplicate-check
export type GetUserNicknameDuplicateCheckParameter = {
    nickName: string;
};
export type GetUserNicknameDuplicateCheckResponse = {
    success: true;
};
export const GetUserNicknameDuplicateCheck: Endpoint<
    GetUserNicknameDuplicateCheckParameter,
    GetUserNicknameDuplicateCheckResponse
> = {
    method: "GET",
    path: (e) => `/users/${e.nickName}/duplicate-check`,
    pathParams: ["nickName"],
};

// GET /users/following
export type GetUserFollowingParameter = {
    userId: string;
};
export type GetUserFollowingResponse = {
    userRecommendations: {
        category: CategoryObject;
        users: UserObject[];
    };
};
export const GetUserFollowing: Endpoint<
    GetUserFollowingParameter,
    GetUserFollowingResponse
> = {
    method: "GET",
    path: "/user/following",
    queryParams: ["userId"],
};

// GET /users/me/followers
export type GetUserMeFollowersParameter = {};
export type GetUserMeFollowersResponse = {
    users: UserObject[];
};
export const GetUserMeFollowers: Endpoint<
    GetUserMeFollowersParameter,
    GetUserMeFollowersResponse
> = {
    method: "GET",
    path: "/users/me/followers",
};

// GET /users/me/followings
export type GetUserMeFollowingsParameter = {};
export type GetUserMeFollowingsResponse = {
    users: UserObject[];
};
export const GetUserMeFollowings: Endpoint<
    GetUserMeFollowingsParameter,
    GetUserMeFollowingsResponse
> = {
    method: "GET",
    path: "/users/me/followings",
};
