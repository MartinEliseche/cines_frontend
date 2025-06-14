import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Pelicula = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPelicula = async () => {
            try {
                const response = await api.get(`/api/peliculas/${id}`);
                setPelicula(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPelicula();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de eliminar esta película?')) return;

        try {
            await api.delete(`/api/peliculas/${id}`);
            navigate('/peliculas');
        } catch (err) {
            const errorMsg = err.response?.data || err.message;

            if (
                typeof errorMsg === 'string' &&
                (errorMsg.toLowerCase().includes('asociado') || errorMsg.toLowerCase().includes('cartelera'))
            ) {
                alert('No se puede eliminar la película porque está asociada a una cartelera.');
            } else {
                alert('Error al eliminar película: ' + errorMsg);
            }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
    if (error) return <div className="alert alert-danger mt-3">Error: {error}</div>;
    if (!pelicula) return <div className="alert alert-warning mt-3">Película no encontrada</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-light text-center mb-4">Detalle de la Película '{pelicula.titulo}'</h2>
            <div className="table-responsive d-flex justify-content-center">
                <table className="table table-dark table-bordered table-striped w-75 text-start">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30%' }}>Título</th>
                            <th className="text-center" style={{ width: '20%' }}>Género</th>
                            <th className="text-center" style={{ width: '10%' }}>Duración</th>
                            <th className="text-center" style={{ width: '10%' }}>Año</th>
                            <th className="text-center" style={{ width: '15%' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{pelicula.titulo}</td>
                            <td>{pelicula.genero}</td>
                            <td className="text-center">{pelicula.duracionMin}</td>
                            <td className="text-center">{pelicula.anio}</td>
                            <td className="text-center">
                                <button
                                    onClick={() => navigate(`/peliculas/edit/${pelicula.id}`)}
                                    className="btn btn-sm btn-outline-warning me-2"
                                    title="Editar"
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-sm btn-outline-danger"
                                    title="Eliminar"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pelicula;
