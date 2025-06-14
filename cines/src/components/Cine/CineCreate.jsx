import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CineCreate = () => {
  const navigate = useNavigate();
  const [cine, setCine] = useState({
    nombre: '',
    direccion: '',
    ciudad: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCine(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!cine.nombre.trim() || !cine.direccion.trim() || !cine.ciudad.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await api.post('/api/cines', {
        nombre: cine.nombre.trim(),
        direccion: cine.direccion.trim(),
        ciudad: cine.ciudad.trim()
      });
      navigate('/cines');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el cine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-light text-center mb-4">Crear Nuevo Cine</h2>
      <form
        className="w-50 mx-auto bg-dark p-4 rounded text-light border border-secondary"
        onSubmit={handleSubmit}
      >
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={cine.nombre}
            onChange={handleChange}
            disabled={loading}
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="form-control"
            value={cine.direccion}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            className="form-control"
            value={cine.ciudad}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate('/cines')}
            disabled={loading}
          >
            <i className="bi bi-x-lg me-2"></i>Cancelar
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            <i className="bi bi-plus-circle me-2"></i>
            {loading ? 'Creando...' : 'Crear Cine'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CineCreate;
