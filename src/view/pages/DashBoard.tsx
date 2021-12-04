
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




const DashBoard = () => {

    const dispatch = useDispatch();

    const {fetchUserData} = bindActionCreators(actionCreators, dispatch);

    const userRepo: IUserRepository = useInjection(IUserRepository);

    const userId: number | undefined = userRepo.getAuthenticatedUserId();
    const user: User = useSelector((state: State) => state.login.user);
    const isAuth: boolean = useSelector((state: State ) => state.login.isAuthenticated);
    const isLoading: boolean = useSelector((state: State ) => state.login.isLoading);
    const errorMsg: string | null  = useSelector((state: State ) => state.login.error);
    const plants: IGardenerPlant[] = user.gardenerPlants

    // console.log(userId)
    console.log(isLoading)
    useEffect( () =>   {
        fetchUserData(userId, userRepo)
    }, []);
    // console.log(plants)


    return (
        <div className='' id="dashboard">
            {isLoading ? (
            <div className ="d-flex justify-content-center align-items-center spinner">
                <div className="spinner-border text-success " role="status">
                    {/* <span className="visually-hidden">Chargement en cours ...</span> */}
                </div>
            </div>
                ) : (
            <div> {isAuth ? (
                <>
                <section className="hero container-fluid bg-dark  border-top border-light ">
                    <div className="row h-100  ">

                        <div className="col-6 bg-transparent hero-left py-5 text-light">
                            <div className="my-5 mx-5 text-light">
                                <h1 className="display-6 text-light">Bienvenue <br/>dans votre Serre Virtuelle</h1>
                                <p className="lead mt-5 fw-bold">{user.firstname}&nbsp;{user.surname}</p>
                                <p className="py-4">Depuis votre espace serre virtuelle, vous pouvez gérer l'arrosage de toutes vos plantes en un click !</p>
                            </div>
                            <div>
                                <a href="/plantes/ajout" className="btn btn-success rounded">Ajouter une plante</a>
                            </div>
                        </div>

                        <div className='col-6 hero-right '>
                        </div>
                    </div>
                </section>


                <section className="container stats py-5">
                    <div className="row">
                        <div className="col">
                            <div className="pb-5 d-flex justify-content-center align-items-center gap-4">
                                <span className="text-success"><BsFillEmojiWinkFill size={50} /></span>
                                <h2 className=" ">L'état de vos plantes en un clin d'oeil !</h2>    
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-6 d-flex justify-content-evenly align-items-center mb-3">
                            <div className="stat-item d-flex justify-content-center align-items-center">
                                <div className=" rounded-circle d-flex flex-column bg-dark border-success justify-content-center align-items-center shadow px-2 h-75 w-75">
                                    <p className="fw-bold text-success">Toutes mes plantes</p>
                                    <span className="fs-1 fw-bold text-success">{user.numberOfPlants}</span>
                                </div>
                            </div>
                            <div className="stat-item d-flex justify-content-center align-items-center">
                                <div className=" rounded-circle d-flex flex-column bg-success justify-content-center align-items-center shadow px-2 h-75 w-75">
                                    <p className="fw-bold text-light">Plantes assoifées</p>
                                    <span className="fs-1 fw-bold text-light">{user.numberOfPlants}</span>
                                </div>
                            </div>
                            <div className="stat-item d-flex justify-content-center align-items-center">
                                <div className=" rounded-circle d-flex flex-column bg-light justify-content-center align-items-center shadow px-2 h-75 w-75">
                                    <p className="fw-bold text-success">Plantes en péril</p>
                                    <span className="fs-1 fw-bold text-success">{user.numberOfPlants}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 px-4">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Plante</th>
                                    <th scope="col">date d'arrosage</th>
                                    <th scope="col">Arrosage</th>
                                   
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-active">
                                    <th scope="row">Active</th>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                    
                                    </tr>
                                    <tr>
                                    <th scope="row">Default</th>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                   
                                    </tr>
                                    <tr className="table-success">
                                    <th scope="row">Primary</th>
                                    <td>Column content</td>
                                    <td>Column content</td>
                                   
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </section>


                <section className="serre py-5 container-fluid" > 
                    <div className="container">
                        <div className="row">
                            <div className="pb-5 d-flex justify-content-center align-items-center gap-4 ">
                                <span className="text-white"><FaPagelines size={50} /></span>
                                <h2 className="text-white display-6 fw-bold ">Toutes les plantes de votre serre virtuelle</h2>    
                            </div>
                        </div>

                        {/* Affichage quand la serre virtuelle est vide  */}
                        { plants.length == 0 ? (
                            <div className =" row d-flex justify-content-center align-items-center">
                            <div className="col-6 border border-2 py-5 bg-light rounded ">
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
                        {plants.map((plant) => {
                        return <div className="col-3 rounded">
                                    <div key={plant.id} className="card border-0 shadow rounded" style={{maxWidth: '20rem'}}>

                                                <div className="card-header bg-dark d-flex justify-content-center rounded-top align-items-center  ">
                                                    <h5  className="text-light mb-0 py-2">{plant.nickname}</h5>
                                                </div>
                                            
                                                <img src={plant.image} className="card-img-top " alt="..." />

                                                <div className="card-body bg-dark py-2">
                                                    <div className="d-flex justify-content-around bg-transparent">
                                                        <button type="button" className="btn btn-success  bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Voir la plante">
                                                        <BsFillEyeFill size={25} className="text-light"/>
                                                        </button>
                                                        <button type="button" className="btn btn-success  bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Modifier les paramètres de ma plante">
                                                        <BsFillPencilFill size={25} className="text-light"/>
                                                        </button>
                                                        <button type="button" className="btn btn-success bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="*Supprimer la plante de ma serre virtuelle">
                                                        <BsFillTrashFill size={25} className="text-light"/>
                                                        </button>
                                                        <button type="button" className="btn btn-success  bg-transparent border-0" data-toggle="tooltip" data-placement="top" title="Arroser ma plante">
                                                        <BsFillDropletFill size={25} className="text-warning"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-footer d-flex justify-content-start bg-success ">
                                                    <small className="text-white fw-bold">Prochain arrosage le : <em>12/05/2022</em> </small>
                                                </div>
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


