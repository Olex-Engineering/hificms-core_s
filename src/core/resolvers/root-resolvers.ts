import { IResolvers } from 'graphql-tools';
import Mutation from './root-mutations';
import Query from './root-query';
import Subscription from './root-subsciption';
import rootScalars from './root-scalars';

const rootResolvers: IResolvers = {
    Mutation,
    Query,
    Subscription,
    ...rootScalars,
};

export default rootResolvers;  