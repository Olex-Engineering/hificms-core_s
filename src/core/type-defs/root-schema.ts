import { gql } from 'apollo-server';

const rootSchema = gql`
    type Query {
        root: String!
    }
    type Mutation {
        root: String!
    }
    type Subscription {
        root: String!
    }
`;

export default rootSchema; 