import { useInjection } from 'inversify-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field} from 'redux-form';
import { actionCreators, State } from '../../state';
import { renderHiddenField, renderInputField, renderSelectField } from '../formFields';
import IPlantRepository from '../../../domain/adapters/repositories/IPlantRepository';
import IGardenerPlantRepository from '../../../domain/adapters/repositories/IGardenerPlantRepository';
import { Link } from 'react-router-dom';



const UpdateGardenerPlantForm = ({handleSubmit}) => {
    
    const dispatch = useDispatch();
    const { fetchPlants, updateGardenerPlant} = bindActionCreators(actionCreators, dispatch);
    const gardenerPlantRepo = useInjection(IGardenerPlantRepository);
    // const plants = useSelector((state: State ) => state.plant.plants);
    const isLoading = useSelector((state: State ) => state.plant.isLoading);
    const plantRepo = useInjection(IPlantRepository);
    

    useEffect( () =>   {
        fetchPlants(plantRepo);
    }, []);

    const submit = async (values) => {


        const userIRI = "/api/users/" + values.userId;
        const plantIRI = "/api/plants/" + values.plantId;

        updateGardenerPlant(values.gardenerPlantId, {user:userIRI, plant:plantIRI, nickname: values.nickname, sunlight: values.sunlight, size: values.size, season: values.season, topography: values.topography, location: values.location, lastWateringDate: values.lastWateringDate}, gardenerPlantRepo)
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
                    
                    <Field name='gardenerPlantId' component={renderHiddenField} type='hidden' />
                    <Field name='nextWateringDate' component={renderHiddenField} type='hidden' />
                    <Field name='userId' component={renderHiddenField} type='hidden' />
                        <Field name='plantId' component={renderHiddenField} type='hidden' />
                    <Field name='nickname' component={renderInputField} label='Modifier le nom de votre plante' type='text'/>
                    <Field name='sunlight' component={renderSelectField} label="Définissez l'éclairage de la pièce ">
                        <option value='' children="Choisir une option" selected></option>
                        <option value='Ombragé' children='Ombragé'></option>
                        <option value='Lumineux' children='Lumineux'></option>
                        <option value='Très lumineux' children='Très lumineux'></option>
                    </Field>
                    <Field name='size' component={renderSelectField} label='Modifier la taille de votre plante'>
                        <option value='' children="Choisir une option" selected></option>
                        <option value='Petite' children='Petite'></option>
                        <option value='Moyenne' children='Moyenne'></option>
                        <option value='Grande' children='Grande'></option>
                    </Field>
                    <Field name='season' component={renderSelectField} label="Modifier la saison de l'année">
                        <option value='' children="Choisir une option" selected></option>
                        <option value='Printemps' children='Printemps'></option>
                        <option value='Eté' children='Eté'></option>
                        <option value='Automne' children='Automne'></option>
                        <option value='Hiver' children='Hiver'></option>
                    </Field>
                    <Field name='topography' component={renderSelectField} label='Modifier le relief de votre logement'>
                        <option value='' children="Choisir une option" selected></option>
                        <option value='Bord de mer' children='Bord de mer'></option>
                        <option value='Plaine' children='Plaine'></option>
                        <option value='Plateau' children='Plateau'></option>
                        <option value='Montagne' children='Montagne'></option>
                    </Field>
                    <Field name='location' component={renderSelectField} label='Ou se trouve votre plante ?'>
                        <option value='' children="Choisir une option" selected></option>
                        <option value='Intérieur' children='Intérieur'></option>
                        <option value='Extérieur' children='Extérieur'></option>
                    </Field>
                    <div className=' d-flex justify-content-center gap-5'>
                        <Link to={'/serre-virtuelle'} className="btn btn-success my-5 rounded">Retour</Link>
                        <button type="submit" className="btn btn-success my-5 rounded">Valider votre saisie</button>
                    </div>
                </form>)}
            </div>
        </div>
    );
}

export default reduxForm({
    
    form: 'update_gardener_plant',
    destroyOnUnmount: true,
    enableReinitialize:true
    
})(UpdateGardenerPlantForm)
    

