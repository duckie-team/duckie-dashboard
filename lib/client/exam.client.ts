import axios, { AxiosError } from "axios";
import { ExamAPI } from "./endpoints";
import {
    APIResponseError,
    buildRequestError,
    isHTTPResponseError,
    isClientError,
    RequestTimeoutError,
    UnknownHTTPResponseError,
} from "./error";
import { Endpoint } from "./types/endpoint";
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
    contentType?: string;
}

export class ExamAPIClient {
    private _auth?: string;
    private prefixUrl: string;
    private timeoutMs: number;

    public constructor(options?: ClientOptions) {
        this._auth = options?.auth;
        this.prefixUrl =
            options?.baseUrl ?? "https://api-calendar2notion.opize.me";
        this.timeoutMs = options?.timeoutMs ?? 60_000;
    }

    public updateAuth(auth?: string) {
        this._auth = auth;
    }

    private authAsHeaders(auth?: string): Record<string, string> {
        const headers: Record<string, string> = {};
        const authHeaderValue = auth ?? this._auth;
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
        contentType = "application/json",
    }: RequestParameters): Promise<ResponseBody> {
        const url = `${this.prefixUrl}${path}`;
        const headers: Record<string, string> = {
            ...this.authAsHeaders(auth),
            "x-duckie-device-name": navigator.userAgent,
            "x-duckie-version": "web",
            "x-duckie-client": "web",
            "Content-Type": contentType,
        };

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

    private requestBuilder<
        Parameter extends Record<string, any>,
        Response extends Record<string, any>
    >(endpoint: Endpoint<Parameter, Response>) {
        return (args: WithAuth<Parameter>): Promise<Response> => {
            return this.request<Response>({
                path: endpoint.path(args),
                method: endpoint.method,
                query: pick(args, endpoint.queryParams as any),
                body: pick(args, endpoint.bodyParams as any),
                auth: args?.auth,
                contentType: endpoint.contentType,
            });
        };
    }

    public readonly user = {
        get: this.requestBuilder(ExamAPI.Users.GetUser),
        patch: this.requestBuilder(ExamAPI.Users.PatchUser),
    };

    public readonly terms = {
        post: this.requestBuilder(ExamAPI.Terms.PostTerms),
        get: this.requestBuilder(ExamAPI.Terms.GetTerms),
    };

    public readonly tags = {
        post: this.requestBuilder(ExamAPI.Tags.PostTag),
    };

    public readonly hello = {
        get: this.requestBuilder(ExamAPI.Hello.GetHello),
    };

    public readonly exams = {
        post: this.requestBuilder(ExamAPI.Exams.PostExam),
        get: this.requestBuilder(ExamAPI.Exams.getExam),
        list: this.requestBuilder(ExamAPI.Exams.getExams),
        thumbnail: {
            post: this.requestBuilder(ExamAPI.Exams.PostExamThumbnail),
        },
    };

    public readonly examInstance = {
        post: this.requestBuilder(ExamAPI.ExamInstance.PostExamInstance),
        submit: this.requestBuilder(
            ExamAPI.ExamInstance.PostExamInstanceSubmit
        ),
    };

    public readonly devices = {
        post: this.requestBuilder(ExamAPI.Devices.PostExamDevice),
    };

    public readonly categories = {
        list: this.requestBuilder(ExamAPI.Categories.GetExamCategories),
    };

    public readonly auth = {
        kakaoLogin: this.requestBuilder(ExamAPI.Auth.PostAuthKakao),
        getToken: this.requestBuilder(ExamAPI.Auth.GetAuthToken),
    };

    public readonly file = {
        post: this.requestBuilder(ExamAPI.Files.PostFile),
    };

    public readonly recommendations = {
        get: this.requestBuilder(ExamAPI.Recommendations.GetRecommendations),
        post: this.requestBuilder(ExamAPI.Recommendations.PostRecommendations),
        patch: this.requestBuilder(
            ExamAPI.Recommendations.PatchRecommendations
        ),
        delete: this.requestBuilder(
            ExamAPI.Recommendations.DeleteRecommendations
        ),
    };

    public readonly search = {
        exams: this.requestBuilder(ExamAPI.Search.SearchExams),
        users: this.requestBuilder(ExamAPI.Search.SearchUsers),
        tags: this.requestBuilder(ExamAPI.Search.SearchTags),
    };
}
