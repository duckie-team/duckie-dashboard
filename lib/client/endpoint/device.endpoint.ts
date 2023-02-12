import { Endpoint } from "endpoint-client";

// POST /devices
export type PostDeviceParameter = {
    // FCM 기기 토큰
    token: string;
};
export type PostDeviceResponse = {};
export const PostDevice: Endpoint<PostDeviceParameter, PostDeviceResponse> = {
    method: "POST",
    path: "/devices",
    bodyParams: ["token"],
};
