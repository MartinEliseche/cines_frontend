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
      <h2 className="mb-4">Listado de Cines</h2>
      <div className="row">
        {cines.length > 0 ? (
          cines.map(cine => (
            <div key={cine.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{cine.nombre}</h5>
                  <p className="card-text">
                    <strong>Dirección:</strong> {cine.direccion}<br />
                    <strong>Ciudad:</strong> {cine.ciudad}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">No hay cines disponibles</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinesList;