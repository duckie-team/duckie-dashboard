import { ExamAPIClient } from "./exam.client";

export const examClient = new ExamAPIClient({
    baseUrl: process.env.NEXT_PUBLIC_API_SERVER,
    auth:
        typeof window === "undefined"
            ? ""
            : localStorage.getItem("duckieExamAuthToken") || "",
});
