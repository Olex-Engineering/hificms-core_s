import * as merge from 'deepmerge';
import { IResolvers } from 'graphql-tools';
import rootResolvers from './resolvers/root-resolvers';
import { IResolverFuncMap } from './interfaces/core.interface';

export default class ResolversStorage {
    // CORE resolvers storage
    private static resolvers: IResolverFuncMap[] = [
        rootResolvers
    ]

    /**
     * Add resolver to final resolvers storage
     * @param resolver - resolver to add
     */
    public static addResolver(resolver: IResolverFuncMap): void {
        this.resolvers.push(resolver as IResolvers);
    }

    /**
     * Merge and return all resolvers
     */
    public static getResolvers(): IResolvers {
        return merge.all(this.resolvers) as IResolvers;
    }
}