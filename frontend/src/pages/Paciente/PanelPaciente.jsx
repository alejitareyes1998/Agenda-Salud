import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";

export default function PanelPaciente() {
  const navigate = useNavigate();

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

const irPQR = () => {
  navigate("/pqr");
};

  return (
    <PanelLayout
      title="Bienvenido"
      subtitle="Panel del paciente"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Buenos días</h1>
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

<button
  type="button"
  className="pp-nav-card"
  onClick={irPQR}
>
  <div className="pp-nav-icon pp-ic-azul">
    <i className="pi pi-file-edit" />
  </div>

  <p className="pp-nav-title">PQR</p>
  <p className="pp-nav-desc">
    Envía peticiones, quejas, reclamos y sugerencias
  </p>
</button>

      </section>
    </PanelLayout>
  );
}