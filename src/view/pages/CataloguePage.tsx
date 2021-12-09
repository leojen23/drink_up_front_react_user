
import { useInjection } from 'inversify-react';

import Pagination from '../components/Pagination';
import IPlantRepository from '../../domain/adapters/repositories/IPlantRepository';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';
import { useCallback, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { BsFillSunFill, BsFillHeartFill, BsFillHandThumbsUpFill, BsInfoCircleFill, BsFillPlusCircleFill} from "react-icons/bs";
import { IPlant } from '../../domain/entities/Plant';
import GardenerPlant from '../../domain/entities/GardenerPlant';



const CataloguePage = (props) => {

    
    const dispatch = useDispatch();
    const { fetchPlants, setCurrentPage} = bindActionCreators(actionCreators, dispatch);
    

    const plantRepo = useInjection(IPlantRepository);
    const plants: IPlant[] = useSelector((state: State ) => state.plant.plants);
    const isLoading: boolean = useSelector((state: State ) => state.plant.isLoading);
    const currentPage: number = useSelector((state: State ) => state.pagination.currentPage);

    useEffect(() =>   {
        fetchPlants(plantRepo)
    }, []);

    // on définit le nombre d'item par page dans notre pagination
    const itemsPerPage: number = 3;
    //on prépare le tableau pour l'affichage de la pagination
    const paginatedPlants : IPlant[] = Pagination.getData(plants, currentPage, itemsPerPage);

    if (isLoading) {
        return <div className ="d-flex justify-content-center align-items-center spinner">
                    <div className="spinner-border text-success " role="status">
                        <span className="visually-hidden">Nous chargeons notre catalogue</span>
                    </div>
                </div>
        } else {
        return  <section className='bg-transparent p-5 container' id="catalogue-page" >
        <header>
            <h1 className="pb-5">Notre catalogue de plantes</h1>
        </header>
        <div className="row">
            <div className="col-8">
                <ul className="plant-list gap-2">
                {paginatedPlants.map((plant) => 
                    <li className="card mb-4">
                        <div className="row  ">
                            <div className="col-md-4">
                                <img src={plant.image} className="card-img" alt="..." />
                            </div> 
                            <div className="col-md-8">
                                <div className="card-body relative ">
                                    <div className="">
                                        <h4 className="card-title mb-4">{plant.name}</h4>
                                         <p className="card-text">{plant.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Accordion flush>
                                <Accordion.Item eventKey={plant.id.toString()}>
                                    <Accordion.Header >Informations & Conseils</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex flex-column justify-content-start align-items-start">
                                            <div className="d-flex justify-content-start align-items-start gap-3 pb-2">
                                                <span className="text-success"><BsFillHandThumbsUpFill size={20}/></span>
                                                <span className="fw-bold fs-5 text-dark">Description</span>
                                            </div>
                                            <p className="fs-5 text-start">{plant.description}</p>  
                                        </div>
                                        <div className="d-flex flex-column justify-content-start align-items-start">
                                            <div className="d-flex justify-content-start align-items-start gap-3 pb-2">
                                                <span className="text-success"><BsFillSunFill size={20}/></span>
                                                <span className="fw-bold fs-5 text-dark">Exposition</span>
                                            </div>
                                            <p className="fs-5 text-start">{plant.exposition}</p>  
                                        </div>
                                        <div className="d-flex flex-column justify-content-start align-items-start">
                                            <div className="d-flex justify-content-start align-items-start gap-3 pb-2">
                                                <span className="text-success"><BsFillHeartFill size={20}/></span>
                                                <span className="fw-bold fs-5 text-dark">Entretien</span>
                                            </div>
                                            <p className="fs-5 text-start">{plant.care}</p>  
                                        </div>
                                        <div className="d-flex flex-column justify-content-start align-items-start">
                                            <div className="d-flex justify-content-start align-items-start gap-3 pb-2">
                                                <span className="text-success"><BsInfoCircleFill size={20}/></span>
                                                <span className="fw-bold fs-5 text-dark">Toxicité</span>
                                            </div>
                                            <p className="fs-5 text-start ">{plant.toxicity}</p>  
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                    </li>
                    )}
                </ul>
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={plants.length} onPageChange={setCurrentPage}/> 
            </div>
            <div className="col-4 catalogue-ad display-3 text-white pt-5">Des plantes des plantes et encore des plantes !</div>
        </div>
    </section>
    }
                    
}

export default CataloguePage;



