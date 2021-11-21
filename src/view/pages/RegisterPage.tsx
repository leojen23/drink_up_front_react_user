
import { useInjection } from 'inversify-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../state/index';
import  { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { registerFormData } from '../../application/UserRepositoryImpl';
import LoginForm from '../components/User/LoginForm';
import RegisterForm from '../components/User/RegisterForm';


const RegisterPage = (props) => {
    
    const userRepo = useInjection(IUserRepository);
   
    return (
    
        <div className='bg-transparent p-5' id="register-page" >
           <div className=' position-relative container w-75 rounded'>
            <div className="position-absolute top-0 start-0 bottom-0 end-0 bg-dark opacity-75 rounded"></div>

                <div className='position-relative d-flex justify-content-center pt-5 '>
                    <RegisterForm />
                </div> 
            </div>
        </div>
     );
}

export default RegisterPage;


