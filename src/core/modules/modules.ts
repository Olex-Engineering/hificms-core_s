import AuthModule from './auth/auth';
import ConnectModules from '../utils/decorators/connect-modules.decorator';

// Add all modules for initializing
@ConnectModules([
    AuthModule,
])
export default class Modules {
}