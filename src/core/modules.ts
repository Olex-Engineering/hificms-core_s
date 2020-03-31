import AuthModule from '../auth/auth';

export default class Modules {
    private static modulesToAdd = [
        AuthModule,
    ];

    public static init() {
        this.modulesToAdd.forEach(module => new module().init());
    }
}