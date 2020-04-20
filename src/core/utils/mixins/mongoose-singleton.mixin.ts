import { Schema, model, Model, Document } from 'mongoose';

export default function MongooseSingleton<T extends {new (...args: any[]): any;}>(originalConstructor: T): T & {getMongooseModel<U extends Document>(settings?:  { prepopulate?: boolean }): Model<U>} {
    return class extends originalConstructor {
        private static mongooseModel;
        
        /**
         * Create new mongoose model from schema
         */
        private static init() { 
            const schema: Schema = new originalConstructor().schema;
            this.mongooseModel = model<Document>(originalConstructor.name, schema);
            return this.mongooseModel;
        }

        /**
         * Create or return (if exist) mongoose model
         * @param settings - settings of generating mongoose model
         */
        public static getMongooseModel<U extends Document>(settings?: { prepopulate?: boolean }): Model<U> {
            const model = this.mongooseModel || this.init();
            if (settings?.prepopulate) {
                model.save();
            }
            return model;
        }

        // Constructor can not be called
        private constructor(...args: any[]) {
            super(...args);
        }
    };
}