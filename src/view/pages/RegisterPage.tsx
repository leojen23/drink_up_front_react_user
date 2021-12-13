
import { useInjection } from 'inversify-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../state/index';
import  { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { registerFormData } from '../../application/UserRepositoryImpl';
import LoginForm from '../components/User/LoginForm';
import RegisterForm from '../components/User/RegisterForm';
import { useLocation } from 'react-router';


const RegisterPage = (props) => {

    return (
    
        <div className='bg-transparent container-fluid p-4 d-flex justify-content-center' id="register-page" >
           <div className='form-container row position-relative container rounded'>
            <div className=" position-absolute top-0 start-0 bottom-0 end-0 bg-dark opacity-75 rounded"></div>
                <div className=' position-relative d-flex justify-content-center pt-5 '>
                    <RegisterForm  />
                </div> 
            </div>
        </div>
     );
}
export default RegisterPage;


