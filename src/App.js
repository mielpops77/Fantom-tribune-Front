import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import LaunchDate from './pages/user/LaunchDate';
import Submit from './pages/user/Submit';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Administration from './pages/admin/Administration';
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";





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
          <Route path="/Register" component={Register} />
          <Route path="/submit" component={Submit} />
          <Route path="/Profile" component={Profile} />

        </Route>
        </Switch>
    </div >
  );
};

export default App;