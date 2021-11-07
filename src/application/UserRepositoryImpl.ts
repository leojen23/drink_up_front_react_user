import IUserRepository from "../domain/adapters/repositories/IUserRepository";
import User from "../domain/entities/user";
import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import {requestBuilder} from "../core/utils/requestBuilder";

@injectable()
export default class UserRepositoryImpl implements IUserRepository {

        private protocole: string = 'http://';
        private domain: string = 'drink-up-apiplatform.test:8080';
        private url: string = this.protocole + this.domain;

        public getAuthenticatedUserId = () :number | null =>  {
                const token: string | null = window.localStorage.getItem('authToken');

                if(token){
                        const data = this.parseJwt(token);
                        const userId: number = data.id;
                        return  userId;
                }
                return null;
        }

        public signOut = () => {
                this.unsetAxiosToken();
                this.removeTokenFromLocalStorage();
        }

        public async signIn (username: string, password: string){
            
            const requestUrl: string = requestBuilder("/api/login_check");
            const credentials: any = {username, password};
            try {
                    //     console.log('ppl')
                    const data: any = (await axios.post<AxiosResponse>(requestUrl, credentials)).data
                    const token: string = data.token
                    
            this.setAxiosToken(token);
            this.storeTokenInLocalStorage(token);
            } catch (error: any) {
                console.log('there was an error');  
            }

        }


        public  register = async ({email, password, gender, firstname, surname, isNotified}: registerFormData): Promise<void> => {
             
                const apiEndPoint: string = '/api/users'  
                const userDetails:  registerFormData = {email, password, gender, firstname, surname, isNotified  };
                // console.log(userDetails);
                // console.log(userDetails);
                return;
                try {
                    const data: any = (await axios.post(this.url + apiEndPoint, userDetails)).data
                } catch (error) {
                        
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
        public  getUserData = async (id:number | null): Promise<User | undefined> => {

                const apiEndPoint: string = '/api/users/'+ id

                try {
                        const data: any= (await axios.get<any>(this.url + apiEndPoint)).data
                        const user: User | undefined = new User(data.id, data.gender, data.firstname, data.surname, data.is_notified);
                        console.log(user);
                        return user;

                }catch(error){
                             
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
      