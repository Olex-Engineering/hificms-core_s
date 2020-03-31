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
    shemas: DocumentNodeMap,
    resolvers: IModuleResolvers;
}

export interface IModuleResolvers {
    Query: IResolverModule[];
    Mutation: IResolverModule[];
    Subscription: IResolverModule[];
    [key: string]: IResolverModule[];
}

export interface IModuleExport {
    schema: DocumentNode[];
    resolvers: IModuleResolvers;
}

export interface IResolverModule {
    resolvers: IResolverFuncMap;
    resolver:  {[key: string]: IResolverFunc<any, any>};
}