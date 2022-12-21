import axios, { AxiosError } from "axios";
import {
    APIResponseError,
    buildRequestError,
    isHTTPResponseError,
    isClientError,
    RequestTimeoutError,
    UnknownHTTPResponseError,
} from "./error";
import { pick } from "./utils";
export {
    APIResponseError,
    isHTTPResponseError,
    isClientError as isOpizeClientError,
    RequestTimeoutError,
    UnknownHTTPResponseError,
};

export interface ClientOptions {
    auth?: string;
    timeoutMs?: number;
    baseUrl?: string;
    apiVersion?: string;
}

type Method = "get" | "post" | "patch" | "delete";
type QueryParams = Record<string, any> | URLSearchParams;
type WithAuth<T> = T & { auth?: string };

export interface RequestParameters {
    path: string;
    method: Method;
    query?: QueryParams;
    body?: Record<string, unknown>;
    auth?: string;
}

export class Client {
    private auth?: string;
    private prefixUrl: string;
    private timeoutMs: number;

    public constructor(options?: ClientOptions) {
        this.auth = options?.auth;
        this.prefixUrl =
            options?.baseUrl ?? "https://api-calendar2notion.opize.me";
        this.timeoutMs = options?.timeoutMs ?? 60_000;
    }

    public updateAuth(auth?: string) {
        this.auth = auth;
    }

    private authAsHeaders(auth?: string): Record<string, string> {
        const headers: Record<string, string> = {};
        const authHeaderValue = auth ?? this.auth;
        if (authHeaderValue !== undefined) {
            headers["authorization"] = `Bearer ${authHeaderValue}`;
        }
        return headers;
    }

    public async request<ResponseBody>({
        path,
        method,
        query,
        body,
        auth,
    }: RequestParameters): Promise<ResponseBody> {
        const url = `${this.prefixUrl}${path}`;
        const headers: Record<string, string> = this.authAsHeaders(auth);

        try {
            const response = await RequestTimeoutError.rejectAfterTimeout(
                axios(url, {
                    method: method.toUpperCase(),
                    headers,
                    data: body,
                    params: query,
                }),
                this.timeoutMs
            );

            return response.data;
        } catch (error: any) {
            // TODO: AxiosError가 undefined로 잡히는 문제
            if (error?.response) {
                throw buildRequestError(error.response);
            }

            if (!isClientError(error)) throw error;
            if (isHTTPResponseError(error)) throw error;
            throw error;
        }
    }
}
