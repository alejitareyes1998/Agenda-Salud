import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

export default function PanelPaciente() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const cargarPaciente = async () => {
      const idUsuario = localStorage.getItem("id_usuario");

      if (!idUsuario) {
        return;
      }

      try {
        const respuesta = await apiConfig.get(`/paciente/usuario/${idUsuario}`);

        const datosPaciente = respuesta.data?.paciente || respuesta.data;

        setPaciente(datosPaciente);

        if (datosPaciente?.id_paciente) {
          localStorage.setItem(
            "id_paciente",
            String(datosPaciente.id_paciente)
          );
        }
      } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
      }
    };

    cargarPaciente();
  }, []);

  const nombre = paciente?.nombre || "Paciente";

  const irAgendarCita = () => {
    navigate("/agendar-cita");
  };

  const irMedicos = () => {
    navigate("/medicos");
  };

  const irHistorialCitas = () => {
    navigate("/historial-citas-pac");
  };

  const irPerfil = () => {
    navigate("/perfil");
  };

  return (
    <PanelLayout
      title="Bienvenido"
      subtitle="Panel del paciente"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Bienvenido {nombre}</h1>
          <p>¿Qué deseas hacer hoy?</p>
        </div>
      </section>

      <section className="pp-nav-grid">
        <button
          type="button"
          className="pp-nav-card"
          onClick={irAgendarCita}
        >
          <div className="pp-nav-icon pp-ic-verde">
            <i className="pi pi-calendar-plus" />
          </div>

          <p className="pp-nav-title">Agendar cita</p>
          <p className="pp-nav-desc">
            Reserva una nueva cita con el especialista que desees
          </p>
        </button>

        <button
          type="button"
          className="pp-nav-card"
          onClick={irMedicos}
        >
          <div className="pp-nav-icon pp-ic-azul">
            <i className="pi pi-user" />
          </div>

          <p className="pp-nav-title">Nuestros Doctores</p>
          <p className="pp-nav-desc">
            Consulta los especialistas disponibles y sus horarios
          </p>
        </button>

        <button
          type="button"
          className="pp-nav-card"
          onClick={irHistorialCitas}
        >
          <div className="pp-nav-icon pp-ic-amber">
            <i className="pi pi-list" />
          </div>

          <p className="pp-nav-title">Historial de citas</p>
          <p className="pp-nav-desc">
            Revisa tus citas pasadas y los registros médicos
          </p>
        </button>

        <button
          type="button"
          className="pp-nav-card"
          onClick={irPerfil}
        >
          <div className="pp-nav-icon pp-ic-morado">
            <i className="pi pi-id-card" />
          </div>

          <p className="pp-nav-title">Mi perfil</p>
          <p className="pp-nav-desc">
            Actualiza tus datos personales
          </p>
        </button>
      </section>
    </PanelLayout>
  );
}