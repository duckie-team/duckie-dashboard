import { CreateProblemObject } from "./problem";
import { UserObject } from "./user";

export type CreateExamObject = {
    title: string;
    description: string;
    mainTagId: number;
    subTagIds?: number[];
    categoryId: number;
    certifyingStatement: string;
    problems: CreateProblemObject[];
    isPublic: boolean;
    buttonTitle: string;
    answerRate: number;
    solvedCount: number;
    thumbnailUrl: string;
};

export type ExamObject = {
    id: number;
    title: string;
    description: string;
    certifyingStatement: string;
    problems: CreateProblemObject[];
    buttonTitle: string;
    answerRate: number;
    solvedCount: number;
    thumbnailUrl?: string;
    status: "READY" | "PENDING" | "REJECTED";
    category: {
        name: string;
        id: number;
    };
    mainTag: {
        id: number;
        name: string;
    };
    subTags: {
        id: number;
        name: string;
    }[];
    canRetry?: boolean;
    user?: UserObject;
};
