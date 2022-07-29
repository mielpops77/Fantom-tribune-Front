import ValidationForm from "./components/User/Formulaire/ValidationFormulaire.component";
import Register from './components/Authentification/Register/Register.component';
import Login from './components/Authentification/Login/Login.component';
import LaunchDate from './pages/user/LaunchDate/LaunchDate.component';
import InfoCoin from "./components/User/InfoCoin/InfoCoin.component";
import Profile from "./components/Authentification/Profile/Profile";
import EditionCoin from "./components/Admin/Adminitration/Edition";
import Welcome from "./components/Authentification/Welcome";
import Administration from './pages/admin/Administration';
import ApiConfig from './pages/admin/ApiConfig';
import Submit from './pages/user/Submit/Submit.component'
import { Switch, Route } from 'react-router-dom';
import Ecosystem from "./pages/user/Ecosystem";
import React from 'react';
import Home from './Home';



const App = () => {
  return (
    <div>
      <Switch>
        <Route>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/confirm/:confirmationCode" component={Welcome} />
          <Route path="/ValidationForm" component={ValidationForm} />
          <Route path="/editionCoin/:id" component={EditionCoin} />
          <Route path="/launchDate" component={LaunchDate} />
          <Route path="/infoCoin/:id" component={InfoCoin} />
          <Route path="/coinDetail/:" component={Welcome} />
          <Route path="/apiConfig" component={ApiConfig} />
          <Route path="/administration" component={Administration} />
          <Route path="/Ecosystem" component={Ecosystem} />
          <Route path="/register" component={Register} />
          <Route path="/Profile" component={Profile} />
          <Route path="/submit" component={Submit} />
          <Route path="/login" component={Login} />
        </Route>
        </Switch>
    </div >
  );
};

export default App;