import { useInjection } from 'inversify-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field} from 'redux-form'
import IUserRepository from '../../../domain/adapters/repositories/IUserRepository';
import { actionCreators } from '../../state';
import { renderInputField } from '../formFields';
import { BsPersonCircle } from "react-icons/bs";

    
    const LoginForm = ({handleSubmit}) => {
        
        const dispatch = useDispatch();
        const { logIn} = bindActionCreators(actionCreators, dispatch);
        const userRepo: IUserRepository = useInjection(IUserRepository);

        const submit = (values) => {
            
            logIn({username: values.username, password: values.password}, userRepo);
        }


        const required = value => value ? undefined : 'Required'
        // const email = value =>
        // value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        // 'Format d/email non valide' : undefined
        // const maxLength = max => value =>
        // value && value.length > max ? `Must be ${max} characters or less` : undefined
        // const maxLength15 = maxLength(15)
        
    return(
        <div className='login-form mt-5 d-flex flex-column ' id="login-form">
            <div className="d-flex justify-content-center mb-3">
                <span className="text-light fw-normal"><BsPersonCircle size={50} /></span>
            </div>

            <form onSubmit={handleSubmit(submit)}>

                <Field 
                name='username' 
                component={renderInputField} 
                label='Adresse e-mail' 
                type='email'
                // validate={required}
                 />
                
                <Field 
                name='password' 
                component={renderInputField} 
                label='Mot de passe' 
                type='password' />

                <div className="py-2 d-flex justify-content-start">
                    <a href="#"  className="text-white"><small>Mot de passe oublié ?</small></a>
                </div>

                <button type="submit" className="btn btn-outline-light my-5 rounded w-auto">Connexion</button>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'login',
    destroyOnUnmount: true,
})(LoginForm)

// export default LoginForm;