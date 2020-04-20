import { IMongoFIlterArgs, IMongoFilterInput, IMongoSortInput, IListOptionsInput, IListOptionsParsedInput } from '../interfaces/parsers.interface';

export default class Parsers {
    /**
     * Map Graphql input to valid mongodb query
     * @param queryData - Graphql query input
     */
    private static getFilterOperators(queryData: IMongoFIlterArgs): {[key: string]: object} {
        const validOperators: {[key: string]: object} = {};
    
        const commonOperators = /eq|regex|gt|gte|in|lt|lte|ne|nin/;
        const internalOperators = /expr|not/;
        const globalOperators = /and|nor|or/;
    
        for (let prop in queryData) {
            const value = queryData[prop]; 

            if (commonOperators.test(prop)) {
                validOperators[`$${prop}`] = value;
            }
    
            if (internalOperators.test(prop)) {
                validOperators[`$${prop}`] = Parsers.getFilterOperators(value); 
            }
    
            if (globalOperators.test(prop)) {
                const expressionsArray = [];
                value.forEach(({ expression }) => {
                    expressionsArray.push(Parsers.parseMongoDBQuery(expression));
                });

                validOperators[`$${prop}`] = expressionsArray;
            }
        }
    
        return validOperators;
    }

    /**
     * Setted parsed query to object with key 
     * or without (if it is global operator)
     * @param queryDataArray - graphql query input
     */
    public static parseMongoDBQuery(queryDataArray: IMongoFilterInput[]): {[key: string]: object} {
        let validQueryForMongo: {[key: string]: object} = {};

        queryDataArray.forEach((fieldQuery: IMongoFilterInput) => {
            if (fieldQuery.field) {
                validQueryForMongo[fieldQuery.field] = Parsers.getFilterOperators(fieldQuery.filter);
            } else {
                validQueryForMongo = Parsers.getFilterOperators(fieldQuery.filter);
            }
        });

    
        return validQueryForMongo;
    }

    /**
     * Map graphql input to valid mongoose sort options
     * @param sortData - Grapql input
     */
    public static parseMongoDBSort(sortData: IMongoSortInput) {
        const validSortData = {};
        validSortData[sortData.field] = sortData.criteria;
        return validSortData;
    }

    /**
     * Parse list options input to valid mongodb query options
     * @param filterInput - Graphql list filter input
     */
    public static parseListOptionsInput(filterInput: IListOptionsInput): IListOptionsParsedInput {
        if (!filterInput) {
            return {
                filter: {},
                queryOptions: {}
            };
        }

        const validListFilterInput: IListOptionsParsedInput = {
            filter: filterInput.filter ? Parsers.parseMongoDBQuery(filterInput.filter) : null,
            queryOptions: {
                limit: filterInput.limit || 0,
                skip: filterInput.skip || 0,
                sort: filterInput.sort ? Parsers.parseMongoDBSort(filterInput.sort) : null,
            },
        };

        return validListFilterInput;
    }

    /**
     * Map graphql info to mongoose projection
     * Projection - fields thats client fetch
     * @param info - graphql info
     */
    public static mapInfoToProjection(info: any) {
        return info.operation.selectionSet.selections[0]
            .selectionSet.selections.map(selection => selection.name.value);
    }
}