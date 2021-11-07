import { useInjection } from 'inversify-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field} from 'redux-form'
import IUserRepository from '../../../domain/adapters/repositories/IUserRepository';
import { actionCreators } from '../../state';
import { renderInputField } from '../formFields';


    
    const LoginForm = ({handleSubmit}) => {
        
        const userRepo: IUserRepository = useInjection(IUserRepository);
        const dispatch = useDispatch();
        const { signIn} = bindActionCreators(actionCreators, dispatch);


        const submit = (values) => {
            signIn(values.username, values.password, userRepo)
        }
        
    // console.log(props.onsubmit)
    return(
        // <div className='d-flex justify-content-center'>

            <div className='login-form mx-5 w-50'>
                <h2 className='text-light mb-5 fw-light'>Connectez-vous à votre compte</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <Field name='username' component={renderInputField} label='Adresse e-mail' type='email' />
                    </div>
                    <div className="form-group">
                        <Field name='password' component={renderInputField} label='Mot de passe' type='password' />
                    </div>
                    <button type="submit" className="btn btn-success my-5 rounded">Connexion</button>
                </form>
            </div>
        // </div>
        );
}

export default reduxForm({
    form: 'login',
    destroyOnUnmount: true,
})(LoginForm)

// export default LoginForm;