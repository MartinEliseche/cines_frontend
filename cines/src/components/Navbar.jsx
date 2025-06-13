import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">  {/* Cambiado a container-fluid */}
        <Link className="navbar-brand" to="/">CineApp</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/cines">Cines</Link>
          <Link className="nav-link" to="/peliculas">Películas</Link>
          <Link className="nav-link" to="/cartelera">Cartelera</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;