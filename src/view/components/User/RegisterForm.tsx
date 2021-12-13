import { useInjection } from 'inversify-react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field} from 'redux-form'
import IUserRepository from '../../../domain/adapters/repositories/IUserRepository';
import { actionCreators } from '../../state';
import { renderInputField, renderSelectField, renderSwitchField } from '../formFields';
import { BsPersonCircle } from "react-icons/bs";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


    
    const RegisterForm = ({handleSubmit}) => {
        
        const userRepo: IUserRepository = useInjection(IUserRepository);
        const dispatch = useDispatch();
        const { logIn } = bindActionCreators(actionCreators, dispatch);

        const submit = async (values) => {
            await userRepo.register({gender: values.gender, firstname: values.firstname, surname: values.surname, email:values.email, password: values.passwordReg, isNotified:values.isNotified});
            logIn({username:values.email, password:values.passwordReg}, userRepo)
            toast.success('Votre compte a été créé avec succes', { delay: 4000 });
        }
        
    return(
        <div className='register-form '>
            <h2 className='text-light mb-5 fw-normal '>Créer un compte utilisateur</h2>
            <span className="text-light fw-normal"><BsPersonCircle size={60} /></span>
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <Field name='gender' component={renderSelectField} label='Civilité'>
                        <option value='' children="Choisir une option" selected></option>
                        <option value='Madame' children='Madame'></option>
                        <option value='Monsieur' children='Monsieur'></option>
                    </Field>
                </div>
                <div className="form-group">
                    <Field name='firstname' component={renderInputField} label='Prénom' type='text'/>
                </div>
                <div className="form-group">
                    <Field name='surname' component={renderInputField} label='Nom' type='text'/>
                </div>
                <div className="form-group">
                    <Field name='email' component={renderInputField} label='Adresse e-mail' type='email'/>
                </div>
                <div className="form-group">
                    <Field name='passwordReg' component={renderInputField} label='Mot de passe' type='password'/>
                </div>
                <div className="form-group">
                    <Field name='passwordReg2' component={renderInputField} label='Confirmez votre mot de passe' type='password'/>
                </div>
                <div className="form-group">
                    <Field name='isNotified' component={renderSwitchField} label='Je souhaite recevoir les noficiations' type='checkbox' defaultValue={false} />
                </div>
                <div className=' d-flex justify-content-center gap-5'>
                    <Link to={'/'} className="btn btn-success my-5 rounded">Retour</Link>
                    <button type="submit" className="btn btn-success my-5 rounded">Valider votre saisie</button>
                </div>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'register',
    destroyOnUnmount: true,
    
})(RegisterForm)

// export default LoginForm;