import {
    Button,
    Flex,
    ItemsTable,
    Table,
    Text,
    TextField,
    useModal,
} from "opize-design-system";
import { useCallback, useEffect, useState } from "react";
import { ExamAPI, examClient } from "../../../../../../../lib/client";
import { CreateTagModal } from "./createTag";

export function MainTagSearch({
    setValue,
    value,
}: {
    value: number;
    setValue: (value: number) => void;
}) {
    const modal = useModal();
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState<ExamAPI.Object.TagObject[]>([]);
    const [page, setPage] = useState(1);

    const search = useCallback(
        async (searchText: string) => {
            try {
                const res = await examClient.search.tags({
                    page: page,
                    query: searchText,
                    type: "TAGS",
                });
                setResults(res.result);
            } catch (err) {}
        },
        [page]
    );

    useEffect(() => {
        const debounce = setTimeout(async () => {
            await search(searchText);
        }, 300);
        return () => clearTimeout(debounce);
    }, [search, searchText]);

    const select = async (id: number) => {
        setValue(id);
    };

    const createTag = () => {
        modal.open(
            <CreateTagModal refetch={async () => await search(searchText)} />
        );
    };

    return (
        <Flex.Column gap="8px">
            <Flex.Between>
                <Text weight="semibold">시험 영역</Text>
                <Button onClick={createTag}>태그 생성</Button>
            </Flex.Between>
            <Flex.Column gap="8px">
                <Flex.Row gap="8px">
                    <TextField
                        placeholder="시험 영역으로 설정할 태그를 검색해주세요."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Flex.Row>
                <ItemsTable>
                    {results.length !== 0 ? (
                        results.map((e) => (
                            <ItemsTable.Row key={e.id}>
                                <ItemsTable.Row.Text
                                    text={`${e.id}. ${e.name}`}
                                />
                                <Button
                                    onClick={() => select(e.id)}
                                    disabled={e.id === value}
                                >
                                    {e.id === value ? "선택됨" : "선택"}
                                </Button>
                            </ItemsTable.Row>
                        ))
                    ) : (
                        <ItemsTable.Row>검색 결과가 없어요</ItemsTable.Row>
                    )}
                </ItemsTable>
            </Flex.Column>
        </Flex.Column>
    );
}
