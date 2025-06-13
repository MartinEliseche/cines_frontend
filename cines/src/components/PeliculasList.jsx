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
    <div className="container mt-4">
      <h2>Películas</h2>
      <div className="row">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{pelicula.titulo}</h5>
                <p className="card-text">{pelicula.genero}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PeliculasList;