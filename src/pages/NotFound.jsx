import React from 'react'
import "./NotFound.css";

function NotFound() {
  const handleClick = () => {
    alert("Redireccionando a la pagina principal");
    window.location.href = "/";
  };

  return (
    <div className="notfound-container">
      <header>
        <h1>Error 404</h1>
      </header>

      <main>
        <img
          src="https://i.gifer.com/7VE.gif"
          alt="gif de la imagen de error"
        />

        <h2>Página no encontrada</h2>

        <p>
          La página que estás buscando no existe o fue movida. <br />
          Por favor, revisá la dirección o volvé al inicio.
        </p>

        <button onClick={handleClick}>🔙 Volver al Inicio</button>


        
      </main>
    </div>
  );
}

export default NotFound;