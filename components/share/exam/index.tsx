import { ExamObject } from "../../../lib/client/endpoints/exam/object";
import { ExamItemMedium, PlaceholderExamItemMedium } from "./medium";
import { ExamItemSmall, PlaceholderExamItemSmall } from "./small";

export function ExamItem({
    exam,
    size = "medium",
    width = "100%",
}: {
    exam: ExamObject;
    size?: "small" | "medium";
    width?: string;
}) {
    if (size === "medium") return <ExamItemMedium exam={exam} width={width} />;
    else return <ExamItemSmall exam={exam} width={width} />;
}

export function PlaceHolderExamItem({
    size = "medium",
    width = "100%",
}: {
    size?: "small" | "medium";
    width?: string;
}) {
    if (size === "medium") return <PlaceholderExamItemMedium width={width} />;
    else return <PlaceholderExamItemSmall width={width} />;
}
