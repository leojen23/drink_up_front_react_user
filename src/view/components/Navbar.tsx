
import { useInjection } from 'inversify-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { actionCreators } from '../state';
import { State } from '../state/reducers';


const Navbar = () => {
    
    const userRepo = useInjection(IUserRepository);

    const dispatch = useDispatch();
    const { signOut } = bindActionCreators(actionCreators, dispatch);
    const isAuth: boolean = useSelector((state: State) => state.user.isAuthenticated);

    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Drink Up !</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Nos Plantes</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Nous contacter</a>
                        </li>
                    </ul>
                    {isAuth && <>
                    <ul className=' navbar-nav ml-auto'>
                        <li className="nav-item">
                            <button onClick={() => signOut(userRepo)} className="btn btn-success">Deconnexion</button>
                        </li>
                    </ul>
                    </>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;