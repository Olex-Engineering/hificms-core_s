// Set modules and call theirs init method when target class initializing
export default function ConnectModules(modules) {
    return function<T extends { new (...args: any[]): any }>(originalConstructor: T): T  {
        return class extends originalConstructor {
            public constructor(...args: any[]) {
                super(...args);
                modules.forEach(module => new module().init());
            }
        };
    };
}