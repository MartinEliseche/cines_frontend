import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const Pelicula = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState({
    titulo: '',
    genero: '',
    duracionMin: '',
    anio: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const response = await api.get(`/peliculas/${id}`);
        setPelicula(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPelicula();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelicula(prev => ({
      ...prev,
      [name]: ['duracionMin', 'anio'].includes(name) ? parseInt(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {};

    Object.keys(pelicula).forEach((key) => {
      const value = pelicula[key];
      if (
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value === 'number' && !isNaN(value))
      ) {
        dataToSend[key] = typeof value === 'string' ? value.trim() : value;
      }
    });

    try {
      await api.patch(`/peliculas/${id}`, dataToSend);
      navigate(`/peliculas/${id}`);
    } catch (err) {
      alert("Error al guardar los cambios: " + err.message);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Editar Película</h2>
      <form
        className="w-100 w-md-50 mx-auto bg-dark p-4 rounded text-light border border-secondary"
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
            onClick={() => navigate(`/peliculas/${id}`)}
          >
            <i className="bi bi-x-lg me-2"></i>Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-2"></i>Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pelicula;
