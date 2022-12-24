import { CreateProblemObject } from "./problem";

export type CreateExamObject = {
    title: string;
    description: string;
    mainTagId: number;
    subTagIds?: number[];
    categoryId: number;
    certifyingStatement: string;
    problems: CreateProblemObject[];
    isPublic: boolean;
    buttonText: string;
    answerRate: number;
    thumbnailUrl?: string;
    solvedCount: number;
    thumbnailImageUrl?: string;
} & (
    | { thumbnailImageUrl: string; thumbnailType: "default" }
    | {
          thumbnailType: "image";
      }
);

export type ExamObject = {
    title: string;
    description: string;
    certifyingStatement: string;
    problems: CreateProblemObject[];
    buttonText: string;
    answerRate: number;
    solvedCount: number;
    thumbnailImageUrl?: string;
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
};
