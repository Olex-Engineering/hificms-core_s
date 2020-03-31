import * as merge from 'deepmerge';
import { DocumentNodeMap, IResolversMap } from '../interfaces/core.interface';
import { DocumentNode } from 'graphql';
import { IModule, IModuleResolvers, IModuleExport } from '../interfaces/module.interface';

export default abstract class Module implements IModule {
    protected schemaObject: DocumentNodeMap = null;
    protected resolversObject: IModuleResolvers = null;

    public mergeSchemas(schemaToMerge: DocumentNodeMap) {
        this.schemaObject = merge(this.schemaObject, schemaToMerge);
    }

    public mergeResolvers(resolversToMerge: IResolversMap) {
        this.resolversObject = merge(this.resolversObject, resolversToMerge);
    }

    public init(): IModuleExport {
        return {
            schema: this.schema,
            resolvers: this.resolvers,
        };
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