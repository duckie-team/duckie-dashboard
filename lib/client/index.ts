import { ExamClient } from "./client";

export const examClient = new ExamClient({
    baseUrl: process.env.NEXT_PUBLIC_API_SERVER || "",
    auth:
        typeof window === "undefined"
            ? ""
            : localStorage.getItem("duckieExamToken") || "",
    defaultHeaders: {
        "x-duckie-device-name": "web",
        "x-duckie-version": "1.0.0",
        "x-duckie-client": "web",
    },
});
