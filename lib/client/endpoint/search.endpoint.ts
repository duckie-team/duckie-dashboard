import { Endpoint } from "endpoint-client";
import { ExamObject } from "../object/exam.object";
import { UserObject } from "../object/user.object";

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
        method: "GET",
        path: "/search",
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
        method: "GET",
        path: () => "/search",
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
    method: "GET",
    path: () => "/search",
    queryParams: ["page", "query", "type"],
};
