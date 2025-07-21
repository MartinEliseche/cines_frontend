import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const FuncionCreate = () => {
  const [pelicula_id, setPeliculaId] = useState("");
  const [cine_id, setCineId] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [cines, setCines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peliculasRes, cinesRes] = await Promise.all([
          api.get("/peliculas"),
          api.get("/cines"),
        ]);
        setPeliculas(peliculasRes.data);
        setCines(cinesRes.data);
      } catch (err) {
        setError("Error al cargar datos: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pelicula_id || !cine_id) {
      alert("Debes seleccionar película y cine.");
      return;
    }

    try {
      await api.post("/pelicines", {
        pelicula_id: parseInt(pelicula_id),
        cine_id: parseInt(cine_id),
      });
      navigate("/cartelera");
    } catch (err) {
      alert("Error al crear función: " + (err.response?.data || err.message));
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  if (error)
    return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Crear Función</h2>
      <form
        onSubmit={handleSubmit}
        className="w-100 w-sm-75 w-md-50 mx-auto bg-dark p-4 rounded text-light border border-secondary"
      >
        <div className="mb-3">
          <label htmlFor="pelicula_id" className="form-label">
            Película
          </label>
          <select
            id="pelicula_id"
            className="form-select"
            value={pelicula_id}
            onChange={(e) => setPeliculaId(e.target.value)}
          >
            <option value="">Seleccionar película</option>
            {peliculas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="cine_id" className="form-label">
            Cine
          </label>
          <select
            id="cine_id"
            className="form-select"
            value={cine_id}
            onChange={(e) => setCineId(e.target.value)}
          >
            <option value="">Seleccionar cine</option>
            {cines.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/cartelera")}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Crear Función
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionCreate;
