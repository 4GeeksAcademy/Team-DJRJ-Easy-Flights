import React from 'react';
import './Donate.css';

const Donate = () => {
  return (
    <div className="donatecontainer">
      <h1>Construyamos juntos el futuro de esta plataforma</h1>
      <p>
        Esta aplicación nació con la idea de ser más que un buscador de vuelos. Queremos crear una herramienta integral para viajeros que conecte, informe y entretenga. Hasta ahora, hemos integrado funciones como el planificador, desglose de gastos, búsqueda por países y un cuestionario interactivo.
      </p>

      <h2>¿Qué queremos construir contigo?</h2>
      <p>
        Con el apoyo de la comunidad, planeamos desarrollar nuevas funciones que permitan escalar la plataforma y convertirla en un espacio colaborativo. Algunas de las mejoras futuras incluyen:
      </p>
      <ul>
        <li>👤 Registro de usuarios con perfiles personalizables</li>
        <li>💾 Guardado de preferencias, búsquedas y herramientas usadas</li>
        <li>💬 Espacios de comunidad: comentarios, foros y chat entre usuarios</li>
        <li>📩 Mensajes privados para conectar con otros viajeros</li>
        <li>🌍 Recomendaciones de destinos según intereses y experiencia</li>
        <li>📊 Estadísticas de viaje y análisis de presupuesto</li>
        <li>🔗 Integraciones con alojamientos y experiencias locales</li>
      </ul>

      <h2>¿Cómo puedes ayudar?</h2>
      <p>
        Para hacer realidad estas funciones y mantener la plataforma activa, buscamos apoyo externo que nos permita continuar desarrollando sin perder la visión independiente del proyecto.
        Tu colaboración, ya sea compartiendo la app, aportando ideas o apoyando económicamente, hace la diferencia.
      </p>

      <p>
        Si crees en este proyecto tanto como nosotros, te invitamos a formar parte de su evolución.
      </p>

      <button className="btn donatebutton">Apóyanos</button>
    </div>
  );
};

export default Donate;