import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Cartelera = () => {
  const [proyecciones, setProyecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const fetchProyecciones = async () => {
    try {
      const response = await api.get('/api/pelicines');
      setProyecciones(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyecciones();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta función?')) return;

    try {
      await api.delete(`/api/pelicines/${id}`);
      setProyecciones(prev => prev.filter(p => p.id !== id));
      setSuccessMessage('Función eliminada exitosamente.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      alert('No se puede eliminar la función porque está en uso o no se encuentra.');
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-light">Cartelera</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/cartelera/create')}
        >
          Agregar Función
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center w-100" role="alert">
          {successMessage}
        </div>
      )}

      {proyecciones.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered text-start align-middle">
            <thead>
              <tr>
                <th className="text-center" style={{ width: '5%' }}>#</th>
                <th className="text-center" style={{ width: '45%' }}>Película</th>
                <th className="text-center" style={{ width: '35%' }}>Cine</th>
                <th className="text-center" style={{ width: '15%' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyecciones.map((p) => (
                <tr key={p.id}>
                  <td className="text-center">{p.id}</td>
                  <td>{p.pelicula}</td>
                  <td>{p.cine}</td>
                  <td className="text-center">
                    <button
                      onClick={() => navigate(`/cartelera/${p.id}`)}
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Ver detalle"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      onClick={() => navigate(`/cartelera/edit/${p.id}`)}
                      className="btn btn-sm btn-outline-warning me-2"
                      title="Editar"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
        <div className="alert alert-info text-center">No hay funciones disponibles</div>
      )}
    </div>
  );
};

export default Cartelera;
