import { useEffect, useState } from "react";
import BotonCerrarSesion from "../components/BotonCerrarSesion";
import BotonAyuda from "../components/BotonAyuda";
import BotonAtras from "../components/BotonAtras";
import apiConfig from "../api/apiConfig";
import { Link } from "react-router-dom";
import "./PanelLayout.css";

export default function PanelLayout({
  title = "Bienvenido",
  subtitle = "Panel",
  userType = "paciente",
  children,
}) {
  const nombreStorageKey =
    userType === "medico" ? "nombre_medico" : "nombre_paciente";

  const [fechaHora, setFechaHora] = useState(new Date());

  const [nombreCompleto, setNombreCompleto] = useState(() => {
    return localStorage.getItem(nombreStorageKey) || "Usuario";
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const cargarUsuario = async () => {
      const idUsuario = localStorage.getItem("id_usuario");
      const idPaciente = localStorage.getItem("id_paciente");
      const idMedico = localStorage.getItem("id_medico");

      try {
        let respuesta;

        if (userType === "paciente") {
          if (idPaciente) {
            respuesta = await apiConfig.get(`/paciente/${idPaciente}`);
          } else if (idUsuario) {
            respuesta = await apiConfig.get(`/paciente/usuario/${idUsuario}`);

            if (respuesta.data?.id_paciente) {
              localStorage.setItem(
                "id_paciente",
                String(respuesta.data.id_paciente)
              );
            }
          }
        }

        if (userType === "medico") {
          if (idMedico) {
            respuesta = await apiConfig.get(`/medico/${idMedico}`);
          } else if (idUsuario) {
            respuesta = await apiConfig.get(`/medico/usuario/${idUsuario}`);

            if (respuesta.data?.id_medico) {
              localStorage.setItem(
                "id_medico",
                String(respuesta.data.id_medico)
              );
            }
          }
        }

        if (!respuesta?.data) return;

        const usuario =
          respuesta.data?.paciente || respuesta.data?.medico || respuesta.data;

        const nuevoNombre = [usuario?.nombre, usuario?.apellido]
          .filter(Boolean)
          .join(" ")
          .trim();

        if (nuevoNombre) {
          setNombreCompleto(nuevoNombre);
          localStorage.setItem(nombreStorageKey, nuevoNombre);
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };

    cargarUsuario();
  }, [userType, nombreStorageKey]);

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

  const iniciales =
    nombreCompleto
      .split(" ")
      .map((palabra) => palabra[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="panel">
      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>

          <div className="pp-brand-text">
            <div className="pp-brand-name">{title}</div>
            <div className="pp-brand-sub">{subtitle}</div>
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
            <div className="pp-avatar">{iniciales}</div>
            <div className="pp-user-name">{nombreCompleto}</div>
          </div>

          <BotonCerrarSesion />
        </div>
      </header>

      <main className="pp-content">{children}</main>

      <div className="pp-bottom-actions">
  <BotonAtras />
  <BotonAyuda />
</div>


{/* FOOTER */}
<footer className="pp-footer">
  <div className="footer-top">

    {/* Brand */}
    <div>
      <div className="brand-logo">
        <div className="icon-wrap">
        <img src="/imagenes/logo-2.png" alt="Logo Agenda Salud" />
        </div>
        <span>Agenda Salud</span>
      </div>
      <p className="brand-tagline">
        Plataforma de gestión médica para conectar pacientes y profesionales de la salud.
      </p>
      <span className="version-badge">Versión 1.0.0</span>
    </div>

    {/* Soporte */}
    <div>
      <p className="col-title">Soporte</p>
      <ul className="col-list">
        <li>
          <svg viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
          <a href="mailto:soporte@agendasalud.com">soporte@agendasalud.com</a>
        </li>
        <li>
          <svg viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.13 1.05.37 2.07.71 3.06a2 2 0 01-.45 2.11L9.09 11.1a16 16 0 006.81 6.81l1.21-1.21a2 2 0 012.11-.45c.99.34 2.01.58 3.06.71A2 2 0 0122 16.92z" />
          </svg>
          +57 123 456 7890
        </li>
      </ul>
    </div>

    {/* Ubicación */}
    <div>
      <p className="col-title">Ubicación</p>
      <ul className="col-list">
        <li>
          <svg viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Calle Falsa 123,<br />Ciudad, País</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>Lun – Vie<br />8:00 AM – 6:00 PM</span>
        </li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <p className="col-title">Legal</p>
      <ul className="col-list">
        <li>
          <svg viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
          <a href="#">Términos y condiciones</a>
        </li>
        <li>
          <svg viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <a href="#">Política de privacidad</a>
        </li>
      </ul>
    </div>

  </div>

  <div className="footer-bottom">
    <div className="footer-bottom-inner">
      <span className="copy">© 2026 Agenda Salud · Todos los derechos reservados</span>
      <Link to="/pqr" className="pqrsf-btn">
        <svg viewBox="0 0 24 24">
          <path d="M3 18v-6a9 9 0 0118 0v6" />
          <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
        </svg>
        Canal PQRSF
      </Link>
    </div>
  </div>
</footer>
    </div>
  );
}
