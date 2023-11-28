import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import './Ganado.css'; // Archivo de estilos para Ganado

const Ganado = () => {
  const [animales, setAnimales] = useState([]);

  const getAnimales = async () => {
    try {
      const animalesCollection = collection(firestore, 'animales');
      const snapshot = await getDocs(animalesCollection);
      const animalesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnimales(animalesList);
    } catch (error) {
      console.error('Error al obtener animales:', error);
    }
  };

  useEffect(() => {
    getAnimales();
  }, []);

  return (
    <div className="ganado-container">
      <h1>Ganado</h1>
      <Link to="/registro-animal">
        <button className="registrar-button">Registrar</button>
      </Link>
      <h2>Lista de Animales</h2>
      <div className="animal-list">
        {animales.map(animal => (
          <Link key={animal.id} to={`/animal/${animal.id}`} className="animal-link">
            <div className="animal-card">
              <p><strong>UPP:</strong> {animal.UPP}</p>
              <p><strong>Status:</strong> {animal.status}</p>
              {/* Otros datos que desees mostrar */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ganado;
