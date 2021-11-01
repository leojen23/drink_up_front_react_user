import { injectable } from "inversify";
import User from "../../entities/user";


@injectable()
export default abstract class IUserRepository {
    abstract signIn(username: string, password: string): void;
}