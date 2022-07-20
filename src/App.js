import ValidationForm from "./components/User/Formulaire/ValidationFormulaire.component";
import Register from './components/Authentification/Register/Register.component';
import Login from './components/Authentification/Login/Login.component';
import LaunchDate from './pages/user/LaunchDate/LaunchDate.component';
import InfoCoin from "./components/User/InfoCoin/InfoCoin.component";
import Profile from "./components/Authentification/Profile/Profile";
import EditionCoin from "./components/Admin/Adminitration/Edition";
import Welcome from "./components/Authentification/Welcome";
import Administration from './pages/admin/Administration';
import Submit from './pages/user/Submit/Submit.component'
import { Switch, Route } from 'react-router-dom';
import Ecosystem from "./pages/user/Ecosystem";
import Home from './pages/home/Home';
import React from 'react';



const App = () => {
  return (
    <div>
      <Switch>
        <Route>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/launchDate" component={LaunchDate} />
          <Route path="/coinDetail/:" component={Welcome} />
          <Route path="/admin" component={Administration} />
          <Route path="/confirm/:confirmationCode" component={Welcome} />
          <Route path="/infoCoin/:id" component={InfoCoin} />
          <Route path="/editionCoin/:id" component={EditionCoin} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/submit" component={Submit} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Ecosystem" component={Ecosystem} />
          <Route path="/ValidationForm" component={ValidationForm} />



        </Route>
        </Switch>
    </div >
  );
};

export default App;