import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import LaunchDate from './pages/user/LaunchDate/LaunchDate.component';
import Submit from './pages/user/Submit/Submit.component'
import Login from './components/Authentification/Login/Login.component';
import Register from './components/Authentification/Register/Register.component';
import Administration from './pages/admin/Administration';
import Welcome from "./components/Authentification/Welcome";
import Profile from "./components/Authentification/Profile/Profile";
import InfoCoin from "./components/User/InfoCoin/InfoCoin.component";
import EditionCoin from "./components/Admin/Adminitration/Edition";






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

        </Route>
        </Switch>
    </div >
  );
};

export default App;