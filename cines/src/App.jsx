import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import CinesList from './components/Cine/CinesList';
import Cine from './components/Cine/Cine';
import CineEdit from './components/Cine/CineEdit';
import CineCreate from './components/Cine/CineCreate';

import PeliculasList from './components/Pelicula/PeliculasList';
import Pelicula from './components/Pelicula/Pelicula';
import PeliculaEdit from './components/Pelicula/PeliculaEdit';
import PeliculaCreate from './components/Pelicula/PeliculaCreate';

import Cartelera from './components/Cartelera/Cartelera'
import Funcion from './components/Cartelera/Funcion';
import FuncionEdit from './components/Cartelera/FuncionEdit';
import FuncionCreate from './components/Cartelera/FuncionCreate';


class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger m-4">
          <h2>Algo salió mal</h2>
          <p>{this.state.error.message}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Navbar />
          <main className="container mt-3">
            <Routes>
              <Route path="/cines" element={<CinesList />} />
              <Route path="/cines/:id" element={<Cine />} />
              <Route path="/cines/edit/:id" element={<CineEdit />} />
              <Route path="/cines/create" element={<CineCreate />} />

              <Route path="/peliculas" element={<PeliculasList />} />
              <Route path="/peliculas/:id" element={<Pelicula />} />
              <Route path="/peliculas/edit/:id" element={<PeliculaEdit />} />
              <Route path="/peliculas/create" element={<PeliculaCreate />} />

              <Route path="/cartelera" element={<Cartelera />} />
              <Route path="/cartelera/:id" element={<Funcion />} />
              <Route path="/cartelera/edit/:id" element={<FuncionEdit />} />
              <Route path="/cartelera/create" element={<FuncionCreate />} />

              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;