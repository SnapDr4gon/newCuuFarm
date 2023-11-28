import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from './firebase';
import './RegistroAnimal.css'; // Archivo de estilos para RegistroAnimal

const RegistroAnimal = () => {
  const [animalData, setAnimalData] = useState({
    foto: null,
    UPP: '',
    numeroArete: '',
    numeroFierro: '',
    raza: '',
    sexo: '',
    edad: '',
    peso: '',
    status: '',
    fotoDocumento: null,
    fotoPreview: null,
    fotoDocumentoPreview: null,
    fotoUrl:'',
    fotoDocumentoUrl:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleImageChange = (e, imageType) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAnimalData({
        ...animalData,
        [imageType]: reader.result,
      });
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const uploadImageToStorage = async (imageFile, imageType) => {
    const storageRef = ref(storage, `images/${imageType}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fotoURL = animalData.foto ? await uploadImageToStorage(animalData.foto, 'preview') : '';
      const fotoDocumentoURL = animalData.fotoDocumento ? await uploadImageToStorage(animalData.fotoDocumento, 'document') : '';
      console.log(fotoURL);
      console.log(fotoDocumentoURL);
      // Guardar los datos en Firestore
      const animalesCollection = collection(firestore, 'animales');
      await addDoc(animalesCollection, {
        foto: animalData.foto,
        UPP: animalData.UPP,
        numeroArete: animalData.numeroArete,
        numeroFierro: animalData.numeroFierro,
        raza: animalData.raza,
        sexo: animalData.sexo,
        edad: animalData.edad,
        peso: animalData.peso,
        status: animalData.status,
        fotoDocumento: animalData.fotoDocumento,
        fotoUrl: fotoURL,
        fotoDocumentoUrl: fotoDocumentoURL
      });

      console.log(animalData);
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  };

  return (
    <div className="registro-animal-container">
      <h1>Registro de Animal</h1>
      <form onSubmit={handleSubmit} className="animal-form">
        {/* Botón estilizado para cargar la foto */}
        <label className="custom-file-upload">
          <span>Seleccionar foto</span>
          <input type="file" onChange={(e) => handleImageChange(e, 'fotoPreview')} accept="image/*" />
        </label>
        {animalData.fotoPreview && (
          <img src={animalData.fotoPreview} alt="Foto seleccionada" className="preview-image" />
        )}

        {/* Botón estilizado para cargar el documento */}
        <label className="custom-file-upload">
          <span>Seleccionar documento</span>
          <input type="file" onChange={(e) => handleImageChange(e, 'fotoDocumentoPreview')} accept="image/*" />
        </label>
        {animalData.fotoDocumentoPreview && (
          <img src={animalData.fotoDocumentoPreview} alt="Foto del documento seleccionada" className="preview-image" />
        )}

        <input type="text" name="UPP" value={animalData.UPP} onChange={handleInputChange} placeholder="UPP" className="input-field" />
        <input type="text" name="numeroArete" value={animalData.numeroArete} onChange={handleInputChange} placeholder="Número de arete" className="input-field" />
        <input type="text" name="numeroFierro" value={animalData.numeroFierro} onChange={handleInputChange} placeholder="Número de fierro" className="input-field" />
        <input type="text" name="raza" value={animalData.raza} onChange={handleInputChange} placeholder="Raza" className="input-field" />
        <input type="text" name="sexo" value={animalData.sexo} onChange={handleInputChange} placeholder="Sexo" className="input-field" />
        <input type="text" name="edad" value={animalData.edad} onChange={handleInputChange} placeholder="Edad" className="input-field" />
        <input type="text" name="peso" value={animalData.peso} onChange={handleInputChange} placeholder="Peso" className="input-field" />
        <input type="text" name="status" value={animalData.status} onChange={handleInputChange} placeholder="Status" className="input-field" />

        <input type="submit" value="Registrar" className="submit-button" />
      </form>
    </div>
  );
};

export default RegistroAnimal;
