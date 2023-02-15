import { Endpoint } from "endpoint-client";

// POST /follows
export type PostFollowParameter = {
    followingId: number;
};
export type PostFollowResponse = {
    success: true;
};
export const PostFollow: Endpoint<PostFollowParameter, PostFollowResponse> = {
    method: "POST",
    path: "/follows",
    bodyParams: ["followingId"],
};

// DELETE /follows
export type DeleteFollowParameter = {
    followingId: number;
};
export type DeleteFollowResponse = {
    success: true;
};
export const DeleteFollow: Endpoint<
    DeleteFollowParameter,
    DeleteFollowResponse
> = {
    method: "DELETE",
    path: "/follows",
    bodyParams: ["followingId"],
};
