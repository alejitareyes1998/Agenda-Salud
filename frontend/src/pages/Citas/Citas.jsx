import './Citas.css';
import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertaContext } from '../../context/AlertaContenedorContext';
function Cita() {
    // Ventana flotante
    const { mostrarAlertaGlobal } = useContext(AlertaContext);
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        fecha: '',
        hora: '',
        id_medico: '',
        motivo: '',
    });
    const [cargando, setCargando] = useState(false);
    const [medicos, setMedicos] =useState([]);
    const API_URL = 'http://localhost:3000/api/cita';
    const API_MEDICOS_URL = 'http://localhost:3000/api/medico';
    
    // NUEVO: peticion GET al backend para cargar medicos en el selector
    useEffect(() => {
        const obtenerMedicos = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get(API_MEDICOS_URL, {
                    headers: {authorization: `bearer ${token}` }
                });
                setMedicos(respuesta.data); // Guardar el resultado en MySQL
            } catch (error) {
                console.error("Error al cargar lista de medicos:", error);
            }
        };
        obtenerMedicos();
    }, []);

        const handleChange = (e) => {
        setDatos({ 
            ...datos,
            [e.target.name]: e.target.value 
        });
    };
    // Funcion principal para enviar la cita al backend
    const handleAgendar = async (e) => {
        e.preventDefault();
        // Validacion de campos vacios
        if (!datos.fecha || !datos.hora || !datos.id_medico || !datos.motivo) {
            mostrarAlertaGlobal('Por favor, completa todos los campos.');
            return;
        }
        const idPaciente = localStorage.getItem('id_paciente');
        const token = localStorage.getItem('token'); // Se extrae el JWT del localStorage

        try {
            setCargando(true);
            const datosAEnviar = {
                ...datos,
                id_paciente: idPaciente
            };
            // Se agregan las cabeceras de autorizacion con JWT para Express
            const configuracion = {
                headers: {
                Authorization:  `Bearer ${token}`
            }
        };
            // Peticion POST al backend para insertar en MySQL
            
            const respuesta = await axios.post(API_URL, datosAEnviar, configuracion);
            const textos = respuesta.data.recordatorio.join('\n\n');
            mostrarAlertaGlobal(`¡Cita agendada con exito!\n\nRECORDATORIOS:\n${textos}`);
            // Limpiamos el formulario
            setDatos({ fecha: '', hora: '', id_medico: '', motivo: '' });
            // Redireccion al panel principal tras el exito
            navigate('/panel-usuario');
        } catch (error) {
            console.error('Error al agendar cita:', error);
            // Muestra el mensaje de error que envia el backend, si existe
            mostrarAlertaGlobal(error.response?.data?.mensaje || 'Error al guardar en la base de datos.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fondo-pagina-cita">
            <div className="tarjeta-cita">
                <img src="/imagenes/logo.png" alt="Logo" className="logo-cita" />
                <h2 className="titulo-cita">Agendar Cita</h2>
                <form onSubmit={handleAgendar}>     
                 {/* INPUT FECHA */}
                <input 
                  type="date"
                  name="fecha"
                  className="input-cita"
                  value={datos.fecha}
                  onChange={handleChange} 
                  required 
                />
                {/*INPUT HORA */}
                <input 
                  type="time"
                  name="hora"
                  className="input-cita"
                  value={datos.hora} 
                  onChange={handleChange} 
                  required 
                />
                {/* SELECT MEDICO */}
                <select 
                name="id_medico"
                className="input-cita"
                value={datos.id_medico}
                 onChange={handleChange} 
                 required 
                 >
                    <option value="">Seleccione un medico</option>
                    {/* Aqui asumimos que la variable "medicos"viene de un estado superior o de fetch */}
                    {typeof medicos !== 'undefined' && medicos.map((medico) => (
                        <option key={medico.id_medico}
                        value={medico.id_medico}>{medico.nombre} 
                        
                        </option>
         ))}
                </select>
                {/* INPUT MOTIVO */}
                <input 
                  type="text"
                  name="motivo"
                  className="input-cita"
                  value={datos.motivo}
                  onChange={handleChange} 
                  placeholder="Motivo de la cita" 
                  required />
                {/* BOTON AGENDAR */}
                <div style={{ display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: '15px',
                    alignItems: 'center' }}>
                <button 
                  type="submit"
                  className="boton-agendar"
                  disabled={cargando}
                >
                    {cargando ? "Agendando..." : "Agendar Cita"}
                </button>
                {/* BOTON VOLVER */}
                    <button 
                  type="button"
                  className="boton-cita-secundario"
                    onClick={() => navigate(-1)}
                >
                    volver
                  </button>
                  </div>
                </form>
            </div>
        </div>
    );
} 
export default Cita;  

