import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { examClient } from "../lib/client/client";
import { APIResponseError } from "../lib/client/error";

let userId: number;
if (typeof window !== undefined) {
    try {
        const base64Payload =
            localStorage.getItem("duckieExamToken")?.split(".")[1] || "";
        const payload = Buffer.from(base64Payload, "base64");
        const result = JSON.parse(payload.toString());
        userId = result.userId;
    } catch (err) {
        console.error(err);
    }
}

export function useUser({ roles }: { roles?: string[] } = {}) {
    const { data: user, error } = useQuery(
        ["user", "self"],
        () =>
            examClient.user.get({
                id: userId,
            }),
        {}
    );
    const router = useRouter();

    if (roles && user) {
        if (roles.every((role) => user.permission.every((p) => p !== role))) {
            toast.warn("페이지에 접근할 수 있는 권한이 없어요.");
            router.push("/");
        }
    }

    if (error && error instanceof APIResponseError) {
        return {
            user: null,
            isError: true,
            error: error,
        };
    }

    return {
        user,
        isError: false,
        error: undefined,
    };
}
