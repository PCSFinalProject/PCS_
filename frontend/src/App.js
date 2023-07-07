import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import { theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";

import Login from './pages/Login';
import Client from './pages/Client';
import Fi from './pages/Fi';
import Register from './pages/Register';
import NewClient from './pages/NewClient';
import ShipAgency from './pages/ShipAgency';
import CustomOfficer from './pages/CustomOfficer';
import TrafficDept from './pages/TrafficDept';
import CargoHandling from './pages/CargoHandling';

const customTheme = {
  ...theme
};

customTheme.colors.primary = "#0358d9ff";

function App() {
  return (
    <ThemeProvider theme={customTheme}>

        <Routes>
          <Route path='/*' element={<Login/>} />
          <Route path='/index' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/client' element={<Client/>} />
          <Route path='/shipAgency' element={<ShipAgency/>} />
          <Route path='/fi' element={<Fi/>} />
          <Route path='/customOfficer' element={<CustomOfficer/>} />
          <Route path='/fi/newClient' element={<NewClient/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/trafficDept' element={<TrafficDept/>} />
          <Route path= '/cargoHandling' element = {<CargoHandling/>} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
