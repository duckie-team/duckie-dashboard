import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { examClient } from "../lib/client/client";
import { APIResponseError } from "../lib/client/error";

export function useUser({
    allowNonLogin = false,
}: { allowNonLogin?: boolean } = {}) {
    const { data: user, error } = useQuery(
        ["user", "self"],
        () =>
            examClient.user.get({
                id: 0,
            }),
        {}
    );
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("opizeToken");
        if (!token && !allowNonLogin) {
            toast.warn("로그인이 필요해요");
            router.push("/auth/login");
            return;
        }
    }, [allowNonLogin, router]);

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
