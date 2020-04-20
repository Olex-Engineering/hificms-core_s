import { DocumentNode } from 'graphql';
import { DocumentNodeMap, IResolverFuncMap, IResolverFunc } from './core.interface';

export interface IModule {
    init(): void;
    setSchema(schemaToSet: DocumentNodeMap): void;
    setResolvers(resolversToSet: IModuleResolvers): void;
    schema:  DocumentNode[];
    resolvers:  IModuleResolvers;
}

export interface IModuleOptions {
    mergeFrom?: IModule;
    shemas: DocumentNodeMap;
    resolvers: IModuleResolvers;
}

export interface IModuleResolvers {
    Query: IResolverModule[] | IResolverFuncMap;
    Mutation: IResolverModule[] | IResolverFuncMap;
    Subscription: IResolverModule[] | IResolverFuncMap;
    [key: string]: IResolverModule[] | IResolverFuncMap;
}

export interface IModuleExport {
    schema: DocumentNode[];
    resolvers: IModuleResolvers;
}

export interface IResolverModule {
    resolvers: IResolverFuncMap;
    setResolver(key: string, resolver: IResolverFunc<any, any>): void;
    mergeResolvers(IResolverFuncMap): void;
}