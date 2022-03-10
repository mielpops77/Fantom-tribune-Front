import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import LaunchDate from './pages/user/LaunchDate';
import Submit from './pages/user/Submit/Submit'
import Login from './components/Authentification/Login/Login.component';
import Register from './components/Authentification/Register/Register';
import Administration from './pages/admin/Administration';
import Welcome from "./components/Authentification/Welcome";
import Profile from "./components/Authentification/Profile";





const App = () => {
  return (
    <div>
      <Switch>
        <Route>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/launchDate" component={LaunchDate} />
          <Route path="/admin" component={Administration} />
          <Route path="/confirm/:confirmationCode" component={Welcome} />
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