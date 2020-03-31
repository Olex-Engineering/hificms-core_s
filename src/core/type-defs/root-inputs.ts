import { gql } from 'apollo-server';

const rootInputs = gql`

    #Global List inout
    input ListOptionsInput {
        limit: Int
        skip: Int
        sort: SortInput
        filter: [FilterInput!]
    }

    # Sort inputs for MongoDB
    input SortInput {
        field: String
        criteria: SortCritera
    }

    enum SortCritera {
        asc
        desc
    }

    # QUERY inputs for MongoDB

    """
        If user set target field > filter apply to field (works with: all operators except logical)
        If user does not set target field > filter apply to all document (works with: logical operators)
    """
    input FilterInput {
        field: String
        filter: FilterOperators! 
    }

    #MongoDB query operators
    input FilterOperators {
        eq: StringOrInt
        regex: RegExp
        gt: Int
        gte: Int
        in: [StringOrInt!]
        lt: Int
        lte: Int
        ne: StringOrInt
        nin: [StringOrInt!]
        and: [LogicalOperatorsInput!]
        not: FilterOperators
        nor: [LogicalOperatorsInput!]
        or: [LogicalOperatorsInput!]
        expr: ExprOperatorsInput
    }

    # MongoDB Locial operators 
    input LogicalOperatorsInput {
        expression: [FilterInput!]
    }

    # MongoDB Locial operators 
    input ExprOperatorsInput {
        gt: [String!]
        gte: [String!]
        lt: [String!]
        lte: [String!]
        ne: [String!]
    }
`;

export default rootInputs;