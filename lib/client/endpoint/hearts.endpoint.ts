import { Endpoint } from "endpoint-client";

// POST /hearts
export type PostHeartParameter = {
    examId: number;
};
export type PostHeartResponse = {
    id: number;
};
export const PostHeart: Endpoint<PostHeartParameter, PostHeartResponse> = {
    method: "POST",
    path: "/hearts",
    bodyParams: ["examId"],
};

// DELETE /hearts
export type DeleteHeartParameter = {
    id: number;
};
export type DeleteHeartResponse = {
    success: true;
};
export const DeleteHeart: Endpoint<DeleteHeartParameter, DeleteHeartResponse> =
    {
        method: "DELETE",
        path: (e) => `/hearts/${e.id}`,
        pathParams: ["id"],
    };
