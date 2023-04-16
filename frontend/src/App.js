import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import { theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";

import Login from './pages/Login';
import Client from './pages/Client';
import Fi from './pages/Fi';
import NewClient from './pages/NewClient';

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
          <Route path='/fi' element={<Fi/>} />
          <Route path='/fi/newClient' element={<NewClient/>} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
