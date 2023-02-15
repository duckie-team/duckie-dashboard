import { Endpoint } from "../../types/endpoint";
import { UserObject } from "./object";

// GET /users/:id
export type GetUserParameter = {
    id: number;
};
export const GetUser: Endpoint<GetUserParameter, GetUserResponse> = {
    path: (e) => `/users/${e.id}`,
    method: "get",
    pathParams: ["id"],
    bodyParams: [],
    queryParams: [],
};
export type GetUserResponse = UserObject;

// POST /users/:id
export type PatchUserParameter = {
    categories?: number[];
    tags?: number[];
    profileImageUrl?: string;
    nickName?: string;
    id: number;
};
export const PatchUser: Endpoint<PatchUserParameter, PatchUserResponse> = {
    path: (e) => `/users/${e.id}`,
    method: "patch",
    pathParams: ["id"],
    bodyParams: ["categories", "nickName", "profileImageUrl", "tags"],
    queryParams: [],
};
export type PatchUserResponse = UserObject;
