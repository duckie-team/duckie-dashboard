import {
    Box,
    Button,
    cv,
    Flex,
    H3,
    ItemsTable,
    Select,
    Text,
    TextArea,
    TextField,
} from "opize-design-system";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { CreateExamContext } from "../../../../../../context/pages/dashboard/domain/exam/exam.context";
import { examClient } from "../../../../../../lib/client-old/client";
import { ExamAPI } from "../../../../../../lib/client-old/endpoints";

type Step1Form = Pick<
    ExamAPI.Object.CreateExamObject,
    "categoryId" | "mainTagId" | "title" | "description" | "certifyingStatement"
>;

export function CreateStep1() {
    const { setData, data, setStep } = useContext(CreateExamContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Step1Form>({
        defaultValues: {
            title: data.title,
            categoryId: data.categoryId,
            certifyingStatement: data.certifyingStatement,
            description: data.description,
            mainTagId: data.mainTagId,
        },
    });

    const { data: categories } = useQuery(["categories"], () =>
        examClient.categories.list({ withPopularTags: true })
    );

    const submit = async (form: Step1Form) => {
        setData({
            ...data,
            title: form.title,
            categoryId: +form.categoryId,
            mainTagId: +form.mainTagId,
            description: form.description,
            certifyingStatement: form.certifyingStatement,
        });
        setStep(2);
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Flex.Column gap="32px">
                <Flex.Column gap="8px">
                    <Text weight="semibold">카테고리</Text>
                    {watch("categoryId")}
                    <Select {...register("categoryId")}>
                        {categories?.categories.map((category) => (
                            <Select.Option
                                value={`${category.id}`}
                                key={category.id}
                            >
                                {category.name} ({category.id})
                            </Select.Option>
                        ))}
                    </Select>
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">시험 영역</Text>
                    <Flex.Column>
                        <Text color={cv.red1}>
                            현재 검색 API가 개발중인 관계로, 직접 태그 아이디를
                            입력해야 합니다.
                        </Text>
                        <TextField
                            placeholder="메인 태그 아이디를 입력해주세요."
                            {...register("mainTagId", {
                                required: "필수 항목입니다.",
                            })}
                            error={errors.mainTagId?.message}
                        />
                        {/* <Flex.Row gap="8px">
                            <TextField placeholder="시험 영역으로 설정할 태그를 검색해주세요." />
                        </Flex.Row>
                        <ItemsTable>
                            <ItemsTable.Row>
                                검색 결과가 이곳에 표시됩니다.
                            </ItemsTable.Row>
                        </ItemsTable> */}
                    </Flex.Column>
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">시험 제목</Text>
                    <TextField
                        placeholder="시험 제목을 입력해주세요."
                        maxLength={12}
                        {...register("title", {
                            required: "필수 항목입니다.",
                        })}
                        error={errors.title?.message}
                    />
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">필적 확인 문구</Text>
                    <TextField
                        placeholder="필적 확인 문구를 입력해주세요."
                        maxLength={12}
                        {...register("certifyingStatement", {
                            required: "필수 항목입니다.",
                        })}
                        error={errors.certifyingStatement?.message}
                    />
                </Flex.Column>

                <Flex.Column gap="8px">
                    <Text weight="semibold">설명</Text>
                    <TextArea
                        placeholder="시험 제목을 입력해주세요."
                        {...register("description", {
                            required: "필수 항목입니다.",
                        })}
                        error={errors.description?.message}
                    />
                </Flex.Column>

                <Flex.Between>
                    <Text></Text>
                    <Text>1/3</Text>
                    <Button variant="contained" type="submit">
                        다음
                    </Button>
                </Flex.Between>
            </Flex.Column>
        </form>
    );
}
