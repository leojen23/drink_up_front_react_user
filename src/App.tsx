import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {history} from './view/state/store';
import { useInjection } from 'inversify-react';
import IServiceRepository from './domain/adapters/repositories/IServiceRepository';
import Navbar from './view/components/Navbar';
import { ConnectedRouter} from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { actionCreators } from './view/state';
import { State } from './view/state/store';
import DashBoard from './view/pages/DashBoard';
import LandingPage from './view/pages/LandingPage';
import Footer from './view/components/footer';
import RegisterPage from './view/pages/RegisterPage';
import CataloguePage from './view/pages/CataloguePage';
import CreateGardenerPlant from './view/components/gardenerPlant/CreateGardenerPlant';
import CreateGardenerPlantPage from './view/pages/CreateGardenerPlantPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateGardenerPlantForm from './view/components/gardenerPlant/UpdateGardenerPlantForm';
import GardenerPlantPage from './view/pages/GardenerPlantPage';




function App() {
  const myCarousel = document.getElementById('olivier')
  console.log(myCarousel)

// myCarousel.addEventListener('slide.bs.carousel', function () {
//   // do something...
// })
 
  const serviceRepo = useInjection(IServiceRepository);

  //1 - Vérfiie le statut de connexion de l'utilisateur dans le state à l'ouverture de l'application
  const authenticationStatus: boolean = serviceRepo.isAuthenticated();
  console.log('authentifié au lancement application => ' + authenticationStatus)

   //2 - Vérfie si un token exite dans le local storage du  navigateur et s'il est valide !
  serviceRepo.setup();

  // 3 - Mise à jour du state en fonction du statut de connexion
  const dispatch = useDispatch();
  const { setIsAuthenticated} = bindActionCreators(actionCreators, dispatch);  
  // const state = useSelector((state: State) => state);

  // console.log((state));
  setIsAuthenticated(authenticationStatus);
  const isAuthenticated: boolean = useSelector((state: State) => state.login.isAuthenticated);
  


  return (  
    
      <ConnectedRouter history= {history}>
        <Navbar />
        <main className="App">
          <Switch>
            <Route path='/' exact component={LandingPage}/>
            <Route path='/catalogue' exact component={CataloguePage}/>
            <Route path='/enregistrement' exact component={RegisterPage}/>
            <Route path='/serre-virtuelle' render={props => {return isAuthenticated ?  <DashBoard /> : <Redirect to='/' />;}} />
            {/* <Route path='/utilisateur/enregistrement' render={props => {return isAuthenticated ?  <Create /> : <Redirect to='/' />;}} /> */}
            <Route path='/plantes/ajout' render={() => {return isAuthenticated ?  <CreateGardenerPlantPage /> : <Redirect to='/' />;}} />
            <Route path='/plantes/modification/:plantId' render={() => {return isAuthenticated ?  <GardenerPlantPage /> : <Redirect to='/' />;}} />
          </Switch>
        </main>
        <Footer/>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={2000}/>
      </ConnectedRouter>
    
  );
}

export default App;
