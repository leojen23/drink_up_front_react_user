import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector} from 'redux-form'
import IUserRepository from '../../../domain/adapters/repositories/IUserRepository';
import { actionCreators, State } from '../../state';
import { loginFailed } from '../../state/action-creators';
import { renderHiddenField, renderInputField, renderSelectField } from '../formFields';
import { BsPersonCircle } from "react-icons/bs";
import IPlantRepository from '../../../domain/adapters/repositories/IPlantRepository';
import IGardenerPlantRepository from '../../../domain/adapters/repositories/IGardenerPlantRepository';



const CreateGardenerPlant = ({handleSubmit}) => {



    const dispatch = useDispatch();
    const { fetchPlants} = bindActionCreators(actionCreators, dispatch);
    const plantRepo = useInjection(IPlantRepository);
    const gardenerPlantRepo = useInjection(IGardenerPlantRepository);
    const plants = useSelector((state: State ) => state.plant.plants);
    const isLoading = useSelector((state: State ) => state.plant.isLoading);

    
    useEffect( () =>   {
        fetchPlants(plantRepo);
    }, []);

    const generateIRI = (id:number, entity:string): string => {
        return "/api/"+ entity +"/" + id
    }


    const submit = async (values) => {
        console.log(values.user)

        const userIRI = "/api/users/" + values.userId;
        const plantIRI = "/api/plants/" + values.plantId;
        console.log(userIRI)
        console.log(plantIRI)

        await gardenerPlantRepo.registerGardenerPlant({user:userIRI, plant:plantIRI, nickname: values.nickname, sunlight: values.sunlight, size: values.size, season: values.season, topography: values.topography, location: values.location})
        // console.log(values)
    }

    return(
        <div className='create-gardener-plant-form container d-flex flex-column align-items-center my-5'>
            <div className="wrapper bg-dark px-5 w-75 ">

                {isLoading ? (
                <div className ="d-flex justify-content-center align-items-center mt-5">
                    <div className="d-flex flex-column align-items-center py-5">

                        <div className="spinner-border text-white mb-5  " role="status"></div>
                        <span className="visually text-light fs-4">Chargement en cours</span>

                    </div>
                </div>
                ) : (
                <form onSubmit={handleSubmit(submit)}>
                     <div className="form-group">
                        <Field name='userIRI' component={renderHiddenField} type='hidden' />
                    </div>
                    <div className="form-group">
                        <Field name='plantId' component={renderSelectField} label="Choisissez une plante de notre catalogue ">
                            <option value='' children="Choisir une option" selected></option>
                            {plants.map((plant) => {
                            return(<option key={plant.id} value={plant.id} children= {plant.name}></option>)
                            })}
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field name='nickname' component={renderInputField} label='Personnalisez le nom de votre plante' type='text'/>
                    </div>
                    <div className="form-group">
                        <Field name='sunlight' component={renderSelectField} label="Définissez l'éclairage de la pièce ">
                            <option value='' children="Choisir une option" selected></option>
                            <option value='Ombragé' children='Ombragé'></option>
                            <option value='Lumineux' children='Lumineux'></option>
                            <option value='Très lumineux' children='Très lumineux'></option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field name='size' component={renderSelectField} label='Définissez la taille de votre plante'>
                            <option value='' children="Choisir une option" selected></option>
                            <option value='Petite' children='Petite'></option>
                            <option value='Moyenne' children='Moyenne'></option>
                            <option value='Grande' children='Grande'></option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field name='season' component={renderSelectField} label="Définissez la saison de l'année">
                            <option value='' children="Choisir une option" selected></option>
                            <option value='Printemps' children='Printemps'></option>
                            <option value='Eté' children='Eté'></option>
                            <option value='Automne' children='Automne'></option>
                            <option value='Hiver' children='Hiver'></option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field name='topography' component={renderSelectField} label='Définissez le relief de votre logement'>
                            <option value='' children="Choisir une option" selected></option>
                            <option value='Bord de mer' children='Bord de mer'></option>
                            <option value='Plaine' children='Plaine'></option>
                            <option value='Plateau' children='Plateau'></option>
                            <option value='Montagne' children='Montagne'></option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <Field name='location' component={renderSelectField} label='Ou se trouve votre plante ?'>
                            <option value='' children="Choisir une option" selected></option>
                            <option value='Intérieur' children='Intérieur'></option>
                            <option value='Extérieur' children='Extérieur'></option>
                        </Field>
                    </div>
                    <button type="submit" className="btn btn-success my-5 rounded">Valider votre saisie</button>
                </form>)}
            </div>
        </div>
    );
}

export default reduxForm({
    
    form: 'create_gardener_plant',
    // initialValues= {userId:'userId'},
    destroyOnUnmount: true,
    enableReinitialize:true
    
})(CreateGardenerPlant)
    