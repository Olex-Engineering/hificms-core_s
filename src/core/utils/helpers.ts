import { DocumentNode } from 'graphql';

export default class Helpers {
    static mergeSchemas(rootSchema: DocumentNode[], schemasArray: DocumentNode[][]) {
        const mergedSchema = [
            ...rootSchema,
        ];

        schemasArray.forEach(schema => {
            mergedSchema.push(...schema);
        });

        return mergedSchema;
    }

}