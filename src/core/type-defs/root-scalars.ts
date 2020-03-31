import { gql } from 'apollo-server';

const rootScalars = gql`
    scalar JSON
    scalar JSONObject
    scalar StringOrInt
    scalar Date,
    scalar RegExp,
`;

export default rootScalars;