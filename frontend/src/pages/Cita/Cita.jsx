import "./Cita.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

function Cita() {
  const navigate = useNavigate();

  // 1. ESTADO DEL FORMULARIO (La estructura original)
  const [datos, setDatos] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    id_medico: "",
  });

  // 2. NUEVOS ESTADOS PARA LOS BLOQUES DE HORAS
  const [medicos, setMedicos] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]); 
  const [cargando, setCargando] = useState(false);
  const [buscandoHoras, setBuscandoHoras] = useState(false);
  const [mensajeHoras, setMensajeHoras] = useState("");

  // 3. CARGAR MÉDICOS AL INICIAR 
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

  // 4. NUEVO EFFECT: Monitorea médico y fecha para traer los bloques de 20 min
  useEffect(() => {
    const cargarHorariosDisponibles = async () => {
      // Si falta alguno de los dos campos, vaciamos las horas
      if (!datos.id_medico || !datos.fecha) {
        setHorasDisponibles([]);
        setMensajeHoras("");
        return;
      }

      setBuscandoHoras(true);
      setMensajeHoras("");
      setHorasDisponibles([]);
      // Reseteamos la hora en el estado para obligar a elegir una nueva
      setDatos((prev) => ({ ...prev, hora: "" })); 

      try {
        // Petición al nuevo endpoint del backend
        const respuesta = await apiConfig.get("/cita/disponibilidad", {
          params: {
            id_medico: datos.id_medico,
            fecha: datos.fecha,
          },
        });

        setHorasDisponibles(respuesta.data);

        // Si el backend responde vacío [], significa que no trabaja ese día o está lleno
        if (respuesta.data.length === 0) {
          setMensajeHoras("El médico no atiende este día o no cuenta con horarios disponibles.");
        }
      } catch (error) {
        console.error("Error al cargar disponibilidad:", error);
        setMensajeHoras("No se pudieron cargar los horarios para esta fecha.");
      } finally {
        setBuscandoHoras(false);
      }
    };

    cargarHorariosDisponibles();
  }, [datos.id_medico, datos.fecha]); // Se activa automáticamente al cambiar médico o fecha

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // 5. GUARDAR LA CITA 
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
          <p>Selecciona médico y fecha para ver tus opciones de horario.</p>
        </div>
      </section>

      <section className="cita-panel-wrapper">
        <div className="tarjeta-cita">
          <form onSubmit={handleAgendar}>
            
            {/* Selector de Médico */}
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

            {/* Selector de Fecha */}
            <input
              type="date"
              name="fecha"
              className="input-cita"
              value={datos.fecha}
              onChange={handleChange}
              required
            />

            {/* NUEVA SECCIÓN: Selector de turnos dinámico */}
            <div style={{ margin: "5px 0 20px 0", textAlign: "left" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px", color: "#444" }}>
                Horarios disponibles cada 20 min:
              </label>

              {buscandoHoras && <p style={{ fontSize: "14px", color: "#666" }}>Consultando agenda libre...</p>}
              {mensajeHoras && <p style={{ fontSize: "14px", color: "#dc3545", fontWeight: "bold" }}>{mensajeHoras}</p>}

              {/* Contenedor en cuadrícula para las horas */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {horasDisponibles.map((h) => (
                  <button
                    type="button"
                    key={h.hora}
                    // Al hacer clic, guarda la hora seleccionada en el estado "datos.hora"
                    onClick={() => setDatos((prev) => ({ ...prev, hora: h.hora }))}
                    style={{
                      padding: "10px",
                      fontSize: "14px",
                      // Si esta es la hora seleccionada, se pinta azul, si no, blanca
                      backgroundColor: datos.hora === h.hora ? "#007bff" : "#ffffff",
                      color: datos.hora === h.hora ? "#ffffff" : "#333333",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: datos.hora === h.hora ? "bold" : "normal",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {h.hora.substring(0, 5)} {/* Corta '08:00:00' para mostrar solo '08:00' */}
                  </button>
                ))}
              </div>
            </div>

            {/* Input de Motivo */}
            <input
              type="text"
              name="motivo"
              className="input-cita"
              value={datos.motivo}
              onChange={handleChange}
              placeholder="Motivo de la cita"
              required
            />

            {/* Botón de Envío: Deshabilitado si no hay hora elegida en los botones */}
            <button 
              type="submit" 
              className="boton-cita" 
              disabled={cargando || !datos.hora}
            >
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
