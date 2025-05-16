import React from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación interna
import "./AboutUs.css";

// Datos del equipo
const teamMembers = [
  {
    name: "Daniel Alejandro Landa",
    github: "https://github.com/Dann035",
    instagram: "https://instagram.com/usuario1",
    image:
      "https://static.vecteezy.com/system/resources/previews/056/827/314/large_2x/a-man-in-a-beige-jacket-and-jeans-free-png.png",
    description: "Desarrollador Full Stack apasionado por la tecnología.",
    smallImage:
      "https://static.vecteezy.com/system/resources/previews/056/827/314/large_2x/a-man-in-a-beige-jacket-and-jeans-free-png.png",
  },
  {
    name: "Javier Martínez López",
    github: "https://github.com/JavierML-git",
    instagram: "https://instagram.com/usuario2",
    image:
      "https://static.vecteezy.com/system/resources/previews/051/075/308/large_2x/a-man-with-glasses-and-a-beige-jacket-free-png.png",
    description: "Full Stack Developer con experiencia en React y Node.",
    smallImage:
      "https://static.vecteezy.com/system/resources/previews/051/075/308/large_2x/a-man-with-glasses-and-a-beige-jacket-free-png.png",
  },
  {
    name: "Jean Pierre Pluas",
    github: "https://github.com/Jampiier25",
    instagram: "https://instagram.com/usuario3",
    image:
      "https://static.vecteezy.com/system/resources/previews/055/757/552/large_2x/man-with-crossed-arms-posing-over-transparent-background-free-png.png",
    description: "Desarrollador con pasión por la innovación y UX.",
    smallImage:
      "https://static.vecteezy.com/system/resources/previews/055/757/552/large_2x/man-with-crossed-arms-posing-over-transparent-background-free-png.png",
  },
  {
    name: "Rafael Abad Giner",
    github: "https://github.com/Rafael468",
    instagram: "https://instagram.com/usuario4",
    image:
      "https://static.vecteezy.com/system/resources/previews/051/765/375/large_2x/portrait-of-a-young-man-with-his-arms-crossed-free-png.png",
    description: "Full Stack Developer enfocado en soluciones escalables.",
    smallImage:
      "https://static.vecteezy.com/system/resources/previews/051/765/375/large_2x/portrait-of-a-young-man-with-his-arms-crossed-free-png.png",
  },
];

// Tarjetas de información
const diagramCards = [
  {
    title: "Nuestra Misión",
    content:
      "Brindar una plataforma confiable y sencilla para planificar viajes personalizados.",
  },
  {
    title: "Objetivo",
    content:
      "Permitir la creación de presupuestos precisos para todo tipo de viajes.",
  },
  {
    title: "Promoviendo",
    content: "Acceso a paquetes de viajes prediseñados por agencias aliadas.",
  },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header"></header>

      <section className="main-image">
        <img src="Icono-Posible.png" alt="Equipo EasyFlights" />
      </section>

      <section className="container">
        <h2>
          Bienvenido a EasyFlights, tu plataforma de confianza para planificar
          viajes de forma eficiente y personalizada. Ofrecemos paquetes
          prediseñados por agencias aliadas y opciones adaptadas a tus
          preferencias, para que elijas cómo, cuándo y a dónde viajar. Al
          registrarte, accederás a herramientas exclusivas como el planificador
          de presupuesto y el estimador de gastos por persona, diseñadas para
          optimizar cada etapa de tu viaje.
        </h2>
      </section>

      <br />

      <section className="diagram-section">
        <div className="diagram-grid">
          {diagramCards.map((card, idx) => (
            <div className="diagram-card" key={idx}>
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 className="container">
        Detrás de EasyFlights estamos Daniel, Javier, Jean Pierre y Rafa, un
        equipo comprometido con la innovación y la experiencia del usuario.
        Combinamos nuestra pasión por la tecnología y los viajes para ofrecerte
        una solución clara, funcional y confiable.
      </h2>

      <section className="team">
        {teamMembers.map((member, index) => (
          <div className="flip-card-au" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front-au">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
              </div>
              <div className="flip-card-back-au imgstyle">
                <img src={member.smallImage} alt={`Mini ${member.name}`} />
                <p>{member.description}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>{" "}
                |{" "}
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Enlace al final hacia la página de donaciones */}
      <div className="donate-link-wrapper">
        <p>¿Te gustaría apoyar el desarrollo y crecimiento de EasyFlights?</p>
        <Link to="/donate" className="donate-link">
          Conoce cómo puedes colaborar con el proyecto
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;