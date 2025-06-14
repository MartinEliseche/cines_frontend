import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const CinesList = () => {
  const [cines, setCines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCines = async () => {
      try {
        const response = await api.get('/api/cines');
        setCines(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching cines:', err);
      }
    };

    fetchCines();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light text-center">Cines</h2>
      {cines.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {cines.map((cine, index) => (
                <tr key={cine.id}>
                  <td>{index + 1}</td>
                  <td>{cine.nombre}</td>
                  <td>{cine.direccion}</td>
                  <td>{cine.ciudad}</td>
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