import { IResolverModule } from '../../interfaces/module.interface';

export default function Resolver(resolverName?: string) {
    return function (target: IResolverModule, propertyKey: string, descriptor: PropertyDescriptor) {
        const resolverKey = resolverName || propertyKey;
        target.resolver = {[resolverKey]: descriptor.value};
    };
}