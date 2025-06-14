import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const PeliculasList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await api.get('/api/peliculas');
        setPeliculas(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta película?')) return;

    try {
      await api.delete(`/api/peliculas/${id}`);
      setPeliculas(prev => prev.filter(p => p.id !== id));
      setSuccessMessage('Película eliminada exitosamente.');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data || err.message;
      alert('No se puede eliminar la pelicula porque ya está asociada a una cartelera.');
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-light">Películas</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/peliculas/create')}
        >
          Agregar Película
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center w-100" role="alert">
          {successMessage}
        </div>
      )}

      {peliculas.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered text-start align-middle">
            <thead>
              <tr>
                <th className="text-center" style={{ width: '5%' }}>#</th>
                <th className="text-center" style={{ width: '30%' }}>Título</th>
                <th className="text-center" style={{ width: '25%' }}>Género</th>
                <th className="text-center" style={{ width: '10%' }}>Duración</th>
                <th className="text-center" style={{ width: '10%' }}>Año</th>
                <th className="text-center" style={{ width: '15%' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peliculas.map((pelicula, index) => (
                <tr key={pelicula.id}>
                  <td className="text-center">{pelicula.id}</td>
                  <td>{pelicula.titulo}</td>
                  <td>{pelicula.genero}</td>
                  <td className="text-center">{pelicula.duracionMin}</td>
                  <td className="text-center">{pelicula.anio}</td>
                  <td className="text-center">
                    <button
                      onClick={() => navigate(`/peliculas/${pelicula.id}`)}
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Ver detalle"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      onClick={() => navigate(`/peliculas/edit/${pelicula.id}`)}
                      className="btn btn-sm btn-outline-warning me-2"
                      title="Editar"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(pelicula.id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Eliminar"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">No hay películas disponibles</div>
      )}
    </div>
  );
};

export default PeliculasList;
