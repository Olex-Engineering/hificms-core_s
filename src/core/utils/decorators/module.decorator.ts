import { IModuleOptions, IResolverModule, IModuleResolvers } from '../../interfaces/module.interface';

const mapResolversSubmoduleArrayToObject = (resolvers: IModuleResolvers) => {
    for (const [key, value] of Object.entries(resolvers)) {
        const newSubmoduleValue = value.reduce((prev, submodule) => {
            return {...prev, ...submodule.resolvers};
        }, {});
        resolvers[key] = newSubmoduleValue as IResolverModule[];
    }
    return resolvers;
};


export default function gqModule(options: IModuleOptions) {
    return function<T extends { new (...args: any[]): any }>(originalConstructor: T): T {
        return class extends originalConstructor {
            public constructor(...args: any[]) {
                super(...args);
                this.schemaObject = options.shemas;
                this.resolversObject = mapResolversSubmoduleArrayToObject(options.resolvers);
            }
        };
    };
}