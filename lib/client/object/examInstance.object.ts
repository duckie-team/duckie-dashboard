import { ExamObject } from "./exam.object";
import { ProblemInstanceObject } from "./problemInstance.object";

export type ExamInstanceObject = {
    id: number;
    exam: ExamObject;
    problemInstances?: ProblemInstanceObject;
    status: "READY" | "SUBMITTED";
};
