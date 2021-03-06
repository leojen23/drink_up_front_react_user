import { injectable } from "inversify";
import { registerFormData } from "../../../application/UserRepositoryImpl";
import { IGardenerPlant } from "../../entities/GardenerPlant";
import User from "../../entities/user";


@injectable()
export default abstract class IUserRepository {
    abstract signIn(username: string, password: string):void;
    abstract register({gender, firstname, surname,email, password, isNotified }: registerFormData):Promise<void>;
    abstract signOut():void;
    abstract getUserData(id: number | undefined): Promise<User | undefined> ;
    abstract getAuthenticatedUserId(): number | undefined;
    abstract water (gardenerPlant:IGardenerPlant, userIRI: string, plantIRI: string, wateringDate: string): Promise<void>;
}