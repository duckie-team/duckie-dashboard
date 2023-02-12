import { Endpoint } from "endpoint-client";

// GET /
export type GetHeartBeatParameter = {};
export type GetHeartBeatResponse = {};
export const GetHeartBeat: Endpoint<
    GetHeartBeatParameter,
    GetHeartBeatResponse
> = {
    method: "GET",
    path: "/",
};
