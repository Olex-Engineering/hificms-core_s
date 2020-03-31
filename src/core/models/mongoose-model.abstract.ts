import { Model, Document, SchemaDefinition, Schema } from 'mongoose';
import * as merge from 'deepmerge';

export default abstract class MongooseModel {
    protected static mongooseModel: Model<Document>;

    protected schemaObject: SchemaDefinition;

    public get schema(): Schema {
        return new Schema(this.schemaObject);
    }

    protected mergeSchemas(schemaObjectToMerge: SchemaDefinition): void {
        this.schemaObject = merge(this.schemaObject, schemaObjectToMerge);
    }
}