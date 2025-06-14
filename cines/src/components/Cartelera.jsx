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
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-light">Cartelera</h2>

      {proyecciones.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-10">
            <table className="table table-bordered table-dark text-start align-middle">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '45%' }}>Película</th>
                  <th style={{ width: '50%' }}>Cine</th>
                </tr>
              </thead>
              <tbody>
                {proyecciones.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.pelicula}</td>
                    <td>{p.cine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center">No hay funciones disponibles</div>
      )}
    </div>
  );
};

export default Cartelera;
