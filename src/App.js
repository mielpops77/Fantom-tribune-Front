/* eslint-disable react/jsx-no-undef */
import EditionUtilisateurs from "./components/Admin/Adminitration/EditionUtilisateurs.components";
import ValidationForm from "./pages/user/ValidationFormulaire/ValidationFormulaire.page";
import Register from './components/Authentification/Register/Register.component';
import TopTrending from './components/User/TopTrending/TopTrending.component';
import EditionCoin from "./components/Admin/Adminitration/Edition.component";
import Administration from './pages/admin/Administration/Administration.page';
import Giveaways from './components/User/Giveaways/Giveaways.component';
import Login from './components/Authentification/Login/Login.component';
import InfoCoin from "./components/User/InfoCoin/InfoCoin.component";
import Profile from "./components/Authentification/Profile/Profile";
import UpdateCoin from "./pages/user/UpdateCoin/UpdateCoin.page";
import ApiConfig from './pages/admin/ApiConfig/ApiConfig.page';
import AllTokens from "./pages/user/AllTokens/AllTokens.page";
import Welcome from "./components/Authentification/Welcome";
import Presales from './pages/user/Presales/Presales.page';
import Submit from './pages/user/Submit/Submit.page';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/validationForm/:TypeFormulaire" element={<ValidationForm />} />
      <Route path="/editionUtilisateurs/:id" element={<EditionUtilisateurs />} />
        <Route path="/confirm/:confirmationCode" element={<Welcome />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/editionCoin/:id" element={<EditionCoin />} />
        <Route path="/topTrending" element={<TopTrending />} />
        <Route path="//infoCoin/:id" element={<InfoCoin />} />
        <Route path="/updateCoin" element={<UpdateCoin />} />
        <Route path="/apiConfig/" element={<ApiConfig />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/allTokens" element={<AllTokens />} />
        <Route path="/coinDetail/" element={<Welcome />} />
        <Route path="/presales" element={<Presales />} />
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