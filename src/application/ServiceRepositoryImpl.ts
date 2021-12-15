import { injectable } from "inversify";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import IServiceRepository from "../domain/adapters/repositories/IServiceRepository";
import { corsHeadersSetter } from "../core/utils/corsHeadersSetter";

corsHeadersSetter(axios)
@injectable()
export default class ServiceRepositoryImpl implements IServiceRepository {

    public setup(){

        //Vérification existence et validité du token
        const token: string | null | undefined = window.localStorage.getItem('authToken');

        if ((token !== "undefined" && token !== null )){
        const {exp: expiration}: any = jwtDecode(token);

         if(expiration * 1000 > new Date().getTime()){
            this.setAxiosToken(token);
            }  
        }
    }

    private setAxiosToken (token:string): void {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    public isAuthenticated = (): boolean => {
        const token: any = window.localStorage.getItem('authToken');

        if (token !== "undefined" && token !== null ){
            const {exp: expiration}: any = jwtDecode(token);
            
            if(expiration * 1000 > new Date().getTime()){
                return true;
            }
            return false
        }
        return false;
    }
}