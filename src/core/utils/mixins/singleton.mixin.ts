export default function Singleton<T extends {new (...args: any[]): any}>(originalConstructor: T): T & {init(): T} {
    return class extends originalConstructor {
        private static object: T;

        public static init(...args: any[]): T {
            if (!this.object) {
                this.object = new originalConstructor(...args);
            }
            
            return this.object;
        }

        private constructor(...args: any[]) {
            super(...args);
        }
    };
}