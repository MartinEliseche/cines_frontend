import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import CinesList from './components/CinesList';
import PeliculasList from './components/PeliculasList';
import Cartelera from './components/Cartelera';

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
          <div className="container mt-3">
            <Routes>
              <Route path="/cines" element={<CinesList />} />
              <Route path="/peliculas" element={<PeliculasList />} />
              <Route path="/cartelera" element={<Cartelera />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;