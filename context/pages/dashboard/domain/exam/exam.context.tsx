import { createContext, useMemo, useState } from "react";
import { ExamAPI } from "../../../../../lib/client/endpoints";

type Step = 1 | 2 | 3;

export interface CreateExamContextProps {
    data: Partial<ExamAPI.Object.CreateExamObject>;
    setData: (data: Partial<ExamAPI.Object.CreateExamObject>) => void;
    step: 1 | 2 | 3;
    setStep: (step: Step) => void;
}

export const CreateExamContext = createContext<CreateExamContextProps>({
    data: {},
    setData: () => null,
    step: 1,
    setStep: () => null,
});

export function CreateExamContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [step, setStep] = useState<Step>(1);
    const [data, setData] = useState<Partial<ExamAPI.Object.CreateExamObject>>(
        {}
    );

    const value = useMemo(
        () => ({
            data,
            setData,
            step,
            setStep,
        }),
        [data, step]
    );

    return (
        <CreateExamContext.Provider value={value}>
            {children}
        </CreateExamContext.Provider>
    );
}
