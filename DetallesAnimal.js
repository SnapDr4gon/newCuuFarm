import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const DetallesAnimal = () => {
  const [animal, setAnimal] = useState(null);
  const { id } = useParams(); // Obtiene el parámetro ID de la URL

  useEffect(() => {
    const obtenerDetallesAnimal = async () => {
      try {
        const animalRef = doc(firestore, 'animales', id); // Referencia al documento del animal
        const animalDoc = await getDoc(animalRef);
        if (animalDoc.exists()) {
          setAnimal({ id: animalDoc.id, ...animalDoc.data() });
        } else {
          console.log('No se encontró el animal.');
        }
      } catch (error) {
        console.error('Error al obtener detalles del animal:', error);
      }
    };

    obtenerDetallesAnimal();
  }, [id]);

  return (
    <div>
      <h1>Detalles del Animal</h1>
      {/* eslint-disable-next-line */}
      {animal && (
        <div>
          <p><strong>UPP:</strong> {animal.UPP}</p>
          <p><strong>Status:</strong> {animal.status}</p>
          {/* Otros detalles del animal */}
        </div>
      )}
    </div>
  );
};

export default DetallesAnimal;
