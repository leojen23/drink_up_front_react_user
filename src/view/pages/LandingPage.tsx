

import { useInjection } from 'inversify-react';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import IPlantRepository from '../../domain/adapters/repositories/IPlantRepository';
import LoginForm from '../components/User/LoginForm'
import { actionCreators, State } from '../state';
import { BsPersonCircle, BsFlower2, BsClipboardData } from "react-icons/bs";
import { FaPagelines } from "react-icons/fa";
import Button from 'react-bootstrap/Button'
import ShowPlantModal from '../components/plant/showPlantModal';
import { Link } from 'react-router-dom';
import IUserRepository from '../../domain/adapters/repositories/IUserRepository';


const LandingPage = () => { 

    const dispatch = useDispatch();
    const { fetchPlants, setModal, fetchUserData} = bindActionCreators(actionCreators, dispatch);
    const plants = useSelector((state: State ) => state.plant.plants);
    const isLoading = useSelector((state: State ) => state.plant.isLoading);
    const isAuth: boolean = useSelector((state: State ) => state.login.isAuthenticated);
   
    
    const plantRepo = useInjection(IPlantRepository);
    const [modalShow, setModalShow] = useState(false);
    
    useEffect( () =>   {
        fetchPlants(plantRepo);
    }, []);
  
    return(
        <div id="landing-page" className="landing-page">

            <section className="hero d-flex justify-content-center py-4 py-md-5" >
                <div className="text-white row">
                    <div className='col-12'>
                        <h1 className="main-title my-5 text-white ">DRINK UP !</h1>
                        <p className="lead fw-normal mx-5">Vos plantes vous mennent la vie dure ? <br/> 
                        <span className="fw-bold text-success fs-2"> Drink up !</span> est l'application qu'il vous pour que vos plantes ne manquent plus jamais d'eau. <br/> 
                        Rejoignez-vous pour <span className="fw-bold text-success fs-2">une expérience unique</span>.... enfin presque !</p>
                        <div className="py-5 px-5 d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 gap-sm-5">
                            <Link to="/catalogue" className="btn fw-bold border-white btn-success rounded ">Découvrir nos plantes</Link>
                            <Link to="/enregistrement" className="btn fw-bold btn-outline-light rounded">Créer un compte</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="presentation-login section-padding bg-dark px-4 " id="presentation-login">
                <div className= {`row d-flex ${isAuth ? "mx-5" : ""}`}>
                    <div className= {`catalogue col-12 col-lg-8 h-auto ${isAuth ? " col-lg-12" : ""}`}>
                        <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-center justify-content-lg-between pb-4 pb-lg-2">
                            <h2 className="section-heading text-center d-flex text-sm-start text-light fw-light mb-4">Notre catalogue de plantes</h2>
                            <Link to="/catalogue" className="btn btn-outline-success  w-auto rounded mb-4">Toutes nos plantes</Link>
                        </div>

                        {isLoading ? (
                        <div className ="d-flex justify-content-center align-items-center mt-5">
                            <div className="d-flex flex-column align-items-center py-5">
                                <div className="spinner-border text-white mb-5  " role="status"></div>
                                <span className="visually text-light fs-4">Nous chargeons notre catalogue de plantes !</span>
                            </div>
                        </div>
                        ) : (

                        <Carousel>
                            {plants.map((plant) => {
                            return <Carousel.Item key={plant.id}>
                            <img className="rounded" src={plant.image} />
                            <Carousel.Caption>
                                <div className ="d-flex flex-column align-items-stretch justify-content-between">
                                    <div>
                                        <h3 className="py-5 display-3 fw-bold text-white">{plant.name}</h3>
                                        <p className="carousel-description mb-5 fw-normal">{plant.description}</p>
                                    </div>
                                    <div className="">
                                        <Button variant="primary" className="btn fw-bold border-white btn-success rounded w-auto"  onClick={() => {
                                            setModal(plant)
                                            setModalShow(true)} 
                                        } >Consulter</Button>

                                        {/* Modal de presentation de la plante  */}
                                        < ShowPlantModal show={modalShow} onHide={() => setModalShow(false)} />
                                    </div>
                                </div> 
                            </Carousel.Caption>
                        </Carousel.Item>})}
                            
                        </Carousel>)}                  
                    </div>
                    {!isAuth ? (
                    <div className="login-form col-12 col-lg-4 d-flex justify-content-center align-items-end px-4 px-lg-5">
                        <LoginForm  />
                    </div>
                    ) : (
                    <div className=""></div>
                    )
                }
                </div>
            </section>

            <section className="easy-steps py-5 px-4">
                
                <div className="row ">
                    <div className="col-12 h-auto mb-5">
                        <div className="d-flex flex-column flex-xl-row justify-content-center gap-3 align-items-center">
                            <h2 className="section-heading fw-normal">Créer votre serre virtuelle</h2>
                            <span className="fw-bold text-success py-2"><FaPagelines size={45} />...en toute simplicité !</span>
                        </div>
                        <Link to={'/enregistrement'} className="btn btn-success rounded mt-4">Je crée ma serre virtuelle</Link>
                    </div>
                </div>


                <div className="row procedure-cards py-3 ">
                    <div className="col-12 col-sm-4 col-xl-4 mb-5 d-flex justify-content-center">
                        <div className=" card rounded shadow" style={{maxWidth: "20rem"}}>
                            <div className="card-header bg-success fw-bold text-light py-2"><BsPersonCircle size={35} /></div>
                            <div className="card-body">
                                <h4 className="card-title">Je créer mon compte</h4>
                                <p className="card-text">La sécurité et la confidentialité de vos données sont notre priorité.<br/>
                                <a className="link-success" href="#" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-3 col-sm-4 mb-5  d-flex justify-content-center">
                        <div className=" card rounded shadow" style={{maxWidth: "20rem"}}>
                            <div className="card-header bg-success fw-bold text-light py-2"><BsFlower2 size={35} /></div>
                            <div className="card-body">
                                <h4 className="card-title">J'ajoute une plante</h4>
                                <p className="card-text">Vous pouvez ajouter facilement des plantes dans votre serre virtuelle en quelques clicks!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-3 col-sm-4 mb-5  d-flex justify-content-center">
                        <div className=" card rounded shadow" style={{maxWidth: "20rem"}}>
                            <div className="card-header bg-success fw-bold text-light py-2"><BsClipboardData size={35} /></div>
                            <div className="card-body">
                                <h4 className="card-title">Je gère mes plantes</h4>
                                <p className="card-text">Grâce à votre tableau de board vous pouvez facilement gérer les plantes de votre serre virtuelle</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage