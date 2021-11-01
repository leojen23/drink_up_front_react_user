import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import User from "../../domain/entities/user";
import { STATUS_CODES } from "http";

@injectable()
export abstract class IUserApiService {
        abstract authenticate(username: string, password: string) : void;
}
@injectable()
export default class UserApiServiceimpl implements IUserApiService {


        public signOut(): void {
                window.localStorage.removeItem('authToken');
                delete axios.defaults.headers.common['Authorization'];
        }

        public async authenticate(username: string, password: string) {
                
                const domain: string = 'drink-up-apiplatform.test:8080';
                const url : string = 'http://' + domain +'/api/login_check';
                const credentials = {username, password};
                try {
                const data: any = await axios.post<Response>(url, credentials).then(response => response.data);
                const token: string = data.token
                this.addTokenToRequestHeaders(token);
                this.storeTokenInLocalStorage(token);
                var parsedUser = this.parseJwt(token);
                var user = new User(parsedUser.id, parsedUser.gender, parsedUser.firstname, parsedUser.surname, parsedUser.is_notified)
                
                return user;

                } catch (error: any) {
                        console.log('hey');
                     console.log(error)   
                }

        }

        private storeTokenInLocalStorage (token: string):void {
                window.localStorage.setItem('authToken', token);
        }

        // On prévient axios qu'on a un headers par défault pour toutes nos futures requetes Http
        private addTokenToRequestHeaders (token:string): void {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }

        private parseJwt(token:string){
                try {
                        return JSON.parse(atob(token.split('.')[1]));    
                } catch (error) {
                        return null;     
                }
        }
}
