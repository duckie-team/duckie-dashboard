import { APIResponseError } from "endpoint-client";
import { Button, Flex, H3, TextField, useModal } from "opize-design-system";
import { useState } from "react";
import { toast } from "react-toastify";
import { examClient } from "../../../../../../../lib/client";

export function CreateTagModal({ refetch }: { refetch: () => Promise<any> }) {
    const [name, setName] = useState("");
    const modal = useModal();

    const create = async (name: string) => {
        try {
            if (!name) return;
            const res = await examClient.tags.post({
                name,
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
            <H3>태그 생성</H3>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="이름"
            />
            <Button onClick={() => create(name)} disabled={!name}>
                생성
            </Button>
        </Flex.Column>
    );
}
