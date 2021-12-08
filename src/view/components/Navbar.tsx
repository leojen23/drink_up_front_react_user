
import { useInjection } from 'inversify-react';
import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';
import { actionCreators } from '../state';
import { State } from '../state/store';
import { SiWeightsandbiases } from "react-icons/si";
import Nav from 'react-bootstrap/Nav'
import {BrowserRouter as Router, Switch, Route, Redirect, NavLink} from "react-router-dom";
import { toast } from 'react-toastify';


const Navbar = () => {
    
  
    const userRepo = useInjection(IUserRepository);
    const dispatch = useDispatch();
    const { logOut } = bindActionCreators(actionCreators, dispatch);
    const isAuth: boolean = useSelector((state: State) => state.login.isAuthenticated);
    

    return(
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex flex-column align-items-center" href="/">
                        <span className="text-success"><SiWeightsandbiases size={45} /></span>
                        <small className="text-success fs-6">Drink up</small>
                    </a>
                
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main-nav">
                        <ul className="navbar-nav me-auto">
                            {isAuth && <>
                            <li className="nav-item">
                            <a className="nav-link " href="/serre-virtuelle">Ma serre virtuelle</a>
                            </li>
                            </>}
                            <li className="nav-item" aria-current="page">
                            <a className="nav-link "  href="/catalogue">Nos Plantes</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Guide pratique</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Nous contacter</a>
                            </li>

                        </ul>
                        {!isAuth && <>
                        <ul className=' navbar-nav ml-auto'>
                            <li className="nav-item">
                                <a href="#presentation-login" onClick={() => {}} className="btn btn-success rounded">Connexion</a>
                            </li>
                        </ul>
                        </>}
                        {isAuth && <>
                        <ul className=' navbar-nav ml-auto'>
                            <li className="nav-item">
                                <button onClick={() => {logOut(userRepo)}}className="btn btn-outline-success">Deconnexion</button>
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