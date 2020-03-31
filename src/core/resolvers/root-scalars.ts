import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';
import * as GraphQLRegExp from 'graphql-type-regexp';
import stringOrInt from './scalars/string-or-int';
import date from './scalars/date';

const rootScalars = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    StringOrInt: stringOrInt,
    Date: date,
    RegExp: GraphQLRegExp,
};

export default rootScalars;