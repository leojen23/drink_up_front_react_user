import { Container } from "inversify";
import GardenerPlantRepositoryImpl from "../application/GardenerPlantRepositoryImpl";
import PlantRepositoryImpl from "../application/PlantRepositoryImpl";
import ServiceRepositoryImpl from "../application/ServiceRepositoryImpl";
import UserRepositoryImpl from "../application/UserRepositoryImpl";
import IGardenerPlantRepository from "../domain/adapters/repositories/IGardenerPlantRepository";
import IPlantRepository from "../domain/adapters/repositories/IPlantRepository";
import IServiceRepository from "../domain/adapters/repositories/IServiceRepository";
import IUserRepository from "../domain/adapters/repositories/IUserRepository";


const container = new Container();

container.bind<IUserRepository>(IUserRepository).to(UserRepositoryImpl);
container.bind<IServiceRepository>(IServiceRepository).to(ServiceRepositoryImpl);
container.bind<IPlantRepository>(IPlantRepository).to(PlantRepositoryImpl);
container.bind<IGardenerPlantRepository>(IGardenerPlantRepository).to(GardenerPlantRepositoryImpl);


export default container;