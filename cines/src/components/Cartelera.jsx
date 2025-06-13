import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Cartelera = () => {
  const [proyecciones, setProyecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProyecciones = async () => {
      try {
        const response = await api.get('/api/pelicines');
        setProyecciones(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching proyecciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProyecciones();
  }, []);

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger my-4">
      Error al cargar la cartelera: {error}
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🎥 Cartelera de Cines</h2>
      
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {proyecciones.map((proyeccion) => (
          <div key={proyeccion.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{proyeccion.pelicula}</h5>
                <p className="card-text">
                  <span className="badge bg-secondary me-2">Cine</span>
                  {proyeccion.cine}
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <small className="text-muted">
                  Disponible en este cine
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cartelera;