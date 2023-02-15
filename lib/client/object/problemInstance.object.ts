import { ProblemObject } from "./problem.object";

export type ProblemInstanceObject = {
    id: number;
    problem: ProblemObject;
    status?: "READY" | "WRONG" | "CORRECT";
    submittedAnswer?: string;
};
