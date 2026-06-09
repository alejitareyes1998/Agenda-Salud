import { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import './RegistroPaciente.css';
import { AlertaContext } from '../../context/AlertaContenedorContext';

const RegistroPaciente = () => {
    //V/ Ventana flotante
    const { mostrarAlertaGlobal } = useContext(AlertaContext);
    const location = useLocation();
    const navigate = useNavigate();
    const usuarioId = location.state?.usuarioId;

    const [datos, setDatos] = useState({
        id_usuario: usuarioId || '',
        tipo_sangre: '',
        sexo: '',
        fecha_nacimiento: "",
        telefono: "",
        direccion: "",
        estado: "activo"
    });

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const handleFinalizar = async () => {
        if (!datos.id_usuario) {
            mostrarAlertaGlobal("Error: No se recibio el ID del usuario. Los datos no se guardaron el la BD:");
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/paciente', datos);
            if (res.status === 200 || res.status === 201) {
                const idPaciente = res.data.id ?? res.data.id_paciente ?? null;
                if (idPaciente) {
                    localStorage.setItem('id_paciente', String(idPaciente));
                }
                localStorage.setItem('id_usuario', String(datos.id_usuario));
                mostrarAlertaGlobal("Usuario registrado.");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            mostrarAlertaGlobal("Error al crear la cuenta. No se pudo completar el registro");
        }
    };

    return (
        <div className="pantalla-fondo-mochila">
            <div className="tarjeta-blanca-perfil">
                <div className="seccion-logo">
                    <img src="/imagenes/logo.png" alt="Logo Agenda" className="img-logo-pequeño" />
                    <p className="texto-agenda-salud">agenda salud</p>
                </div>

                <h2 className="titulo-formulario">Completar Perfil</h2>
                <div className="cuerpo-formulario">
                    <label className="label-gris">Tipo de Sangre:</label>
                    <select name="tipo_sangre" onChange={handleChange} className="input-moderno-registro">
                        <option value="">Seleccione...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>

                    <label className="label-gris">Sexo:</label>
                    <select name="sexo" onChange={handleChange} className="input-moderno-registro">
                        <option value="">Seleccione...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>

                    <label className="label-gris">Fecha de Nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" onChange={handleChange} className="input-moderno-registro" />

                    <label className="label-gris">Telefono:</label>
                    <input type="text" name="telefono" onChange={handleChange} className="input-moderno-registro" placeholder="Ej:300 123 4567" />

                    <label className="label-gris">Direccion:</label>
                    <input type="text" name="direccion" onChange={handleChange} className="input-moderno-registro" placeholder="Tu direccion" />

                    <button onClick={handleFinalizar} className="boton-azul-claro">
                        Registrarse
                    </button>

                    <button className="boton-violeta-cancelar" onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistroPaciente;
