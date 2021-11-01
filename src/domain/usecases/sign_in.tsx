import "reflect-metadata"
import { inject, injectable } from "inversify";
import UserRepositoryImpl from "../../application/UserRepositoryImpl";
import IUserRepository from "../adapters/repositories/IUserRepository";
import { resolve } from "inversify-react";
// import { resolve4 } from "dns/promises";


@injectable()
export default class SignIn{

    @inject(IUserRepository) private userRepository!: IUserRepository;
    // @inject(UserPresenter) private userRepository!: UserRepository;
    // constructor(userRepository: IUserRepository){
    //     this.userRepository = userRepository;
    // }

    call(username: string, password: string):void {
        // console.log(this.userRepository);
        const user: void = this.userRepository.signIn(username, password);
        // UserPresenter.displayUserInfos(user);
    }

}

// export interface Credentials {
//     username: string;
//     password: string;
// }

