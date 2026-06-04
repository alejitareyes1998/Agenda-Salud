import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig"; // Usamos la configuración centralizada
import '../Cita/Cita.css'; // Manteniendo los estilos de inputs, tarjetas y botones de Cita

export default function HistorialCitasPac() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Estados para el modal flotante de Modificación
  const [citaEditando, setCitaEditando] = useState(null); 
  const [datosEditar, setDatosEditar] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    id_medico: ""
  });

  // El ID es completamente dinámico según la sesión
  const idPaciente = localStorage.getItem("id_paciente") || "1"; // OJO: El "1" es solo un fallback para pruebas, en producción siempre debería venir del localStorage

  // Cargar datos reales desde la Base de Datos mediante apiConfig
  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true);
      try {
        // 1. Obtener citas reales del paciente en sesión
        const resCitas = await apiConfig.get(`/cita/paciente/${idPaciente}`);
        setCitas(resCitas.data);

        // 2. Cargar médicos usando el mapeo idéntico al de la página Cita usada para Agendar
        const respuestaMedicos = await apiConfig.get("/medico");
        const medicosDesdeBackend = respuestaMedicos.data.map((medico) => ({
          id_medico: medico.id_medico || medico.id,
          nombre: `${medico.nombre || ""} ${medico.apellido || ""}`.trim(),
          especialidad: medico.nombre_especialidad || medico.especialidad || "General",
        }));
        setMedicos(medicosDesdeBackend);

      } catch (error) {
        console.error("Error al sincronizar con la Base de Datos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [idPaciente]);

  // DELETE: Eliminar la cita médica en la BD
  const handleEliminar = async (idCita) => {
    const confirmar = window.confirm("¿Está seguro de que desea cancelar permanentemente esta cita médica?");
    
    if (confirmar) {
      try {
        await apiConfig.delete(`/cita/${idCita}`);
        alert("Cita cancelada con éxito.");
        setCitas(citas.filter(cita => cita.id_cita !== idCita));
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
        alert("Error en el servidor al intentar cancelar la cita.");
      }
    }
  };

  // PUT: Abrir modal y pre-cargar datos encontrando el ID oculto por el nombre
  const abrirModalModificar = (cita) => {
    setCitaEditando(cita.id_cita);

    // Buscamos el ID numérico del médico comparando el nombre de la cita con nuestra lista de médicos
    const medicoEncontrado = medicos.find(m => 
      cita.nombre_medico && m.nombre.toLowerCase().includes(cita.nombre_medico.split(' ')[0].toLowerCase())
    );

    setDatosEditar({
      fecha: cita.fecha ? cita.fecha.substring(0, 10) : "",
      hora: cita.hora,
      motivo: cita.motivo,
      // Si encontramos el ID lo ponemos, si no, usamos el id_medico que tenga o vacío
      id_medico: medicoEncontrado ? medicoEncontrado.id_medico : (cita.id_medico || "")
    });
  };

  const handleEditChange = (e) => {
    setDatosEditar({
      ...datosEditar,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardarModificacion = async (e) => {
    e.preventDefault();
    try {
      await apiConfig.put(`/cita/${citaEditando}`, datosEditar);
      alert("¡Cita reprogramada correctamente!");
      
      // Buscamos el médico seleccionado para parchar los datos visuales de inmediato
      const medicoSeleccionado = medicos.find(m => String(m.id_medico) === String(datosEditar.id_medico));
      
      setCitas(citas.map(cita => 
        cita.id_cita === citaEditando 
          ? { 
              ...cita, 
              ...datosEditar,
              // Le inyectamos los nombres correctos al estado local temporal
              nombre_medico: medicoSeleccionado ? medicoSeleccionado.nombre : cita.nombre_medico 
            } 
          : cita
      ));
      
      setCitaEditando(null); // Cerrar Modal
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      alert("No se pudo guardar la modificación.");
    }
  };

  // Buscar el nombre del médico formateado con base en su ID o su nombre directo
  const obtenerNombreMedico = (cita) => {
    if (!cita) return "Médico Especialista";

    // 1. Si el backend ya nos da el nombre completo (Como vimos en la consola)
    if (cita.nombre_medico) {
      // Intentamos buscar si ese médico tiene una especialidad en nuestra lista local para agregarla
      const medLocal = medicos.find(m => m.nombre.toLowerCase().includes(cita.nombre_medico.split(' ')[0].toLowerCase()));
      if (medLocal) {
        return `${cita.nombre_medico} (${medLocal.especialidad})`;
      }
      return cita.nombre_medico;
    }

    // 2. Respaldo por ID si el usuario está justo en el momento posterior a reagendar
    if (cita.id_medico) {
      const med = medicos.find(m => String(m.id_medico) === String(cita.id_medico));
      if (med) return `${med.nombre} (${med.especialidad})`;
    }

    return "Médico Especialista";
  };

  // Función para formatear la fecha en formato humano ejemplo "23 de junio de 2026"
  const formatearFechaHumana = (fechaString) => {
  if (!fechaString) return "";
  const fechaLimpia = fechaString.substring(0, 10); // '2026-06-23'
  const [anio, mes, dia] = fechaLimpia.split('-');
  
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  
  return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]}, ${anio}`;
};

  return (
    <PanelLayout
      title="Historial de citas"
      subtitle="Revisa tus citas pasadas y sus detalles"
      userType="paciente"
    >
      <div className="panel-paciente">
        <div className="pp-content">
          
          <div className="pp-greeting" style={{ flexDirection: 'column', minHeight: 'auto', padding: '20px' }}>
            <h1>Historial de Citas</h1>
            <p>Gestiona, reprograma o cancela tus citas médicas activas.</p>
          </div>

          {cargando && (
            <p style={{ textAlign: "center", color: "#64748b", fontWeight: 500 }}>
              Sincronizando con el servidor...
            </p>
          )}

          <div className="pp-nav-grid" style={{ gridTemplateColumns: citas.length > 0 ? 'repeat(auto-fit, minmax(290px, 1fr))' : '1fr', maxWidth: '100%' }}>
            
            {citas.length === 0 && !cargando ? (
              <div className="pp-nav-card" style={{ cursor: 'default', minHeight: '120px', justifyContent: 'center' }}>
                <p className="pp-nav-title">No hay citas pendientes</p>
                <p className="pp-nav-desc">Actualmente no registras ninguna cita agendada en el sistema.</p>
              </div>
            ) : (
              citas.map((cita) => (
                <div key={cita.id_cita} className="pp-nav-card" style={{ cursor: 'default', textAlign: 'left', alignItems: 'flex-start' }}>
                  
                  <div className="pp-nav-icon pp-ic-azul" style={{ marginBottom: '12px' }}>
                    <i className="fa-regular fa-calendar-check">📅</i>
                  </div>

                  <h3 className="pp-nav-title" style={{ fontSize: '17px', margin: '0 0 4px 0' }}>
                   {obtenerNombreMedico(cita)} {/* <-- Asegúrate de que diga 'cita' y no 'cita.id_medico' */}
                  </h3>
                  
                  <p className="pp-nav-desc" style={{ fontSize: '14px', marginBottom: '4px' }}>
                    <strong>Fecha:</strong> {formatearFechaHumana(cita.fecha)}
                  </p>
                  <p className="pp-nav-desc" style={{ fontSize: '14px', marginBottom: '4px' }}>
                    <strong>Hora:</strong> {cita.hora} hs
                  </p>
                  <p className="pp-nav-desc" style={{ fontSize: '14px', marginBottom: '16px', fontStyle: 'italic' }}>
                    "{cita.motivo}"
                  </p>

                  <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: 'auto' }}>
                    <button 
                      type="button" 
                      className="boton-cita" 
                      style={{ padding: '8px 12px', fontSize: '13px', height: 'auto', margin: 0 }}
                      onClick={() => abrirModalModificar(cita)}
                    >
                      Reagendar
                    </button>
                    <button 
                      type="button" 
                      className="boton-cita secundario" 
                      style={{ padding: '8px 12px', fontSize: '13px', height: 'auto', margin: 0, backgroundColor: '#ef4444', color: '#ffffff', borderColor: '#ef4444' }}
                      onClick={() => handleEliminar(cita.id_cita)}
                    >
                      Cancelar
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <button type="button" className="boton-cita secundario" style={{ maxWidth: '200px' }} onClick={() => navigate(-1)}>
              Volver al Panel
            </button>
          </div>

        </div>

        {/* OVERLAY DEL MODAL PARA REAGENDAR */}
        {citaEditando && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
          }}>
            <div className="tarjeta-cita" style={{ width: '90%', maxWidth: '440px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              <h2 className="titulo-cita" style={{ marginBottom: '20px' }}>Modificar Cita</h2>
              
              <form onSubmit={handleGuardarModificacion}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>Nueva Fecha</label>
                <input type="date" name="fecha" className="input-cita" value={datosEditar.fecha} onChange={handleEditChange} required />
                
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>Nueva Hora</label>
                <input type="time" name="hora" className="input-cita" value={datosEditar.hora} onChange={handleEditChange} required />

                <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>Médico Tratante</label>
                <select name="id_medico" className="input-cita" value={datosEditar.id_medico} onChange={handleEditChange} required>
                  <option value="">Seleccione un Médico</option>
                  {medicos.map((medico) => (
                    <option key={medico.id_medico} value={medico.id_medico}>
                      {/* Muestra Nombre Apellido (Especialidad) exactamente igual que al Agendar */}
                      {medico.nombre} ({medico.especialidad})
                    </option>
                  ))}
                </select>

                <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>Motivo de la Consulta</label>
                <input type="text" name="motivo" className="input-cita" value={datosEditar.motivo} onChange={handleEditChange} placeholder="Motivo" required />

                <button type="submit" className="boton-cita" style={{ marginTop: '10px' }}>Confirmar Cambios</button>
                <button type="button" className="boton-cita secundario" onClick={() => setCitaEditando(null)}>Salir sin Cambiar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}
