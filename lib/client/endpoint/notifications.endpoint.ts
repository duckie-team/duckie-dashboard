import { Endpoint } from "endpoint-client";

// POST /notifications
export type PostNotificationParameter = {
    title?: string;
    body?: string;
    type?: "new_comment" | "feed" | "follow" | "post_like" | "duck_deal";
    userId?: number;
    senderId?: number;
};
export type PostNotificationResponse = {};
export const PostNotification: Endpoint<
    PostNotificationParameter,
    PostNotificationResponse
> = {
    method: "POST",
    path: "/notifications",
    bodyParams: ["body", "senderId", "title", "type", "userId"],
};
