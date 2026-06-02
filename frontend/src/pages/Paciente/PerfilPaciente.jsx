import { useEffect, useState } from 'react';
import BotonCerrarSesion from '../../components/BotonCerrarSesion';
import '../Medico/PanelMedico.css';

export default function PerfilPaciente() {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const fechaActual = fechaHora.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const horaActual = fechaHora.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="panel-medico">
      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>
          <div className="pp-brand-text">
            <div className="pp-brand-name">Perfil del paciente</div>
            <div className="pp-brand-sub">Actualiza tus datos personales</div>
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
            <div className="pp-avatar">PA</div>
            <div className="pp-user-name">Paciente</div>
          </div>
          <BotonCerrarSesion />
        </div>
      </header>

      <main className="pp-content">
        <section className="pp-greeting">
          <h2>Mi perfil</h2>
          <p>Aquí puedes ver y editar tu información personal.</p>
        </section>
      </main>
    </div>
  );
}