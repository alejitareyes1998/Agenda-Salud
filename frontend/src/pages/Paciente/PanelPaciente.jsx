import { useEffect, useState } from "react";
import BotonCerrarSesion from '../../components/BotonCerrarSesion';
import { Link } from 'react-router-dom';





export default function PanelPaciente() {
  
  const [fechaHora, setFechaHora] = useState(new Date()); {/*Hora y fecha*/}

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);
  
    return () => clearInterval(intervalo);
  }, []);
  
  const fechaActual = fechaHora.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const nombreUsuario = localStorage.getItem('nombre_usuario') || 'Paciente';
  const horaActual = fechaHora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="panel-paciente" style={{ backgroundImage: "url('/imagenes/fondo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh"
     }}>

      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>

          <div className="pp-brand-text">
            <div className="pp-brand-name">Bienvenido</div>
            <div className="pp-brand-sub">Panel del paciente</div>
          </div>
        </div>

      <div className="pp-header-datetime">
        <div className="pp-header-date">
        <i className="pi pi-calendar" />
        <span>{fechaActual}</span>
      </div>

    <div className="pp-header-time">
      <i className="pi pi-clock" />
      <span>{horaActual}</span>
    </div>
  </div>

    <div className="pp-header-actions">
    <div className="pp-user-chip">
    <div className="pp-avatar">{nombreUsuario.charAt(0).toUpperCase()}</div>
    <div className="pp-user-name">{nombreUsuario}</div>
  </div>

  <BotonCerrarSesion />
</div>
      </header>

      <main className="pp-content">
        <section className="pp-greeting">
          <div>
            <h1>Buenos días, {nombreUsuario}</h1>
            <p>¿Qué deseas hacer hoy?</p>
          </div>
        </section>

        <section className="pp-nav-grid">
           <Link to="/agendar-cita">
          <button type="button" className="pp-nav-card">
            <div className="pp-nav-icon pp-ic-verde">
              <i className="pi pi-calendar-plus" />
            </div>

            <p className="pp-nav-title">Agendar cita</p>
            <p className="pp-nav-desc">
              Reserva una nueva cita con el especialista que desees
            </p>
          </button>
        </Link>

          <button type="button" className="pp-nav-card">
            <div className="pp-nav-icon pp-ic-azul">
              <i className="pi pi-user" />
            </div>

            <p className="pp-nav-title">Nuestros Doctores</p>
            <p className="pp-nav-desc">
              Consulta los especialistas disponibles y sus horarios
            </p>
          </button>

          <button type="button" className="pp-nav-card">
            <div className="pp-nav-icon pp-ic-amber">
              <i className="pi pi-list" />
            </div>

            <p className="pp-nav-title">Historial de citas</p>
            <p className="pp-nav-desc">
              Revisa tus citas pasadas y los registros médicos
            </p>
          </button>

          <button type="button" className="pp-nav-card">
            <div className="pp-nav-icon pp-ic-morado">
              <i className="pi pi-id-card" />
            </div>

            <p className="pp-nav-title">Mi perfil</p>
            <p className="pp-nav-desc">
              Actualiza tus datos personales
            </p>
          </button>
        </section>
        
      </main>
    </div>
  );
}