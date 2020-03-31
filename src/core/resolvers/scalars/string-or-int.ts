import { GraphQLScalarType, Kind } from 'graphql';

const enshureStringOrInt = (value) => {
    if (typeof value !== 'string' || typeof value !== 'number') {
        throw new TypeError(`Expected string or int types, found ${value}.`);
    }
    
    return value; 
};

const stringOrInt = new GraphQLScalarType({
    name: 'StringOrInt',
    description: 'The *StringOrInt* scalar type represents textual data or numbers. The StringOrInt type is most often used by GraphQL to represent MongoDB filters value.',
    serialize: enshureStringOrInt,
    parseValue: enshureStringOrInt,
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value);
        } else if (ast.kind === Kind.STRING) {
            return ast.value;
        }

        return undefined;  
    }
}); 

export default stringOrInt;