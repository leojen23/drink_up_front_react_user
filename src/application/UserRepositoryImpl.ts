import IUserRepository from "../domain/adapters/repositories/IUserRepository";
import User, { IUser } from "../domain/entities/user";
import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import {requestBuilder} from "../core/utils/requestBuilder";
import GardenerPlant, { IGardenerPlant } from "../domain/entities/GardenerPlant";
import { toast } from "react-toastify";
import { isConstructorDeclaration } from "typescript";
import moment from "moment";

@injectable()
export default class UserRepositoryImpl implements IUserRepository {

        // const requestUrl = requestBuilder('/api/gardener_plants/' + gardenerPlant.id);

        // private protocole: string = 'http://';
        // private domain: string = 'drink-up-apiplatform.test:8080';
        // private url: string = this.protocole + this.domain;
        // const requestUrl:string = requestBuilder('/api/users');

        public getAuthenticatedUserId = () :number | undefined =>  {
                const token: string | null = window.localStorage.getItem('authToken');

                if(token){
                        const data = this.parseJwt(token);
                        const userId: number = data.id;
                        return  userId;
                }
                return undefined;
        }
        public signOut = () => {
                this.unsetAxiosToken();
                this.removeTokenFromLocalStorage();
        }

        public async signIn (username: string, password: string){
            
            const requestUrl: string = requestBuilder("/api/login_check");
            const credentials: userCredentials = {username, password};
            try {
                    const data: any = (await axios.post<AxiosResponse>(requestUrl, credentials)).data
                    const token: string = data.token
            this.setAxiosToken(token);
            this.storeTokenInLocalStorage(token);

            } catch (error: any) {
                toast.error('une erreur est survenue, vérifier vos identifiants de connexion', { delay: 2000 })
                console.log(error)
            }
        }

        public  register = async ({email, password, gender, firstname, surname, isNotified}: registerFormData): Promise<void> => {
             
                // const apiEndPoint: string = '/api/users'  
                const requestUrl:string = requestBuilder('/api/users');
                const userDetails:  registerFormData = {email, password, gender, firstname, surname, isNotified  };
                
                try {
                        // console.log('ppl')
                    const data: any = (await axios.post(requestUrl, userDetails)).data
                    toast.success('Votre compte a été créé avec succès !', { delay: 2000 })
                } catch (error) {
                        toast.error("Une erreur s'est produite lors de la création de votre compte !", { delay: 2000 })
                        console.log(error)
                }

        }
        private storeTokenInLocalStorage (token: string):void {
            window.localStorage.setItem('authToken', token);
        }
        private removeTokenFromLocalStorage ():void {
                
                window.localStorage.removeItem('authToken');
        }
        private setAxiosToken (token:string): void {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        private unsetAxiosToken (): void {
                delete axios.defaults.headers.common['Authorization'];
        }

        private parseJwt(token:string){
                try {
                        return JSON.parse(atob(token.split('.')[1]));    
                } catch (error) {
                        return null;     
                }
        }
        public  getUserData = async (id:number | undefined): Promise<User | undefined> => {

                const requestUrl: string = requestBuilder('/api/users/'+ id)
                try {
                        const data: any= (await axios.get<any>(requestUrl)).data;
                        const gardenerPlantsData: IGardenerPlant[] = data.gardenerPlants;
                        const gardenerPlants: IGardenerPlant [] = gardenerPlantsData.map(function(gardenerPlant){
                                
                                return new GardenerPlant(gardenerPlant.id, gardenerPlant.nickname, gardenerPlant.sunlight, gardenerPlant.size, gardenerPlant.season, gardenerPlant.topography,gardenerPlant.location, gardenerPlant['plant'].frequency, gardenerPlant['plant'].image, gardenerPlant['plant'].id, gardenerPlant['plant'].name, gardenerPlant.nextWateringDate, moment(gardenerPlant.lastWateringDate).format('YYYY-MM-DD'), gardenerPlant.wateringStatus, gardenerPlant.wateringFrequency, gardenerPlant.numberOfLateDays)
                        })

                        const user: IUser | undefined = new User(data.id, data.gender, data.firstname, data.surname, data.is_notified, gardenerPlants, data.totalNumberOfGardenerPlants, data.numberOnDayWaterings, data.numberOfLateWaterings, data.numberOfUpToDateWaterings);

                        return user;

                }catch(error){
                   console.log(error)           
                }
        }
        
        public water = async (gardenerPlant: IGardenerPlant, userIRI: string, plantIRI:string, wateringDate: string): Promise<void> => {

                const requestUrl = requestBuilder('/api/gardener_plants/' + gardenerPlant.id);
                const gardenerPlantDetails = {user: userIRI, plant:plantIRI , nickname: gardenerPlant.nickname, sunlight: gardenerPlant.sunlight, size: gardenerPlant.size, season:gardenerPlant.season, topography:gardenerPlant.topography, location: gardenerPlant.location, lastWateringDate: wateringDate };
        
                try {
                        const data: any = (await axios.put(requestUrl, gardenerPlantDetails)).data
                        
                } catch (error) {
                    toast.error('Une erreur est survenue lors de la modification de votre plante', { delay: 2000 })
                     console.log(error)
                }
            }

        
}
export interface registerFormData {
        email: string,
        password: string,
        gender: string,
        firstname: string,
        surname: string,
        isNotified: boolean
}

export interface userCredentials {
        username: string
        password: string
}