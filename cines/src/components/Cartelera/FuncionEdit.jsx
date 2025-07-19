import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const FuncionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [funcion, setFuncion] = useState({
    pelicula_id: '',
    cine_id: ''
  });

  const [peliculas, setPeliculas] = useState([]);
  const [cines, setCines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [funcionRes, peliculasRes, cinesRes] = await Promise.all([
          api.get(`/pelicines/${id}`),
          api.get("/peliculas"),
          api.get("/cines")
        ]);

        const funcionData = funcionRes.data;
        const peliculasData = peliculasRes.data;
        const cinesData = cinesRes.data;

        setPeliculas(peliculasData);
        setCines(cinesData);

        const peliculaEncontrada = peliculasData.find(p => p.titulo === funcionData.pelicula);
        const cineEncontrado = cinesData.find(c => c.nombre === funcionData.cine);

        setFuncion({
          pelicula_id: peliculaEncontrada?.id || '',
          cine_id: cineEncontrado?.id || ''
        });

      } catch (err) {
        setError("Error al cargar datos: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncion(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/pelicines/${id}`, {
        pelicula_id: funcion.pelicula_id,
        cine_id: funcion.cine_id
      });
      navigate(`/cartelera/${id}`);
    } catch (err) {
      alert("Error al guardar los cambios: " + err.message);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Editar Función</h2>
      <form className="w-50 mx-auto bg-dark p-4 rounded text-light border border-secondary" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="pelicula_id" className="form-label">Película</label>
          <select
            id="pelicula_id"
            name="pelicula_id"
            className="form-select"
            value={funcion.pelicula_id}
            onChange={handleChange}
          >
            <option value="">Seleccionar película</option>
            {peliculas.map(p => (
              <option key={p.id} value={p.id}>
                {p.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="cine_id" className="form-label">Cine</label>
          <select
            id="cine_id"
            name="cine_id"
            className="form-select"
            value={funcion.cine_id}
            onChange={handleChange}
          >
            <option value="">Seleccionar cine</option>
            {cines.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(`/cartelera/${id}`)}
          >
            <i className="bi bi-x-lg me-2"></i>Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => navigate(`/cartelera/${id}`)}
          >
            <i className="bi bi-save me-2"></i>Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionEdit;
