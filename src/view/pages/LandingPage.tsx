

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



const LandingPage = (props) => { 

    const dispatch = useDispatch();
    const { fetchPlants, setModal} = bindActionCreators(actionCreators, dispatch);

    const [modalShow, setModalShow] = useState(false);
    
    const plantRepo = useInjection(IPlantRepository);
    const plants = useSelector((state: State ) => state.plant.plants);
    const isLoading = useSelector((state: State ) => state.plant.isLoading);
    
    useEffect( () =>   {
        fetchPlants(plantRepo)
    }, []);
  
    return(
        <div id="landing-page" className="landing-page">

            <section className="d-flex justify-content-center align-items-center hero min-vh-100 h-auto" >
                <div className="text-white row">
                    <div className='col-12'>
                        <h1 className="main-title my-4 sm-mb-4 text-white f-6">DRINK UP !</h1>
                        <p className="lead mx-5">Vos plantes vous mennent la vie dure ? <br/> 
                        <span className="fw-bold text-success"> Drink up</span> est l'application qu'il vous pour que vos plantes ne manquent plus jamais d'eau. <br/> 
                        Rejoignez-vous pour <span className="fw-bold text-success fs-lg">une expérience unique</span>.... enfin presque !</p>
                        <div className="p-5 d-flex flex-column flex-sm-row justify-content-center gap-3 gap-sm-5">
                            <a href="/catalogue" className="btn fw-bold border-white btn-success rounded ">Découvrir nos plantes</a>
                            <a href="/enregistrement" className="btn fw-bold  btn-outline-light rounded">Créer un compte</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="presentation-login section-padding bg-dark px-4 mw-50" id="presentation-login">
                <div className="row d-flex justify-content-center ">
                    <div className="catalogue col-8 h-auto pb-4">

                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-4 ">
                            <h2 className="text-center text-sm-start text-light fw-light mb-4 mr-sm-5">Notre catalogue de plantes</h2>
                            <a href="/catalogue" className="btn  w-75 w-sm-100 btn-sm-sm  btn-outline-success rounded">Toutes nos plantes</a>
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
                                        <p className="carousel-description mb-5 fw-medium fs-6 fs-sm-4 ">{plant.description}</p>
                                    </div>
                                    <div className="">
                                        <Button variant="primary" className="btn fw-bold border-white btn-success rounded"  onClick={() => {
                                            // console.log(plant.name)
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
                    <div className="login-form col-12 col-sm-4 d-flex align-items-end">
                        <LoginForm  />
                    </div>
                </div>
            </section>

            <section className="easy-steps py-5 px-4">
                
                <div className="row ">
                    <div className="col-12 h-auto">
                        <div className="d-flex flex-column justify-content-center gap-3 align-items-center pb-5">
                            <h2 className="fw-normal">Créer votre serre virtuelle</h2>
                            <span className="fw-bold text-success py-2"><FaPagelines size={45} />...en toute simplicité !</span>
                        </div>
                        <Link to={'/enregistrement'} className="btn btn-success my-5 rounded">Je crée ma serre virtuelle</Link>
                        {/* <a href="#" className="btn fw-bold  btn-outline-success rounded mb-5">Je crée ma serre virtuelle</a> */}
                    </div>
                </div>


                <div className="row procedure-cards py-2 ">
                    
                    <div className="col-12 col-sm-4 mb-3  d-flex justify-content-center">
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
                    <div className="col-12 mb-3 col-sm-4 d-flex justify-content-center">
                        <div className=" card rounded shadow" style={{maxWidth: "20rem"}}>
                            <div className="card-header bg-success fw-bold text-light py-2"><BsFlower2 size={35} /></div>
                            <div className="card-body">
                                <h4 className="card-title">J'ajoute une plante</h4>
                                <p className="card-text">Vous pouvez ajouter facilement des plantes dans votre serre virtuelle en quelques clicks!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-3 col-sm-4 d-flex justify-content-center">
                        <div className=" card rounded shadow" style={{maxWidth: "20rem"}}>
                            <div className="card-header bg-success fw-bold text-light py-2"><BsClipboardData size={35} /></div>
                            <div className="card-body">
                                <h4 className="card-title">Je gère mes plantes</h4>
                                <p className="card-text">Grâce à votre tableau de board vous pouvez facilement gérer les plantes de votre serre virtuelle</p>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* </div> */}
                    
                        {/* <div className="col-4">
                            <img className="w-75" src="https://images.unsplash.com/photo-1566664981274-ef2008590fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="image d'une serre de jardin" />
                        </div> */}
                    {/* </div> */}

            </section>
        

        </div>
    )
}

export default LandingPage