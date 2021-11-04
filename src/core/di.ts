import { Container } from "inversify";
import ServiceRepositoryImpl from "../application/ServiceRepositoryImpl";
import UserRepositoryImpl from "../application/UserRepositoryImpl";
import IServiceRepository from "../domain/adapters/repositories/IServiceRepository";
import IUserRepository from "../domain/adapters/repositories/IUserRepository";


const container = new Container();

container.bind<IUserRepository>(IUserRepository).to(UserRepositoryImpl);
container.bind<IServiceRepository>(IServiceRepository).to(ServiceRepositoryImpl);


export default container;