import { IResolverModule } from '../../interfaces/module.interface';

/**
 * Set target method as resolver to module resolvers object
 * @param resolverName - custom resolver name
 */
export default function Resolver(resolverName?: string) {
    return function (target: IResolverModule, propertyKey: string, descriptor: PropertyDescriptor) {
        const resolverKey = resolverName || propertyKey;
        target.setResolver(resolverKey, descriptor.value);
    };
}