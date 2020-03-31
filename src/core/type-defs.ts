import rootTypeDefs from './type-defs/root-type-defs';
import Helpers from './utils/helpers';
// custom modules
import { authSchema } from '../auth/auth';

// add you custom schemes here
const typeDefs = Helpers.mergeSchemas(
    rootTypeDefs, 
    [
        authSchema,
    ]);

export default typeDefs;