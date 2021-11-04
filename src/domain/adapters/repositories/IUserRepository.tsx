import { injectable } from "inversify";
import User from "../../entities/user";


@injectable()
export default abstract class IUserRepository {
    abstract signIn(username: string, password: string):void;
    abstract signOut():void;
    abstract getUserData(id: number | null): any ;
    abstract getAuthenticatedUserId(): number | null;
}