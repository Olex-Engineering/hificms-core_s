import { DocumentNode } from 'graphql';
import { IResolvers } from 'apollo-server';
import { DocumentQuery, Document } from 'mongoose';

export interface DocumentNodeMap {
    [key: string]: DocumentNode;
}

export interface IResolversMap {
    Query?: IResolvers;
    Mutation?: IResolvers;
    Subscription?: IResolvers;
    [key: string]: IResolvers;
}

export interface IResolverFuncMap {
    [key: string]: IResolverFunc<any, Document>;
}

export type IResolverFunc<T, U extends Document> = DocumentQuery<U[], U, {}> | DocumentQuery<U, U, {}> | Promise<T> | T;