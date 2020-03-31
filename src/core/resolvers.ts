import * as merge from 'deepmerge';
import { IResolvers } from 'graphql-tools';
import rootResolvers from './resolvers/root-resolvers';
// custom modules
import { authResolvers } from '../auth/auth';

const resolvers: IResolvers = merge.all([
    rootResolvers, 
    authResolvers
]) as IResolvers;

export default resolvers; 