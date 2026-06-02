import { useEffect, useState } from "react";
import BotonCerrarSesion from "../components/BotonCerrarSesion";
import apiConfig from "../api/apiConfig";
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
    </div>
  );
}