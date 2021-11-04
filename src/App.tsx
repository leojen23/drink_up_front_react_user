import './App.css';
import LoginPage from './view/pages/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './view/state/store';
import {history} from './view/state/store';
import dashBoard from './view/pages/DashBoard';
import { useInjection } from 'inversify-react';
import IServiceRepository from './domain/adapters/repositories/IServiceRepository';
import Navbar from './view/components/Navbar';
import { ConnectedRouter,} from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { actionCreators } from './view/state';
import { State } from './view/state/reducers';
import DashBoard from './view/pages/DashBoard';





function App() {
 
  const serviceRepo = useInjection(IServiceRepository);

  //1 - Vérfiie le statut de connexion de l'utilisateur dans le state à l'ouverture de l'application
  const authenticationStatus = serviceRepo.isAuthenticated();
  console.log('authentifié au lancement application => ' + authenticationStatus)

   //2 - Vérfie si un token exite dans le local storage du  navigateur et s'il est valide !
  serviceRepo.setup();

  // 3 - Mise à jour du state en fonction du statut de connexion
  const dispatch = useDispatch();
  const { setIsAuthenticated} = bindActionCreators(actionCreators, dispatch);  
  setIsAuthenticated(authenticationStatus);

    const isAuthenticated: boolean = useSelector((state: State ) => state.user.isAuthenticated);
console.log('Etat du status de connexion dans state => ' + isAuthenticated)


  return (  
    
      <ConnectedRouter history= {history}>
        <Navbar/>
        <main className="App">
          <Switch>
            <Route path='/' exact component={LoginPage}/>
            <Route path='/dashboard' render={props => {
              return isAuthenticated ?  <DashBoard /> : <Redirect to='/' />;
            }}
            />
          </Switch>
        </main>
      </ConnectedRouter>
    
  );
}

export default App;
