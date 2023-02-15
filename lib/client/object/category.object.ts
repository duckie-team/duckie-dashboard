import { TagObject } from "./tag.object";

export type CategoryObject = {
    id: number;
    name: string;
    thumbnailUrl?: string;
    popularTags?: TagObject[];
};
