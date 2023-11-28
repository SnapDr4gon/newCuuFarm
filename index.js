import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambio aquí a Routes en lugar de Switch
import Ganado from './Ganado';
import RegistroAnimal from './RegistroAnimal';
import DetallesAnimal from './DetallesAnimal';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Ganado />} />
      <Route path="/registro-animal" element={<RegistroAnimal />} />
      <Route path="/animal/:id" component={DetallesAnimal} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
