
import { useInjection } from 'inversify-react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { actionCreators } from '../state';
import { State } from '../state/store';
import { SiWeightsandbiases } from "react-icons/si";
import {BrowserRouter as Router, Switch, Route, Redirect, NavLink, Link} from "react-router-dom";
import User from '../../domain/entities/user';
import { FaPagelines } from "react-icons/fa";


const Navbar = () => {
    
  
    const userRepo = useInjection(IUserRepository);
    const dispatch = useDispatch();
    const { logOut } = bindActionCreators(actionCreators, dispatch);
    const user: User = useSelector((state: State) => state.login.user);
    const isAuth: boolean = useSelector((state: State) => state.login.isAuthenticated);
    

    return(
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex flex-column align-items-center" to="/">
                        <span className="text-success"><SiWeightsandbiases size={45} /></span>
                        <small className="text-success fs-6">Drink up</small>
                    </Link>
                
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main-nav">
                        <ul className="navbar-nav me-auto">
                            {isAuth && <>
                            <li className="nav-item">
                                <Link className="nav-link " to="/serre-virtuelle">Ma serre virtuelle</Link>
                            </li>
                            </>}
                            <li className="nav-item" aria-current="page">
                                <Link className="nav-link "  to="/catalogue">Nos Plantes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Guide pratique</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Nous contacter</Link>
                            </li>

                        </ul>
                        {!isAuth && <>
                        <ul className=' navbar-nav ml-auto'>
                            <li className="nav-item">
                                <Link to="/#presentation-login" onClick={() => {}} className="btn btn-success rounded w-auto">Connexion</Link>
                            </li>
                        </ul>
                        </>}
                        {isAuth && <>
                        <div className="text-dark bg-light d-flex justify-content-center align-items-center p-2 border rounded-circle m-3">
                            <span className="text-dark fw-normal fs-3">{user.numberOfPlants}</span>
                            <span className="text-dark"><FaPagelines size={25} /></span>
                        </div>
                        <ul className=' navbar-nav ml-auto '>
                            <li className="nav-item">
                                <button onClick={() => {logOut(userRepo)}}className="btn btn-outline-success rounded w-auto">Deconnexion</button>
                            </li>
                        </ul>
                        </>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;