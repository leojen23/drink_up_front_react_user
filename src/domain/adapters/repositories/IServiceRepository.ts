import { injectable } from "inversify";


@injectable()
export default abstract class IServiceRepository {
    abstract setup():void;
    abstract isAuthenticated(): boolean
}