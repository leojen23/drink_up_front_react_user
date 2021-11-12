
import { useInjection } from 'inversify-react';
import { useCallback, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import PlantRepositoryImpl from '../../application/PlantRepositoryImpl';
import IPlantRepository from '../../domain/adapters/repositories/IPlantRepository';
import Plant from '../../domain/entities/Plant';
import LoginForm from '../components/User/LoginForm'


const LandingPage = (props) => { 

    
    // const plants: Plant[] = await ==plantRepo.getAllPlants();
    const plantRepo = useInjection(IPlantRepository);
    const fetchPlants = useCallback( async () => {
            const plants: Plant[] | undefined = await plantRepo.getAllPlants();
            // console.log(plants)
            return plants;
    }, []);

    

    useEffect( () =>   {
        // const fetchPlants = async () => {
        //     const plants: Plant[] | undefined = await plantRepo.getAllPlants();
        // }
        fetchPlants()
        // .catch(console.error)
    }, [fetchPlants]);


 
    const getthePlants = async () => {
        const plants: Plant[] | undefined = await plantRepo.getAllPlants();
        return plants
    }
    const plants = fetchPlants();
    console.log (plants)

    return(
        <div>
        <section className="d-flex justify-content-center align-items-center " id="landing-page">
            <div className="w-50 text-white ">
                <h1 className="main-title">DRINK UP !</h1>
                <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                <p className="lead">
                    <div className="py-5 d-flex justify-content-evenly">
                     <a href="#" className="btn fw-bold border-white btn-success rounded ">Découvrir !</a>
                     <a href="#" className="btn fw-bold border-white btn-success rounded">Créer un compte</a>
                    </div>
                </p>
            </div>
        </section>

        <section className="display">
            <div className="row">
                <div className="catalogue col-8 bg-success">

               
                 <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                                <div className ="py-5">

                            <h3 className="py-2">First slide label</h3>
                            <p className="mb-5">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            <a href="#" className="btn fw-bold border-white btn-success rounded">Consulter</a>
                                </div>
                                    
                            </Carousel.Caption>
                        </Carousel.Item>
                
                        
                    </Carousel>
                </div>
                <div className="login-form col-4 b">

                    <LoginForm />


                </div>
           
            </div>

        </section>
        
        </div>
    )
}

export default LandingPage