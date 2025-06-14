import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CinesList = () => {
  const [cines, setCines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCines = async () => {
      try {
        const response = await api.get('/api/cines');
        setCines(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este cine?')) return;

    try {
      await api.delete(`/api/cines/${id}`);
      setCines(cines.filter(cine => cine.id !== id));
    } catch (err) {
      alert('Error al eliminar cine: ' + err.message);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light text-center">Cines</h2>
      {cines.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered text-start">
            <thead>
              <tr>
                <th className="text-center" style={{width: '5%'}}>#</th>
                <th className="text-center" style={{width: '25%'}}>Nombre</th>
                <th className="text-center" style={{width: '35%'}}>Dirección</th>
                <th className="text-center" style={{width: '20%'}}>Ciudad</th>
                <th className="text-center" style={{width: '15%'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cines.map((cine, index) => (
                <tr key={cine.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{cine.nombre}</td>
                  <td>{cine.direccion}</td>
                  <td>{cine.ciudad}</td>
                  <td className='text-center'>
                    <Link to={`/cines/${cine.id}`} className="btn btn-sm btn-outline-primary me-2" title="Ver detalle">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <button
                      onClick={() => navigate(`/cines/edit/${cine.id}`)}
                      className="btn btn-sm btn-outline-warning me-2"
                      title="Editar"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(cine.id)}
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
        <div className="alert alert-info">No hay cines disponibles</div>
      )}
    </div>
  );
};

export default CinesList;
