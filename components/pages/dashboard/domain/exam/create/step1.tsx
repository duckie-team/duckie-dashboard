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
    useModal,
} from "opize-design-system";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { CreateExamContext } from "../../../../../../context/pages/dashboard/domain/exam/exam.context";
import { ExamAPI, examClient } from "../../../../../../lib/client";
import { CreateCategoryModal } from "./step1/createCategory";
import { MainTagSearch } from "./step1/mainTagSearch";

type Step1Form = Pick<
    ExamAPI.Object.CreateExamObject,
    "categoryId" | "mainTagId" | "title" | "description" | "certifyingStatement"
>;

export function CreateStep1() {
    const { setData, data, setStep } = useContext(CreateExamContext);
    const modal = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<Step1Form>({
        defaultValues: {
            title: data.title,
            categoryId: data.categoryId,
            certifyingStatement: data.certifyingStatement,
            description: data.description,
            mainTagId: data.mainTagId,
        },
    });

    const { data: categories, refetch: refetchCategories } = useQuery(
        ["categories"],
        () => examClient.categories.list({ withPopularTags: true })
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

    const createCategory = () => {
        modal.open(<CreateCategoryModal refetch={refetchCategories} />);
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Flex.Column gap="32px">
                <Flex.Column gap="8px">
                    <Text weight="semibold">카테고리</Text>
                    {watch("categoryId")}

                    <Flex.Between>
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

                        <Button onClick={createCategory}>카테고리 추가</Button>
                    </Flex.Between>
                </Flex.Column>

                <MainTagSearch
                    setValue={(value: number) => setValue("mainTagId", value)}
                    value={watch("mainTagId")}
                />

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
                        placeholder="시험 설명을 입력해주세요."
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
