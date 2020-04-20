import { IModuleOptions, IModuleResolvers } from '../../interfaces/module.interface';
import { IResolverFuncMap } from '../../interfaces/core.interface';

/**
 * Merge different resolvers modules into one Resolvers object
 * @param resolvers - target Queries, Mutations, Subscriptions and custom resolvers
 */
const mapResolversArrayToObject = (resolvers: IModuleResolvers) => {
    // Get module resolvers from Query, Mutations, Subscriptions and custom objects
    for (const [resolverKey, resolversModulesArray] of Object.entries(resolvers)) {
        const resolversObject = resolversModulesArray.reduce((prev, resolversModule) => {
            return {...prev, ...resolversModule.resolvers};
        }, {});
        resolvers[resolverKey] = resolversObject as IResolverFuncMap;
    }
    return resolvers;
};


/**
 * Map schema to object
 * Map resolvers to object
 * @param options - Resolvers and Schemas that will be used by module
 */
export default function gqModule(options: IModuleOptions) {
    return function<T extends { new (...args: any[]): any }>(originalConstructor: T): T {
        return class extends originalConstructor {
            public constructor(...args: any[]) {
                super(...args);
                this.schemaObject = options.shemas;
                this.resolversObject = mapResolversArrayToObject(options.resolvers);
            }
        };
    };
}