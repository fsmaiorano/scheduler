import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './pages/Main';

import './sass/main.scss';

const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

export default App;
