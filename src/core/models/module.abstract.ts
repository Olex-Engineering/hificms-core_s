import * as merge from 'deepmerge';
import { DocumentNodeMap } from '../interfaces/core.interface';
import { DocumentNode } from 'graphql';
import { IModule, IModuleResolvers } from '../interfaces/module.interface';
import TypeDefsStorage from '../type-defs';
import ResolversStorage from '../resolvers';

export default abstract class Module implements IModule {
    protected schemaObject: DocumentNodeMap = null;
    protected resolversObject: IModuleResolvers = null;

    /**
     * Set MODULE resolvers and type definitions to core storages
     */
    public init(): void {
        TypeDefsStorage.addTypeDefs(this.schema);
        ResolversStorage.addResolver(this.resolvers);
    }

    /**
     * Merge custom module type definitions with current
     * @param schemaToMerge - custom module type definitions
     */
    public mergeSchemas(schemaToMerge: DocumentNodeMap): DocumentNodeMap {
        return merge(this.schemaObject, schemaToMerge);
    }

    /**
     * Merge custom module resolvers and merge it with current
     * @param resolversToMerge - custom module resolvers 
     */
    public mergeResolvers(resolversToMerge: IModuleResolvers): IModuleResolvers {
        return merge(this.resolversObject, resolversToMerge);
    }

    /**
     * Set type definitions as MODULE final shema object
     * @param schemaToSet - type definitions to set
     */
    public setSchema(schemaToSet: DocumentNodeMap): void {
        this.schemaObject = schemaToSet;
    }

    /**
     * Set resolvers as MODULE final resolvers object
     * @param resolversToSet - module resolvers object that needs to be set
     */
    public setResolvers(resolversToSet: IModuleResolvers): void {
        this.resolversObject = resolversToSet;
    }

    /**
     * Get MODULE final type definitions array
     */
    public get schema(): DocumentNode[] {
        return Object.values(this.schemaObject);
    }
    
    /**
     * Get MODULE final resolvers object
     */
    public get resolvers(): IModuleResolvers {
        return this.resolversObject;
    }
}