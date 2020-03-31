const defaultPort = 4000;

interface Environment {
  apollo: {
    introspection: boolean,
    playground: boolean,
    debug: boolean,
    tracing: boolean,
  },
  port: number | string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  mongoPath: string;
}


export const environment: Environment = {
    apollo: {
        introspection: process.env.APOLLO_INTROSPECTION === 'true',
        playground: process.env.APOLLO_PLAYGROUND === 'true',
        debug: process.env.APOLLOG_DEBUG === 'true',
        tracing: process.env.APOLLO_TRACING === 'true',
    },
    port: process.env.PORT || defaultPort,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    mongoPath: process.env.MONGO_PATH,
};