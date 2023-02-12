import { ChoiceObject } from "./choice.object";

export type AnswerObject = {
    type: "shortAnswer" | "choice" | "imageChoice";
    choices?: ChoiceObject[];
};
