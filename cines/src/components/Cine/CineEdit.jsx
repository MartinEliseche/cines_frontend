import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const CineEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cine, setCine] = useState({
        nombre: '',
        direccion: '',
        ciudad: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCine = async () => {
            try {
                const response = await api.get(`/cines/${id}`);
                setCine(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCine();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCine(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {};

        Object.keys(cine).forEach((key) => {
            const value = cine[key];
            if (
                (typeof value === 'string' && value.trim() !== '') ||
                (typeof value === 'number' && !isNaN(value))
            ) {
                dataToSend[key] = typeof value === 'string' ? value.trim() : value;
            }
        });

        try {
            await api.patch(`/cines/${id}`, dataToSend);
            navigate(`/cines/${id}`);
        } catch (err) {
            alert("Error al guardar los cambios: " + err.message);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
    if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-light text-center mb-4">Editar Cine</h2>
            <form className="w-50 mx-auto bg-dark p-4 rounded text-light border border-secondary" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={cine.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        value={cine.direccion}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ciudad"
                        name="ciudad"
                        value={cine.ciudad}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => navigate(`/cines/${id}`)}
                    >
                        <i className="bi bi-x-lg me-2"></i>Cancelar
                    </button>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-save me-2"></i>Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CineEdit;
