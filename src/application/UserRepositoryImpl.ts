import IUserRepository from "../domain/adapters/repositories/IUserRepository";
import User from "../domain/entities/user";
import { injectable } from "inversify";
import axios from "axios";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import jwtDecode from 'jwt-decode';
import store from "../view/state/store";
import {history} from '../view/state/store';


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

        public async signIn (username : string, password: string){

            const apiEndPoint: string = '/api/login_check'
            const credentials: object = {username, password};

            try {
            const data: any = await axios.post<Response>(this.url + apiEndPoint, credentials).then(response => response.data);
            const token: string = data.token
            this.setAxiosToken(token);
            this.storeTokenInLocalStorage(token);
            } catch (error: any) {
                console.log('there was an error');  
            }

        }
        private storeTokenInLocalStorage (token: string):void {
            window.localStorage.setItem('authToken', token);
        }
        private removeTokenFromLocalStorage ():void {
                console.log('removed from storage')
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
        public  getUserData = async (id:number | null): Promise<any> => {

                const apiEndPoint: string = '/api/users/'+ id

                try {
                        const data: any= await axios.get<any>(this.url + apiEndPoint).then(response => response.data);
                        const user: User = new User(data.id, data.gender, data.firstname, data.surname, data.is_notified);
                        
                        return user;

                }catch(error){
                        
                        console.log(error)
                }
                return null;
        }      
        }