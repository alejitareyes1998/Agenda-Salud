import { useEffect, useState } from "react";
import BotonCerrarSesion from "../../components/BotonCerrarSesion";
import "./PanelMedico.css";

export default function PerfilMedico() {
  // Hora y fecha actual
  const [fechaHora, setFechaHora] = useState(new Date());

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

  const horaActual = fechaHora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="panel-medico">
      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>

          <div className="pp-brand-text">
            <div className="pp-brand-name">Perfil Médico</div>
            <div className="pp-brand-sub">Información de tu perfil</div>
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

        <BotonCerrarSesion />
      </header>

      <main className="pp-content">
        <section className="pp-greeting">
          <h2>Perfil del médico</h2>
          <p>Aquí puedes ver y actualizar tus datos personales.</p>
        </section>
      </main>
    </div>
  );
}