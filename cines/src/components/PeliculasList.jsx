import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const PeliculasList = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    api.get('/api/peliculas')
      .then(response => setPeliculas(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-light mb-4 text-center">Películas</h2>
      {peliculas.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table table-dark table-striped table-bordered align-middle">
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th style={{ width: '45%' }}>Título</th>
                    <th style={{ width: '50%' }}>Género</th>
                  </tr>
                </thead>
                <tbody>
                  {peliculas.map((pelicula, index) => (
                    <tr key={pelicula.id}>
                      <td>{index + 1}</td>
                      <td>{pelicula.titulo}</td>
                      <td>{pelicula.genero}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center">No hay películas disponibles</div>
      )}
    </div>
  );
};
export default PeliculasList;