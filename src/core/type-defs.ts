import rootTypeDefs from './type-defs/root-type-defs';
// custom modules
import { DocumentNode } from 'graphql';


export default class TypeDefsStorage {
    private static typeDefs: DocumentNode[] = [ ...rootTypeDefs ]

    public static addTypeDefs(schema: DocumentNode[]): void {
        this.typeDefs.push(...schema);
    }

    public static getTypeDefs(): DocumentNode[] {
        return this.typeDefs;
    }
}