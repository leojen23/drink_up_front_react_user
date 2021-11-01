import logo from './logo.svg';
import './App.css';
import LoginPage from './view/pages/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' component={LoginPage}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;