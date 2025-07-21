import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CinesList = () => {
  const [cines, setCines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCines = async () => {
      try {
        const response = await api.get('/cines');
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
      await api.delete(`/cines/${id}`);
      setCines(prev => prev.filter(c => c.id !== id));
      setSuccessMessage('Cine eliminado exitosamente.');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data || err.message;

      if (
        typeof errorMsg === 'string' &&
        (errorMsg.toLowerCase().includes('asociado') || errorMsg.toLowerCase().includes('cartelera'))
      ) {
        alert('No se puede eliminar el cine porque está asociado a una cartelera.');
      } else {
        alert('Error al eliminar cine: ' + errorMsg);
      }
    }
  };

  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status"></div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger mt-3">Error: {error}</div>
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-light">Cines</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/cines/create')}
        >
          Agregar Cine
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center w-100" role="alert">
          {successMessage}
        </div>
      )}

      {cines.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered text-start w-100">
            <thead>
              <tr>
                <th className="text-center" style={{ width: '5%' }}>#</th>
                <th className="text-center" style={{ width: '25%' }}>Nombre</th>
                <th className="text-center" style={{ width: '35%' }}>Dirección</th>
                <th className="text-center" style={{ width: '20%' }}>Ciudad</th>
                <th className="text-center" style={{ width: '15%' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cines.map((cine) => (
                <tr key={cine.id}>
                  <td className="text-center">{cine.id}</td>
                  <td>{cine.nombre}</td>
                  <td>{cine.direccion}</td>
                  <td>{cine.ciudad}</td>
                  <td className="text-center">
                    <div className="d-flex flex-sm-row flex-column justify-content-center align-items-center">
                      <Link
                        to={`/cines/${cine.id}`}
                        className="btn btn-sm btn-outline-primary mb-2 mb-sm-0 me-sm-2"
                        title="Ver detalle"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>
                      <button
                        onClick={() => navigate(`/cines/edit/${cine.id}`)}
                        className="btn btn-sm btn-outline-warning mb-2 mb-sm-0 me-sm-2"
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
                    </div>
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
