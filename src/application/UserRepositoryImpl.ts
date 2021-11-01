import IUserRepository from "../domain/adapters/repositories/IUserRepository";
import { inject, injectable } from "inversify";
import User from "../domain/entities/user";
import {IUserApiService} from "../data/remote/UserApiServiceImpl";



@injectable()
export default class UserRepositoryImpl implements IUserRepository {

    @inject(IUserApiService) private userApiService!: IUserApiService;

    signIn (username : string, password: string): void{
        
       
        const user = this.userApiService.authenticate(username, password) ;
        
    }
}