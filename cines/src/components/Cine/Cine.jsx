import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Cine = () => {
  const { id } = useParams();
  const [cine, setCine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCine = async () => {
      try {
        const response = await api.get(`/api/cines/${id}`);
        setCine(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCine();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este cine?')) return;

    try {
      await api.delete(`/api/cines/${id}`);
      navigate('/cines');
    } catch (err) {
      alert('Error al eliminar cine: ' + err.message);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;
  if (!cine) return <div className="alert alert-warning mt-3">Cine no encontrado</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Detalle del Cine '{cine.nombre}'</h2>
      <div className="table-responsive d-flex justify-content-center">
        <table className="table table-dark table-bordered table-striped w-75 text-start">
          <thead>
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Dirección</th>
              <th className="text-center">Ciudad</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cine.nombre}</td>
              <td>{cine.direccion}</td>
              <td>{cine.ciudad}</td>
              <td className="text-center">
                <button
                  onClick={() => navigate(`/cines/edit/${cine.id}`)}
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

export default Cine;
