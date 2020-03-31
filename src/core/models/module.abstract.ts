import * as merge from 'deepmerge';
import { DocumentNodeMap, IResolversMap } from '../interfaces/core.interface';
import { DocumentNode } from 'graphql';
import { IModule, IModuleResolvers } from '../interfaces/module.interface';
import TypeDefsStorage from '../type-defs';
import ResolversStorage from '../resolvers';

export default abstract class Module implements IModule {
    protected schemaObject: DocumentNodeMap = null;
    protected resolversObject: IModuleResolvers = null;

    public mergeSchemas(schemaToMerge: DocumentNodeMap) {
        this.schemaObject = merge(this.schemaObject, schemaToMerge);
    }

    public mergeResolvers(resolversToMerge: IResolversMap) {
        this.resolversObject = merge(this.resolversObject, resolversToMerge);
    }

    public init(): void {
        TypeDefsStorage.addTypeDefs(this.schema);
        ResolversStorage.addResolver(this.resolvers);
    }

    public setSchema(schemaToSet: DocumentNodeMap) {
        this.schemaObject = schemaToSet;
    }

    public setResolvers(resolversToSet: IModuleResolvers) {
        this.resolversObject = resolversToSet;
    }

    public get schema(): DocumentNode[] {
        return Object.values(this.schemaObject);
    }
    
    public get resolvers(): IModuleResolvers {
        return this.resolversObject;
    }
}