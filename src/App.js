/* eslint-disable react/jsx-no-undef */
import ValidationForm from "./components/User/Formulaire/ValidationFormulaire.component";
import Register from './components/Authentification/Register/Register.component';
import TopTrending from './components/User/TopTrending/TopTrending.component';
import Giveaways from './components/User/Giveaways/Giveaways.component';
import Login from './components/Authentification/Login/Login.component';
import InfoCoin from "./components/User/InfoCoin/InfoCoin.component";
import Profile from "./components/Authentification/Profile/Profile";
import EditionCoin from "./components/Admin/Adminitration/Edition";
import Presales from './pages/user/Presales/Presales.component';
import Welcome from "./components/Authentification/Welcome";
import Administration from './pages/admin/Administration';
import Submit from './pages/user/Submit/Submit.component'
import AllTokens from "./pages/user/AllTokens/AllTokens";
import { Route, Routes } from 'react-router-dom';
import UpdateCoin from "./components/User/UpdateCoin/UpdateCoin.component";
import ApiConfig from './pages/admin/ApiConfig';
import React from 'react';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/confirm/:confirmationCode" element={<Welcome />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/ValidationForm" element={<ValidationForm />} />
        <Route path="/editionCoin/:id" element={<EditionCoin />} />
        <Route path="/topTrending" element={<TopTrending />} />
        <Route path="//infoCoin/:id" element={<InfoCoin />} />
        <Route path="/apiConfig/" element={<ApiConfig />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/presales" element={<Presales />} />
        <Route path="/coinDetail/" element={<Welcome />} />
        <Route path="/allTokens" element={<AllTokens />} />
        <Route path="/updateCoin" element={<UpdateCoin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div >
  );
};

export default App;