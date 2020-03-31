import { Schema, model, Model, Document } from 'mongoose';
import { IUserDocument } from '../../../auth/interfaces/user.interface';

export default function MongooseSingleton<T extends {new (...args: any[]): any;}>(originalConstructor: T): T & {getMongooseModel<U extends Document>(): Model<U>} {
    return class extends originalConstructor {
        private static mongooseModel;

        static init() { 
            const schema: Schema = new originalConstructor().schema;
            this.mongooseModel = model<IUserDocument>(originalConstructor.name, schema);
            return this.mongooseModel;
        }

        public static getMongooseModel<U extends Document>(...args: any[]): Model<U> {
            return this.mongooseModel || this.init();
        }

        private constructor(...args: any[]) {
            super(...args);
        }
    };
}