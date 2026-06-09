import  { useState, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import './RegistroMedico.css';
import { AlertaContext } from '../../context/AlertaContenedorContext';
const RegistroMedico = () => {
    // Ventana flotante
    const { mostrarAlertaGlobal } = useContext(AlertaContext);
    const location = useLocation();
    const navigate = useNavigate();
    // Captura el ID del usuario

    const [medicoData, setMedicoData] =useState({
        id_especialista: '',
        tarjeta_profesional: '',
        experiencia_clinica: '',
    });

    const handleInptutChange = (e) => {
        const { name, value } = e.target;
        setMedicoData({ ...medicoData, [name]: value });
    };

    const handleGuardarMedico = async (e) => {
        e.preventDefault();
        // Creamos el objeto final alineado con las columnas en la BD

        const payload = {
            id_usuario: location.state?.datosUsuario?.id_usuario || location.state?.id_usuario || '',
            // Datos del Usuario
            nombre: location.state?.nombre || '',
            apellido: location.state?.apellido || '',
            tipo_documento: location.state?.tipo_documento || '',
            documento: location.state?.documento || '',
            correo: location.state?.correo || '',
            password: location.state?.password || '',
            tipo_usuario: 'medico',
        // Datos del Medico
            id_especialista: parseInt(medicoData.id_especialista),
            tarjeta_profesional: medicoData.tarjeta_profesional,
            experiencia_clinica: parseInt(medicoData.experiencia_clinica),
            estado: 'pendiente'
    };
     try {
        //Peticion HHTP usando Axios hacia el backend en NodeJS
        const respuesta = await axios.post('http://localhost:3000/api/medico', payload);
        if (respuesta.status === 200 || respuesta.status === 201) {
            mostrarAlertaGlobal("Medico registrado con exito.");
            navigate('/login'); // Redirige al LOgin corporativo
        }
     } catch (error) {
        console.error("Error al registrar medico:", error.response?.data || error.message);
        mostrarAlertaGlobal("Hubo un error al guardar los datos de acreditacion.");
     }
};
    
return (
    <div className="fondo-pagina-medico">
        <div className="tarjeta-registro-medico">

           <img src="/imagenes/logo.png" alt="Logo Agenda de Salud"
              className="logo-agenda-salud" />
            
            <h2 className="h2">
                Ingrese sus datos
            </h2>
            <p className="text-center text-xs text-gray500 mb4"
            style={{ marginTop: '5px' }}>Acreditacion Medica</p>
            <form onSubmit={handleGuardarMedico} 
            className="p-fluid">
            
              {/* Campo 1. Tarjeta Profecional*/}
                <div className="field mb-3">
                    <label className="font-bold blok mb-2">Tarjeta Profesional</label>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-id-card"
                         style={{ color: '#00A3C4' }}></i></span>
                         <InputText
                         name="tarjeta_profesional"
                         value={medicoData.tarjeta_profesional}
                         onChange={handleInptutChange}
                         placeholder="Ej. TP-123456"
                         required />
                    </div>
                </div>

                {/* Campo 2. ID Especialista (Llave foranea) */ }
                <div className="field mb-3">
                    <label className="font-bold block mb-2">ID de especialidad Medica</label>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-briefcase"
                        style={{ color: '#00A3C4' }}></i></span>
                        <InputText
                        type="number"
                        name="id_especialista"
                        value={medicoData.id_especialista}
                        onChange={handleInptutChange}
                        placeholder="Ej. 1 (Para Medicina General)"
                        required />
                    </div>
                </div>

                {/* Campo 3. Experiencia Clinica */}
                <div className="field mb-4">
                    <label className="font-bold block mb-2">Años de Experiencia Clinica</label>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-clock"
                        style={{ color: '#00a3C4' }}></i></span>
                        <InputText
                        type="number"
                        name="experiencia_clinica"
                        value={medicoData.experiencia_clinica}
                        onChange={handleInptutChange}
                        placeholder="Ej. 5"
                        required />
                    </div>
                </div>
                 {/* Boton con el estilo azul claro del Login */}
                 <button
                 type="submit"
                 className="boton-azul-medico">
                
                 Finalizar Registro
              </button>
           </form>
        </div>
     </div>
);
};
export default RegistroMedico;
