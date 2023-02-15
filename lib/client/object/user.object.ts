import { CategoryObject } from "./category.object";
import { DuckPowerObject } from "./duckPower.object";
import { FollowObject } from "./follow.object";
import { TagObject } from "./tag.object";

export type UserObject = {
    id: number;
    nickName: string;
    profileImageUrl: string;
    status: "NEW" | "READY" | "BANNED" | "SIGN_OUT";
    duckPower?: DuckPowerObject;
    follow?: FollowObject;
    favoriteTags?: TagObject;
    favoriteCategories?: CategoryObject;
    // permissions:
};
