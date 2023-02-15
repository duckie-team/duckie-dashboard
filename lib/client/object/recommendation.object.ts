import { ExamObject } from "./exam.object";
import { TagObject } from "./tag.object";

export type RecommendationObject = {
    id: number;
    title: string;
    tag?: TagObject;
    exams: ExamObject[];
};
