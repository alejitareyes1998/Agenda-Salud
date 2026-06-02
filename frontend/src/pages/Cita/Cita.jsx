import "./Cita.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

function Cita() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    id_medico: "",
  });

  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarMedicos = async () => {
      try {
        const respuesta = await apiConfig.get("/medico");

        const medicosDesdeBackend = respuesta.data.map((medico) => ({
          id_medico: medico.id_medico || medico.id,
          nombre: `${medico.nombre || ""} ${medico.apellido || ""}`.trim(),
          especialidad:
            medico.nombre_especialidad ||
            medico.especialidad ||
            "General",
        }));

        setMedicos(medicosDesdeBackend);
      } catch (error) {
        console.error("Error al cargar médicos:", error);
      }
    };

    cargarMedicos();
  }, []);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgendar = async (e) => {
    e.preventDefault();

    if (!datos.fecha || !datos.hora || !datos.motivo.trim() || !datos.id_medico) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const idPaciente = localStorage.getItem("id_paciente");

    if (!idPaciente) {
      alert("No se encontró el paciente conectado. Inicia sesión nuevamente.");
      return;
    }

    setCargando(true);

    try {
      const datosAEnviar = {
        fecha: datos.fecha,
        hora: datos.hora,
        motivo: datos.motivo,
        id_medico: datos.id_medico,
        id_paciente: idPaciente,
        estado: "pendiente",
      };

      const respuesta = await apiConfig.post("/cita", datosAEnviar);

      alert(respuesta.data.mensaje || "¡Cita agendada correctamente!");

      setDatos({
        fecha: "",
        hora: "",
        motivo: "",
        id_medico: "",
      });

      navigate("/panel-paciente");
    } catch (error) {
      console.error("Error al agendar la cita:", error);

      const mensajeError =
        error.response?.data?.error ||
        error.response?.data?.mensaje ||
        "Hubo un error al guardar la cita en la base de datos.";

      alert(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <PanelLayout
      title="Agendar cita"
      subtitle="Reserva una nueva cita médica"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Agendar cita</h1>
          <p>Selecciona la fecha, hora, médico y motivo de tu consulta.</p>
        </div>
      </section>

      <section className="cita-panel-wrapper">
        <div className="tarjeta-cita">
          <form onSubmit={handleAgendar}>
            <input
              type="date"
              name="fecha"
              className="input-cita"
              value={datos.fecha}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="hora"
              className="input-cita"
              value={datos.hora}
              onChange={handleChange}
              required
            />

            <select
              name="id_medico"
              className="input-cita"
              value={datos.id_medico}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un médico</option>

              {medicos.map((medico) => (
                <option key={medico.id_medico} value={medico.id_medico}>
                  {medico.nombre} ({medico.especialidad})
                </option>
              ))}
            </select>

            <input
              type="text"
              name="motivo"
              className="input-cita"
              value={datos.motivo}
              onChange={handleChange}
              placeholder="Motivo de la cita"
              required
            />

            <button type="submit" className="boton-cita" disabled={cargando}>
              {cargando ? "Agendando..." : "Agendar cita"}
            </button>

            <button
              type="button"
              className="boton-cita secundario"
              onClick={() => navigate("/panel-paciente")}
            >
              Volver
            </button>
          </form>
        </div>
      </section>
    </PanelLayout>
  );
}

export default Cita;