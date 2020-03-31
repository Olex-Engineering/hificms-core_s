import { IMongoFIlterArgs, IMongoFilterInput, IMongoSortInput, IListOptionsInput, IListOptionsParsedInput } from '../interfaces/parsers.interface';

export default class Parsers {
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

    public static parseMongoDBSort(sortData: IMongoSortInput) {
        const validSortData = {};
        validSortData[sortData.field] = sortData.criteria;
        return validSortData;
    }

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

    public static mapInfoToProjection(info: any) {
        return info.operation.selectionSet.selections[0]
            .selectionSet.selections.map(selection => selection.name.value);
    }
}