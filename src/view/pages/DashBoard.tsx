
import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators} from '../state/index';
import  {bindActionCreators } from 'redux';


import IPlantRepository from '../../domain/adapters/repositories/IPlantRepository';
import { IGardenerPlant } from '../../domain/entities/GardenerPlant';
import {State} from '../state/store'



const DashBoard = () => {

    const userRepo: IUserRepository = useInjection(IUserRepository);
    const plantRepo: IPlantRepository = useInjection(IPlantRepository)
    const userId: number | null = userRepo.getAuthenticatedUserId();
    const dispatch = useDispatch();
    const { setUserData} = bindActionCreators(actionCreators, dispatch);
    // getUserData(userId, userRepo);
    // console.log(userId)
    // useEffect(() =>   {
    //     if(userId) {
    //         const user: any = userRepo.getUserData(userId);
    //         setUserData(user)
    //         // conole.log(plantRepo.getAllPlants())
    //     }
    // }, []);

    const user = useSelector((state: State) => state.login.user);
    const isAuth = useSelector((state: State ) => state.login.isAuthenticated);
    const isLoading = useSelector((state: State ) => state.login.isLoading);
    const errorMsg = useSelector((state: State ) => state.login.error);
    const plants: IGardenerPlant[] = user.gardenerPlants

    console.log(isLoading)
    return (
        
        <div className='' id="dashboard">
        {(isLoading &&(
            <>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </>
        ) )} ||

        {(isAuth && (
            <>
            <div className="d-flex hero">

                <div className="w-50 bg-transparent">
                    <div className="my-5 mx-5 ">
                        <h1 className="display-6">Bienvenue <br/>dans votre Serre Virtuelle</h1>
                        <p className="lead mt-5 fw-bold">{user.firstname}&nbsp;{user.surname}</p>
                        <p className="py-4">Depuis votre espace serre virtuelle, vous pouvez gérer l'arrosage de toutes vos plantes en un click !</p>
                    </div>
                    <div>
                        <a href="#" className="btn btn-success rounded">Ajouter une plante</a>
                    </div>
                </div>

                <div className='w-50'  style={{ 
                    backgroundImage: `url("https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',}}>
                </div>
            </div>

            <div className="container stats">
                <h2 className="py-5 ">Vos données en un clin d'oeil !</h2>
                <div className="d-flex justify-content-evenly mb-3">
                    
                        <div className="stat-item bg-success rounded-circle d-flex flex-column justify-content-center align-items-center shadow px-2 text-light">
                            <p className="fw-bold  text-light">Nombre de plantes adorées</p>
                            <span className="fs-1 fw-bold ">{user.numberOfPlants}</span>
                        </div>
                    
                   
                        <div className="stat-item bg-success rounded-circle d-flex flex-column justify-content-center align-items-center shadow px-2 text-light">
                            <p className="fw-bold  text-light">Nombre de plantes assoiffées</p>
                            <span className="fs-1 fw-bold ">{user.numberOfPlants}</span>
                        </div>
                  
                   
                        <div className="stat-item bg-success rounded-circle d-flex flex-column justify-content-center align-items-center shadow px-2 text-light">
                            <p className="fw-bold  text-light">Nombre de plantes en péril</p>
                            <span className="fs-1 fw-bold ">{user.numberOfPlants}</span>
                        </div>
                    
                </div>
            </div>

            <div className="serre py-5" > 
                <h2>Mes plantes</h2>
                <div className="d-flex justify-content-start py-5 container">
                    {plants.map((plant) => {
                    return <div>
                                <div className="card relative" style={{maxWidth: '20rem'}}>
                                    <h5  className="bg-dark text-light py-1">{plant.nickname}</h5>
                                    <img src={plant.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-success">Go somewhere</a>
                                    </div>
                                    <span className="text-dark">Prochaine date d'arrosage: 21/12/2021</span>
                                    <i className="bi bi-arrow-down-right-circle text-success">hello</i>
                                    
                                </div>
                            </div>
                        })}
                    </div>
                </div>
        
        </> 
        )) || (
        <h1>connexion</h1>
        )
    }
        </div>
    );
}

export default DashBoard;