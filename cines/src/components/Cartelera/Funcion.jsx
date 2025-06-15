import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Funcion = () => {
  const { id } = useParams();
  const [funcion, setFuncion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFuncion = async () => {
      try {
        const response = await api.get(`/api/pelicines/${id}`);
        setFuncion(response.data);
      } catch (err) {
        setError('No se pudo cargar la función.');
      } finally {
        setLoading(false);
      }
    };

    fetchFuncion();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta función?')) return;

    try {
      await api.delete(`/api/pelicines/${id}`);
      navigate('/cartelera');
    } catch (err) {
      alert('Error al eliminar función: ' + (err.response?.data || err.message));
    }
  };

  if (loading) 
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status" />
      </div>
    );

  if (error) 
    return <div className="alert alert-danger mt-3">{error}</div>;

  if (!funcion) 
    return <div className="alert alert-warning mt-3">Función no encontrada</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Detalle de la Función #{funcion.id}</h2>
      <div className="table-responsive d-flex justify-content-center">
        <table className="table table-dark table-bordered table-striped w-75 text-start">
          <thead>
            <tr>
              <th className="text-center" style={{ width: '10%' }}>ID</th>
              <th className="text-center" style={{ width: '35%' }}>Película</th>
              <th className="text-center" style={{ width: '35%' }}>Cine</th>
              <th className="text-center" style={{ width: '15%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{funcion.id}</td>
              <td>{funcion.pelicula}</td>
              <td>{funcion.cine}</td>
              <td className="text-center">
                <button
                  onClick={() => navigate(`/cartelera/edit/${funcion.id}`)}
                  className="btn btn-sm btn-outline-warning me-2"
                  title="Editar"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-sm btn-outline-danger"
                  title="Eliminar"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funcion;
