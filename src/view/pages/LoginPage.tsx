
import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../state/index';
import  { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';




const LoginPage = ({isAuthenticated}: any) => {
    
    const userRepo = useInjection(IUserRepository);

    const dispatch = useDispatch();
    const { signIn , updateInput } = bindActionCreators(actionCreators, dispatch);

    const state = useSelector((state: State ) => state.user);
    const isAuth = useSelector((state: State ) => state.user.isAuthenticated);
    console.log('login page ' +  isAuth )
   

    return (
        <div className='pt-2 container w-50'>
           <h1 className ='py-5'>Formulaire de connexion</h1>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => signIn(e.currentTarget.username.value,e.currentTarget.password.value, userRepo, e)}> 
            <div className="form-group d-flex justify-content-center">
                <label htmlFor="username" className="form-label mt-4 mr-4">Adresse email</label>
                <input type="email" value={ state.credentials.username } onChange= {(e: React.FormEvent<HTMLInputElement>) => updateInput( e.currentTarget.value, e.currentTarget.name)} className="form-control" id="username" aria-describedby="emailHelp" placeholder="Entrez votre adresse email" />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group d-flex justify-content-center mt-4">
                <label htmlFor="password" className="form-label mt-4 ">Mot de passe</label>
                <input type="password" value={ state.credentials.password}  onChange= {(e: React.FormEvent<HTMLInputElement>) => updateInput(e.currentTarget.value,  e.currentTarget.name)} className="form-control" id="password" placeholder="Entrez votre mot de passe" />
            </div>
            <button type="submit" className="btn btn-success my-5">Connexion</button>
            </form>
     </div>
     );
}

export default LoginPage;

