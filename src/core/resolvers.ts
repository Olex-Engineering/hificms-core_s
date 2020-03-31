import * as merge from 'deepmerge';
import { IResolvers } from 'graphql-tools';
import rootResolvers from './resolvers/root-resolvers';
import { IModuleResolvers } from './interfaces/module.interface';

export default class ResolversStorage {
    private static resolvers: IResolvers[] = [
        rootResolvers
    ]

    public static addResolver(resolver: IModuleResolvers): void {
        this.resolvers.push(resolver as IResolvers);
    }

    public static getResolvers(): IResolvers {
        return merge.all(this.resolvers) as IResolvers;
    }
}