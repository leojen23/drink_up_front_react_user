
import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators} from '../state/index';
import  { $CombinedState, bindActionCreators } from 'redux';
import { State } from '../state/reducers';
import IPlantRepository from '../../domain/adapters/repositories/IPlantRepository';



const DashBoard = () => {

    const userRepo: IUserRepository = useInjection(IUserRepository);
    const plantRepo: IPlantRepository = useInjection(IPlantRepository)
    const userId: number | null = userRepo.getAuthenticatedUserId();
    
    // console.log(userId)
    useEffect(() =>  {
        if(userId){
            getUserData(userId, userRepo);
            console.log(plantRepo.getAllPlants())
        }
    }, []);
    
    const dispatch = useDispatch();
    const { getUserData } = bindActionCreators(actionCreators, dispatch);
    
    const user = useSelector((state: State) => state.user.user);
    const isAuth = useSelector((state: State) => state.user.isAuthenticated);
    //   console.log('dashboard page ' +  isAuth )
    // console.log(isAuth)
    //   console.log(user)
    
    return (
        <div className=''>
       
        {(isAuth && (
            <>
            <div className="d-flex ">

                <div className="w-50 z-depth-1-half">
                    <div className="my-5 mx-5">
                        <h1 className="display-6">Bienvenue <br/>dans votre Serre Virtuelle</h1>
                        <p className="lead mt-5 fw-bold">{user.firstname}&nbsp;{user.surname}</p>
                    </div>
                </div>

                <div className='w-50'  style={{ 
                backgroundImage: `url("https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',}}>
                </div>
            </div>

            <div className="d-flex justify-content-around py-5 container">
                <div className="card" style={{maxWidth: '20rem'}}>
                    <img src="https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-success">Go somewhere</a>
                    </div>
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