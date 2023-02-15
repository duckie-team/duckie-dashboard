export type UserObject = {
    id: number;
    nickName: string;
    profileImageUrl: string;
    tier: number;
    favoriteTags: {
        name: string;
        id: number;
    }[];
    favoriteCategories: {
        name: string;
        id: number;
    }[];
    permissions: string[];
};
