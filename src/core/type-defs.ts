import rootTypeDefs from './type-defs/root-type-defs';
// custom modules
import { DocumentNode } from 'graphql';


export default class TypeDefsStorage {
    // CORE type definitions storage
    private static typeDefs: DocumentNode[] = [ ...rootTypeDefs ]

    /**
     * Add type defs array to final type definitions storage
     * @param schema - type defas array to add
     */
    public static addTypeDefs(schema: DocumentNode[]): void {
        this.typeDefs.push(...schema);
    }

    /**
     * Get final definitions storage
     */
    public static getTypeDefs(): DocumentNode[] {
        return this.typeDefs;
    }
}