import { IResolverModule } from '../interfaces/module.interface';
import { IResolverFuncMap, IResolverFunc } from '../interfaces/core.interface';

export default abstract class ResolverModule implements IResolverModule {
    protected resolversObject: IResolverFuncMap;

    /**
     * Get resolvers object
     */
    public get resolvers(): IResolverFuncMap {
        return this.resolversObject;
    }

    /**
     * Set resolver to main resolvers object
     * Commonly used by Resolver decorator
     * @param resolverKey - key of resolver
     * @param resolver - function of resolver
     */
    public setResolver(resolverKey: string, resolver:  IResolverFunc<any, any>) {
        if (!this.resolversObject) {
            this.resolversObject = {};
        }

        this.resolversObject[resolverKey] = resolver;
    }

    /**
     * Merge core resolvers to custom
     * Commonly used by custom modules
     * @param resolvers - Resolvers map to set 
     */
    public mergeResolvers(resolvers: IResolverFuncMap) {
        this.resolversObject = { ...this.resolversObject, ...resolvers };
    }
}