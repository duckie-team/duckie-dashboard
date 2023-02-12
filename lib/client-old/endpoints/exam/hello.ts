import { Endpoint } from "../../types/endpoint";

// GET /hello
export type GetHelloParameter = {};
export const GetHello: Endpoint<GetHelloParameter, GetHelloResponse> = {
    path: () => `/hello`,
    method: "get",
    bodyParams: [],
    pathParams: [],
    queryParams: [],
};
export type GetHelloResponse = {};
