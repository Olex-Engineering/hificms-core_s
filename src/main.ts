import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import TypeDefsStorage from './core/type-defs';
import ResolversStorage from './core/resolvers';
import { InMemoryLRUCache } from 'apollo-server-caching';
import Modules from './core/modules';
const mongoose = require('mongoose'); 
 
// Initialize modules
Modules.init();

let server;

// The `listen` method launches a web server.
mongoose.connect(
    environment.mongoPath,  
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        // Get schemas
        const typeDefs = TypeDefsStorage.getTypeDefs();

        // Get resolvers
        const resolvers = ResolversStorage.getResolvers();

        // The ApolloServer constructor requires two parameters: your schema
        // definition and your set of resolvers.
        server = new ApolloServer({
            typeDefs,
            resolvers,
            debug: environment.apollo.debug,
            playground: environment.apollo.playground,
            introspection: environment.apollo.introspection,
            tracing: environment.apollo.tracing,
            persistedQueries: {
                cache: new InMemoryLRUCache()
            },
        });

        server.listen(environment.port).then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
    })
    .catch((e) => {
        console.log(e);
    });

 
// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
}