import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const PeliculaCreate = () => {
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState({
    titulo: '',
    genero: '',
    duracionMin: '',
    anio: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelicula(prev => ({
      ...prev,
      [name]: ['duracionMin', 'anio'].includes(name) ? parseInt(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const dataToSend = {};
    Object.entries(pelicula).forEach(([key, value]) => {
      if (
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value === 'number' && !isNaN(value))
      ) {
        dataToSend[key] = typeof value === 'string' ? value.trim() : value;
      }
    });

    try {
      const response = await api.post(`/api/peliculas`, dataToSend);
      const newId = response.data?.id;

      if (newId) {
        navigate(`/peliculas/${newId}`);
      } else {
        navigate('/peliculas'); 
      }
    } catch (err) {
      const errMsg = err.response?.data;
      if (typeof errMsg === 'object') {

        const messages = Object.values(errMsg).join(' | ');
        setError("Error de validación: " + messages);
      } else {
        setError("Error al crear la película: " + (errMsg || err.message));
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Crear Película</h2>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <form
        className="w-50 mx-auto bg-dark p-4 rounded text-light border border-secondary"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={pelicula.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Género</label>
          <input
            type="text"
            className="form-control"
            id="genero"
            name="genero"
            value={pelicula.genero}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duracionMin" className="form-label">Duración (minutos)</label>
          <input
            type="number"
            className="form-control"
            id="duracionMin"
            name="duracionMin"
            value={pelicula.duracionMin}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anio" className="form-label">Año</label>
          <input
            type="number"
            className="form-control"
            id="anio"
            name="anio"
            value={pelicula.anio}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate('/peliculas')}
          >
            <i className="bi bi-x-lg me-2"></i>Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Crear Película
          </button>
        </div>
      </form>
    </div>
  );
};

export default PeliculaCreate;
