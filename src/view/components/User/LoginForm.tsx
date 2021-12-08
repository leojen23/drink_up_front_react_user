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
        
    return(
        <div className='login-form mx-5 mt-5 ' id="login-form">
            <div className="d-flex justify-content-center mb-3">
                <span className="text-light fw-normal"><BsPersonCircle size={50} /></span>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <Field name='username' component={renderInputField} label='Adresse e-mail' type='email' />
                </div>
                <div className="form-group">
                    <Field name='password' component={renderInputField} label='Mot de passe' type='password' />
                </div>
                <div className="py-2 d-flex justify-content-start">
                    <a href="#"  className="text-white"><small>Mot de passe oublié ?</small></a>
                </div>
                <button type="submit" className="btn btn-outline-light my-5 rounded">Connexion</button>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'login',
    destroyOnUnmount: true,
})(LoginForm)

// export default LoginForm;