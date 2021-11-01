import { Container } from "inversify";
import UserRepositoryImpl from "../application/UserRepositoryImpl";
import UserApiServiceimpl from "../data/remote/UserApiServiceImpl";
import {IUserApiService} from "../data/remote/UserApiServiceImpl";
import IUserRepository from "../domain/adapters/repositories/IUserRepository";
import SignIn from "../domain/usecases/sign_in";

const container = new Container();

container.bind<IUserRepository>(IUserRepository).to(UserRepositoryImpl);
container.bind<IUserApiService>(IUserApiService).to(UserApiServiceimpl);

container.bind<SignIn>(SignIn).toSelf();

export default container;