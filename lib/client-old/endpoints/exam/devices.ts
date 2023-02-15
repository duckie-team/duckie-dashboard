import { Endpoint } from "../../types/endpoint";

// POST /devices
export type PostDeviceParameter = {
    token: string;
};
export const PostExamDevice: Endpoint<PostDeviceParameter, PostDeviceResponse> =
    {
        path: () => `/devices`,
        method: "get",
        bodyParams: ["token"],
        pathParams: [],
        queryParams: [],
    };
export type PostDeviceResponse = {};
