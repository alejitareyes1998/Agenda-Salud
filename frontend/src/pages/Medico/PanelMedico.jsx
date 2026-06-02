import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BotonCerrarSesion from '../../components/BotonCerrarSesion';
import apiConfig from '../../api/apiConfig';
import './PanelMedico.css';

export default function PanelMedico() {
  const navigate = useNavigate();
  const [medico, setMedico] = useState(null);
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const cargarMedico = async () => {
      const idUsuario = localStorage.getItem('id_usuario');
      if (!idUsuario) {
        return;
      }

      try {
        const respuesta = await apiConfig.get(`/medico/usuario/${idUsuario}`);
        setMedico(respuesta.data);
      } catch (error) {
        console.error('Error al cargar datos del médico:', error);
      }
    };

    cargarMedico();
  }, []);

  const fechaActual = fechaHora.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const horaActual = fechaHora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nombreCompleto = medico ? `${medico.nombre || ''} ${medico.apellido || ''}`.trim() : 'Doctor';
  const especialidad = medico?.nombre_especialidad || 'Especialidad';
  const tarjetaProfesional = medico?.tarjeta_profesional || '';
  const experiencia = medico?.experiencia_clinica || 'No disponible';

  return (
    <div className="panel-medico ">

      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>

          <div className="pp-brand-text">
            <div className="pp-brand-name">Bienvenido</div>
            <div className="pp-brand-sub">Panel médico</div>
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
            <div className="pp-avatar">{nombreCompleto.slice(0, 2).toUpperCase()}</div>
            <div className="pp-user-name">{nombreCompleto}</div>
          </div>

          <BotonCerrarSesion />
        </div>
      </header>

      <main className="pp-content">
        <section className="pp-greeting">
          <div>
            <h1>Buenos días, {nombreCompleto}</h1>
            <p>{especialidad} · {tarjetaProfesional ? `Tarjeta: ${tarjetaProfesional}` : 'Actualiza tus datos'} </p>
            <p>Experiencia: {experiencia}</p>
          </div>
        </section>

        <section className="pp-nav-grid">
          <button type="button" className="pp-nav-card" onClick={() => navigate('/cita')}>
            <div className="pp-nav-icon pp-ic-verde">
              <i className="pi pi-calendar-plus" />
            </div>

            <p className="pp-nav-title">Programar cita</p>
            <p className="pp-nav-desc">
              Programa una nueva cita con tus pacientes
            </p>
          </button>

          <button type="button" className="pp-nav-card" onClick={() => navigate('/tus-pacientes')}>
            <div className="pp-nav-icon pp-ic-azul">
              <i className="pi pi-user" />
            </div>

            <p className="pp-nav-title">Tus pacientes</p>
            <p className="pp-nav-desc">
              Consulta la información de tus pacientes y sus detalles
            </p>
          </button>

          <button type="button" className="pp-nav-card" onClick={() => navigate('/historial-citas-med')}>
            <div className="pp-nav-icon pp-ic-amber">
              <i className="pi pi-list" />
            </div>

            <p className="pp-nav-title">Historial de citas</p>
            <p className="pp-nav-desc">
              Revisa el historial de citas programadas y pasadas y su información
            </p>
          </button>

          <button type="button" className="pp-nav-card" onClick={() => navigate('/perfil-medico')}>
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