type value = any;

export type Endpoint<
    Parameter extends Record<string, value>,
    Response extends Record<string, value>
> = {
    method: "get" | "post" | "patch" | "delete";
    path: (e: Parameter) => string;
    pathParams: (keyof Parameter)[];
    queryParams: (keyof Parameter)[];
    bodyParams: (keyof Parameter)[];
};
