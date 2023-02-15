import { Endpoint } from "../../types/endpoint";
import { ExamObject, UserObject } from "./object";

// GET /search
export type SearchExamsParameter = {
    query: string;
    page: number;
    type: "EXAM";
};
export type SearchExamsResponse = {
    page: number;
    result: ExamObject[];
};
export const SearchExams: Endpoint<SearchExamsParameter, SearchExamsResponse> =
    {
        method: "get",
        path: () => "/search",
        bodyParams: [],
        pathParams: [],
        queryParams: ["page", "query", "type"],
    };

// GET /search
export type SearchUsersParameter = {
    query: string;
    page: number;
    type: "USER";
};
export type SearchUsersResponse = {
    page: number;
    result: UserObject[];
};
export const SearchUsers: Endpoint<SearchUsersParameter, SearchUsersResponse> =
    {
        method: "get",
        path: () => "/search",
        bodyParams: [],
        pathParams: [],
        queryParams: ["page", "query", "type"],
    };

// GET /search
export type SearchTagsParameter = {
    query: string;
    page: number;
    type: "TAGS";
};
export type SearchTagsResponse = {
    page: number;
    result: {
        name: string;
        id: number;
    }[];
};
export const SearchTags: Endpoint<SearchTagsParameter, SearchTagsResponse> = {
    method: "get",
    path: () => "/search",
    bodyParams: [],
    pathParams: [],
    queryParams: ["page", "query", "type"],
};
