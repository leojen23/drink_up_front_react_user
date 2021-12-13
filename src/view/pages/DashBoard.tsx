
import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators} from '../state/index';
import  {bindActionCreators } from 'redux';
import { IGardenerPlant } from '../../domain/entities/GardenerPlant';
import {State} from '../state/store'
import LoginForm from '../components/User/LoginForm';
import User from '../../domain/entities/user';
import {  BsFillEmojiWinkFill, BsFillEyeFill, BsFillTrashFill, BsFillPencilFill, BsFillDropletFill, BsEmojiWink} from "react-icons/bs";
import { FaPagelines } from "react-icons/fa";
import IGardenerPlantRepository from '../../domain/adapters/repositories/IGardenerPlantRepository';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Moment from 'moment';


const DashBoard = () => {

    const dispatch = useDispatch();
    const {fetchUserData, removeGardenerPlant, waterPlant} = bindActionCreators(actionCreators, dispatch);
    const userRepo: IUserRepository = useInjection(IUserRepository);
    const gardenerPlantRepo: IGardenerPlantRepository = useInjection(IGardenerPlantRepository);

    const userId: number | undefined = userRepo.getAuthenticatedUserId();
    const user: User = useSelector((state: State) => state.login.user);
    const isAuth: boolean = useSelector((state: State ) => state.login.isAuthenticated);
    const isLoading: boolean = useSelector((state: State ) => state.login.isLoading);
    const errorMsg: string | null  = useSelector((state: State ) => state.login.error);
    const gardenerPlants: IGardenerPlant[] = user.gardenerPlants
    const wateringDate: string = Moment().format('DD-MM-YYYY')


    useEffect( () =>   {
        fetchUserData(userId, userRepo)
    }, []);

    const confirmValidation = (gardenerPlant, userId) => {
        confirmAlert({
            title: 'Confirmation de suppression',
            message: 'Souhaitez-vous supprimer cette plante de votre serre virtuelle.',
            buttons: [
            {
                label: 'Oui',
                onClick: () =>  removeGardenerPlant(gardenerPlant.id, gardenerPlantRepo, userId )
            },
            {
                label: 'Non',
                onClick: () => {}
            }
            ]
        });
    };

    return (
        <div className='' id="dashboard">
            {isLoading ? (
            <div className ="d-flex justify-content-center align-items-center spinner ">
                <div className="spinner-border text-success " role="status"></div>
            </div>
                ) : (
            <div> {isAuth ? (
                <>
                <section className="hero container-fluid bg-dark border-top border-light ">
                    <div className="row">
                        <div className="col-12 col-xl-6 hero-left py-5  my-xl-5">
                            <div className="mx-5 text-light">
                                <h1 className="display-6 text-light">Bienvenue <br/>dans votre Serre Virtuelle</h1>
                                <p className="lead mt-5 fw-bold fs-3">{user.firstname}&nbsp;{user.surname}</p>
                                <p className="py-4 lead ">Depuis votre espace serre virtuelle, vous pouvez gérer l'arrosage de toutes vos plantes en un click !</p>
                            </div>
                            <div>
                                <a href="/plantes/ajout" className="btn btn-success rounded">Ajouter une plante</a>
                            </div>
                        </div>

                        <div className='hero-right col-12 d-none col-xl-6 d-xl-block '></div>
                    </div>
                </section>

                <section className="container stats py-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="pb-sm-5 d-flex flex-column flex-xl-row justify-content-center align-items-center gap-4">
                                <span className="text-success"><BsFillEmojiWinkFill size={50} /></span>
                                <h2 className=" ">L'état de vos plantes en un clin d'oeil !</h2>    
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-xl-6 d-flex flex-column flex-md-row justify-content-evenly align-items-center mb-3 mb-md-5">
                            <div className="stat-item d-flex justify-content-center align-items-center">
                                <div className=" rounded-circle d-flex flex-column border border-2 border-success justify-content-center align-items-center  px-2 h-75 w-75">
                                    <p className="fw-bold text-success">Plantes<br/> arrosées</p>
                                    <span className="fs-1 fw-bold text-success">{user.numberOfUpToDateWaterings}</span>
                                </div>
                            </div>
                            <div className="stat-item d-flex justify-content-center align-items-center">
                                <div className=" rounded-circle d-flex flex-column border border-2 border-warning justify-content-center align-items-center  px-2 h-75 w-75">
                                    <p className="fw-bold text-warning">Plantes assoifées</p>
                                    <span className="fs-1 fw-bold text-warning">{user.numberOfOnDayWaterings}</span>
                                </div>
                            </div>
                            <div className="stat-item d-flex justify-content-center align-items-center">
                                <div className=" rounded-circle d-flex flex-column border border-2 border-danger  justify-content-center align-items-center  px-2 h-75 w-75">
                                    <p className="fw-bold text-danger">Plantes<br/> en péril</p>
                                    <span className="fs-1 fw-bold text-danger">{user.numberOfLateWaterings}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6 px-4 d-none d-md-block">
                            <table className="table">
                                <thead className="bg-dark ">
                                    <tr className='text-white'>
                                        <th scope="col">Plante</th>
                                        <th scope="col">Arrosage prévu</th>
                                        <th scope="col">Arroser</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {gardenerPlants.map((gardenerPlant) => {
                                    
                                     if(gardenerPlant.wateringStatus == 3) {
                                         return  <tr key={gardenerPlant.id} className="">
                                         <th scope="row">{gardenerPlant.nickname}</th>
                                         <td className=" fw-normal">{gardenerPlant.nextWateringDate}</td>
                                         <button onClick={() => waterPlant(gardenerPlant, userRepo, wateringDate)} type="button" className="btn btn-error bg-transparent border-0 mt-3" data-toggle="tooltip" data-placement="top" title="Arroser ma plante">
                                        <BsFillDropletFill size={25} className="text-danger"/>
                                        </button>
                                     </tr>
                                     } else if(gardenerPlant.wateringStatus == 2) {
                                        return  <tr key={gardenerPlant.id} className="">
                                        <th scope="row">{gardenerPlant.nickname}</th>
                                        <td className=" fw-normal">{gardenerPlant.nextWateringDate}</td>
                                        <button onClick={() => waterPlant(gardenerPlant, userRepo, wateringDate)} type="button" className="btn btn-error bg-transparent border-0 mt-3" data-toggle="tooltip" data-placement="top" title="Arroser ma plante">
                                       <BsFillDropletFill size={25} className="text-warning"/>
                                       </button>
                                    </tr>
                                    } 
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </section>


                <section className="serre py-5 container-fluid" > 
                    <div className="container">
                        <div className="row">
                            <div className=" col-12 pb-5 d-flex flex-column flex-xl-row justify-content-center align-items-center gap-4 ">
                                <span className="text-white"><FaPagelines size={50} /></span>
                                <h2 className="text-white display-6 fw-bold ">Toutes les plantes de votre serre virtuelle</h2>    
                            </div>
                        </div>

                        {/* Affichage quand la serre virtuelle est vide  */}
                        { gardenerPlants.length == 0 ? (
                            <div className =" row d-flex justify-content-center align-items-center">
                            <div className="col-12 border border-2 py-5 bg-light rounded ">
                                <div className="mb-4">
                                    <p className="text-dark fw-bolder  fs-3 mx-5">Votre serre virtuelle est actuellement vide ! </p>
                                    <span className="text-success"><BsEmojiWink size={50} /></span>
                                </div>
                                <div>
                                    <a href="/plantes/ajout" className="btn btn-success rounded">Ajouter une plante</a>
                                </div>
                            </div>
                        </div>) : 

                        // Affichage lorsque la serre virtuelle contient au moins une plante
                        (<div className="row">
                        {gardenerPlants.map((gardenerPlant) => {
                            return <div className="col-12 col-md-6 col-xl-3 d-flex justify-content-center rounded mb-3 mb-lg-5 mb-xl-3">
                                        <div key={gardenerPlant.id} className="card border-0 shadow rounded" style={{maxWidth: '20rem'}}>

                                            <div className="card-header bg-dark d-flex justify-content-center rounded-top align-items-center  ">
                                                <h5  className="text-light mb-0 py-2">{gardenerPlant.nickname}</h5>
                                            </div>
                                            <div className="position-relative">
                                                <span className="badge bg-success position-absolute bottom-0 end-0 ">{gardenerPlant.cataloguePlantName}</span>
                                                <img src={gardenerPlant.image} className="card-img-top " alt="..." />
                                            </div>
                                        

                                            <div className="card-body bg-dark py-2">
                                                <div className="d-flex justify-content-around align-items-center bg-transparent">
                                                    <Link to={'#'} className="btn btn-success  bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Voir la plante">
                                                        <BsFillEyeFill size={25} className="text-light"/>
                                                    </Link>
                                                    <Link to={`/plantes/modification/${gardenerPlant.id}`} className="btn btn-success  bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Modifier les paramètres de ma plante">
                                                        <BsFillPencilFill size={25} className="text-light"/>
                                                    </Link>
                                                    <button onClick={() => confirmValidation(gardenerPlant, userId)}type="button" className="btn btn-success bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="*Supprimer la plante de ma serre virtuelle">
                                                    <BsFillTrashFill size={25} className="text-light"/>
                                                    </button>

                                                    {gardenerPlant.wateringStatus == 1 ? 
                                                        <div className="bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Je n'ai pas soif !">
                                                        <BsFillDropletFill size={25} className="text-success"/>
                                                        </div> 
                                                    : gardenerPlant.wateringStatus == 2 ? 
                                                        <button onClick={() => waterPlant(gardenerPlant, userRepo, wateringDate)} type="button" className="btn btn-error bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Arroser ma plante">
                                                        <BsFillDropletFill size={25} className="text-warning"/>
                                                        </button>
                                                        : 
                                                        <button onClick={() => waterPlant(gardenerPlant, userRepo, wateringDate)} type="button" className="btn btn-error bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Arroser ma plante">
                                                        <BsFillDropletFill size={25} className="text-danger"/>
                                                        </button> }
                                                </div>
                                            </div>
                                            {gardenerPlant.wateringStatus == 1 ?
                                            <div className="card-footer d-flex justify-content-center bg-success">
                                                <small className="text-white fw-bold">Prochain arrosage le : <em>{gardenerPlant.nextWateringDate}</em> </small>
                                            </div>
                                            : gardenerPlant.wateringStatus == 2 ?
                                            <div className="card-footer d-flex justify-content-center  bg-warning">
                                                <small className="text-white fw-bold">C'est mon jour d'arrosage !</small>
                                            </div>
                                            :
                                            <div className="card-footer d-flex justify-content-center bg-danger">
                                                {gardenerPlant.numberOfLateDays == 1 ? 
                                                <small className="text-white fw-bold">Vous avez {gardenerPlant.numberOfLateDays} jour de retard</small>
                                                :
                                                <small className="text-white fw-bold">Vous avez {gardenerPlant.numberOfLateDays} jours de retard</small>
                                                }
                                                </div>
                                            }

                                        </div>
                                    </div>
                                })}
                        </div>)}
                    </div>
                </section>
                </>
                ) : (
                <LoginForm />
                )}
            </div>
        )}    
    </div>   
    );
}

export default DashBoard;


