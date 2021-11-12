
import { useInjection } from 'inversify-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../state/index';
import  { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { registerFormData } from '../../application/UserRepositoryImpl';
import LoginForm from '../components/User/LoginForm';
import RegisterForm from '../components/User/RegisterForm';






const LoginPage = (props) => {
    
    const userRepo = useInjection(IUserRepository);

    // const dispatch = useDispatch();
    // const { signIn, loginRequest, logIn } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector((state: State ) => state.login);
    // console.log('state initial' + state.credentials.isNotified);
    // const isAuth = useSelector((state: State ) => state.user.isAuthenticated);
    return (
    
        <div className='bg-transparent p-5' style={{ 
            backgroundImage: `url("https://bergamotte.imgix.net/z049fzgxm50nzio6q6ri06wzq7op?ixlib=rails-4.2.0&auto=format%2Ccompress&fit=crop&q=65&ar=1%3A1&w=560")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',}}>

            <div className='p-5'>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container-fluid text-center"> 
                    <h1 className="display-3">DRINK UP !</h1>
                    <p className="lead text-25 pb-4 fw-bold text-dark">Vos plantes n'auront plus jamais soif !</p>
                    </div>
                </div>
            </div>

           <div className=' position-relative container pt-5'>
                <div className="position-absolute top-0 start-0 bottom-0 end-0 bg-dark  opacity-75 "></div>

                <div className=' position-relative d-flex justify-content-between  pt-5'>
                    <LoginForm />
                    <RegisterForm />
                    
                </div> 
        </div>

    //  </div>
     );
}

export default LoginPage;



                    {/*<h2 className='text-light mb-5 fw-light'>Créer un compte utilisateur</h2>
                    <div className="text-light">
                        <form onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            
                            const username: string = e.currentTarget.email.value
                            const password: string = e.currentTarget.passwordReg.value
                            // console.log(username)
                            await userRepo.register({gender: e.currentTarget.gender.value, firstname: e.currentTarget.firstname.value, surname: e.currentTarget.surname.value, email: e.currentTarget.email.value, password: e.currentTarget.passwordReg.value, isNotified: Boolean(e.currentTarget.isNotified.value)});
                            
                            signIn(username, password, userRepo);
                            }}> 
                            <div className="form-group">
                                <label htmlFor="gender" className="form-label mt-4 float-start">Civilité</label>
                                <select className="form-select" id="gender" name ='gender'>
                                    <option value="" disabled selected>Choisir un option</option>
                                    <option>Monsieur</option>
                                    <option>Madame</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname" aria-required className="form-label mt-4 mr-4 float-start">Prénom</label>
                                <input type="text" value={ state.credentials.firstname } onChange= {(e: React.FormEvent<HTMLInputElement>) => { 
                                    // console.log(e.currentTarget.name)
                                    updateInput
                                    ( e.currentTarget.value, e.currentTarget.name)}} className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Entrez votre prénom" name ='firstname' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="surname" className="form-label mt-4 mr-4 float-start">Nom</label>
                                <input type="text" value={ state.credentials.surname } onChange= {(e: React.FormEvent<HTMLInputElement>) => updateInput( e.currentTarget.value, e.currentTarget.name)} className="form-control" id="surname" aria-describedby="emailHelp" placeholder="Entrez votre nom" name ='surname' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label mt-4 mr-4 float-start">Adresse E-mail</label>
                                <input type="email" value={ state.credentials.credentialsname } onChange= {(e: React.FormEvent<HTMLInputElement>) => updateInput( e.currentTarget.value, e.currentTarget.name)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre adresse email" name ='email' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="passwordReg" className="form-label mt-4 float-start">Mot de passe</label>
                                <input type="password" value={ state.credentials.passwordReg}  onChange= {(e: React.FormEvent<HTMLInputElement>) => updateInput(e.currentTarget.value,  e.currentTarget.name)} className="form-control" id="passwordReg" placeholder="Entrez votre mot de passe" name ='passwordReg'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordReg2" className="form-label mt-4 float-start">Confirmer votre mot de passe</label>
                                <input type="password" value={ state.credentials.passwordReg2}  onChange= {(e: React.FormEvent<HTMLInputElement>) => updateInput(e.currentTarget.value,  e.currentTarget.name)} className="form-control" id="passwordReg2" placeholder="Entrez votre mot de passe"  name ='passwordReg2'/>
                            </div>

                            <div className="form-check form-switch mt-4">
                                <input className="form-check-input " type="checkbox" id="isNotified" value='false' name='isNotified' onChange={(e) => {
                                    e.preventDefault();
                                    const initialValue: boolean = Boolean(e.currentTarget.value);
                                    // console.log('inital' + initialValue) /
                                    // console.log(state.credentials.isNotified);
                                    console.log(state)
                                    console.log('valeur donnée à la foncction' + (e.currentTarget.value))

                                    toggleIsNotified(e.currentTarget.value);
                                    // toggleIsNotified(Boolean(state.credentials.isNotified.value));
                                    
                                    }}/>
                                
                                <label className="form-check-label float-start ml-5" htmlFor="isNotified" >J'active les notifications</label>
                            </div>
                            
                            <button type="submit" className="btn btn-success my-5">Connexion</button>
                        </form>
                    </div>*/}