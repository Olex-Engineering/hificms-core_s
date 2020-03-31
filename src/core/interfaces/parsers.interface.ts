export interface IMongoFilterInput {
    field?: string;
    filter: IMongoFIlterArgs;
}

export interface IMongoSortInput {
    field: string;
    criteria: 'asc' | 'desc';
}

export interface IListOptions {
    options?: IListOptionsInput
}

export interface IListOptionsInput {
    limit?: number;
    skip?: number;
    sort?: IMongoSortInput;
    filter?: IMongoFilterInput[]
}

export interface IListOptionsParsedInput {
    filter?: {[key: string]: object};
    queryOptions?: {
        skip?: number;
        limit?: number;
        sort?: {[key: string]: object};
    };
}

export interface IMongoFIlterArgs {
    eq?: string | number;
    regex?: string; 
    gt?: number;
    gte?: number;
    in?: string[] | number[];
    lt?: number
    lte?: number
    ne?: string | number
    nin?:  string[] | number[];
    and?: IMongoFilterInput[];
    not?: IMongoFIlterArgs;
    nor?: IMongoFilterInput[];
    or?: IMongoFilterInput[];
    expr?: IMongoExpr;
}

export interface IMongoExpr {
    gt?: string[];
    gte?: string[];
    lt?: string[];
    lte?: string[];
    ne?: string[];
}