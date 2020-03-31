import { IResolverModule } from '../interfaces/module.interface';
import { IResolverFuncMap } from '../interfaces/core.interface';

export default abstract class ResolverModule implements IResolverModule {
    protected resolversObject: IResolverFuncMap;

    public get resolvers(): IResolverFuncMap {
        return this.resolversObject;
    }

    public set resolver(resolver) {
        this.resolversObject = { ...this.resolversObject, ...resolver };
    }
}