export default function Singleton<T extends {new (...args: any[]): any}>(originalConstructor: T): T & {init(): T} {
    return class extends originalConstructor {
        private static object: T;

        /**
         * Create or return (if exist) class
         * @param args - constructor arguments
         */
        public static init(...args: any[]): T {
            if (!this.object) {
                this.object = new originalConstructor(...args);
            }
            
            return this.object;
        }

        // Constructor can not be called
        private constructor(...args: any[]) {
            super(...args);
        }
    };
}