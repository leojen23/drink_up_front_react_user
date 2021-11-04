
import { useInjection } from 'inversify-react';
import React, { useEffect } from 'react';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators} from '../state/index';
import  { $CombinedState, bindActionCreators } from 'redux';
import { State } from '../state/reducers';



const DashBoard = () => {

    const userRepo: IUserRepository = useInjection(IUserRepository);
    const userId: number | null = userRepo.getAuthenticatedUserId();
    
     useEffect(() =>  {
            getUserData(userId, userRepo);
      }, []);
    
      
      const dispatch = useDispatch();
      const { getUserData } = bindActionCreators(actionCreators, dispatch);
      
      const user = useSelector((state: State) => state.user.user);
      const isAuth = useSelector((state: State) => state.user.isAuthenticated);
    //   console.log('dashboard page ' +  isAuth )
    //   console.log(user)
    
    return (
        <div>
        {(isAuth && (
            <>
            <h1>Dashboard</h1>
            <div className="">
                <h2>{user.firstname}</h2>
                <h2>{user.surname}</h2>
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