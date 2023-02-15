import { APIResponseError } from "endpoint-client";
import { Button, Flex, H3, TextField, useModal } from "opize-design-system";
import { useState } from "react";
import { toast } from "react-toastify";
import { examClient } from "../../../../../../../lib/client";

export function CreateCategoryModal({
    refetch,
}: {
    refetch: () => Promise<any>;
}) {
    const [name, setName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const modal = useModal();

    const create = async (name: string, thumbnailUrl: string) => {
        try {
            if (!name || !thumbnailUrl) return;
            const res = await examClient.categories.post({
                name,
                thumbnailUrl,
            });
            await refetch();
            modal.close();
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error(`문제가 발생했어요. ${err.status}`);
                console.error(err);
            } else {
                toast.error("서버에 연결할 수 없어요.");
                console.error(err);
            }
        }
    };

    return (
        <Flex.Column gap="8px">
            <H3>카테고리 생성</H3>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="이름"
            />
            <TextField
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                label="썸네일"
            />
            <Button
                onClick={() => create(name, thumbnailUrl)}
                disabled={!name || !thumbnailUrl}
            >
                생성
            </Button>
        </Flex.Column>
    );
}
