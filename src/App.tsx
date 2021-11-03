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
import { userInfo } from 'os';
import { setIsAuthenticated } from './view/state/action-creators';
import DashBoard from './view/pages/DashBoard';





function App() {
  //verifie si un token existe dans le local storage et s'il est toujours valide
  const serviceRepo = useInjection(IServiceRepository);
  const authenticationStatus = serviceRepo.isAuthenticated();

  serviceRepo.setup();
  console.log('etat de la connexion à ouverture application ' + authenticationStatus);
  const dispatch = useDispatch();
  const { signIn , updateInput, clearInput , setIsAuthenticated} = bindActionCreators(actionCreators, dispatch);  
  setIsAuthenticated(authenticationStatus);

const isAuthenticated: boolean = useSelector((state: State ) => state.user.isAuthenticated);
console.log('state ouverture application ' + isAuthenticated)


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
