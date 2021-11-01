import React, {useState} from 'react';
import axios, { AxiosResponse } from "axios";
import IUserApiService from '../../data/remote/UserApiServiceImpl';
import SignIn from '../../domain/usecases/sign_in';
import Container from '../../core/di';
import { useInjection } from 'inversify-react';
import { stringify } from 'querystring';



const LoginPage = () => {

    const signIn = useInjection(SignIn);

    const [credentials, setCredentials] = useState({
        'username': '',
        'password': ''
    })

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void  => {
        const value: string = e.currentTarget.value;
        const name: string = e.currentTarget.name;
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault(); //on empèche le rechargement de la page
        try  {
            signIn.call(credentials.username, credentials.password);
            // storeTokenInLocalStorage(token);
            // addTokenToRequestHeaders(token);
            // console.log('ok')
        }catch (error){
            // console.log(error.response);
        }
    }

    

    return (
        <div>
            <h1>Formulaire de connexion</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                Adresse email:
                <input type="email" value={credentials.username} onChange= {handleChange} placeholder='Adresse email de connextion' name='username' id='username'/>
                </label>

                <label htmlFor='password'>
                Mot de passe:
                <input type="password" onChange= {handleChange} placeholder='Mot de passe' value={credentials.password} name='password' id='password'/>
                </label>
                <input type="submit" value="Connexion" />
            </form>
    </div>
    );
}

export default LoginPage;

