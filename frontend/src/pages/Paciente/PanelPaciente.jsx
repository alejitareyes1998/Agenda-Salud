import { useEffect, useState } from "react";
import BotonCerrarSesion from '../../components/BotonCerrarSesion';
import { useNavigate } from "react-router-dom";
import apiConfig from '../../api/apiConfig';
import './PanelPaciente.css';



export default function PanelPaciente() {
  
  const [fechaHora, setFechaHora] = useState(new Date()); {/*Hora y fecha*/}
  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState(() => {
    return localStorage.getItem('nombre_usuario') || 'Paciente';
  });

    /*Hora y fecha*/
    useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);
  
    return () => clearInterval(intervalo);
  }, []);
  
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


  /*Conexion Nombre paciente con backend*/
  useEffect(() => {
    const cargarPaciente = async () => {
      const idPaciente = localStorage.getItem('id_paciente');
      const idUsuario = localStorage.getItem('id_usuario');

      if (!idPaciente && !idUsuario) {
        console.log('No hay id_paciente ni id_usuario en localStorage');
        return;
      }

      try {
        let respuesta;

        if (idPaciente) {
          respuesta = await apiConfig.get(`/paciente/${idPaciente}`);
        } else if (idUsuario) {
          respuesta = await apiConfig.get(`/paciente/usuario/${idUsuario}`);
          if (respuesta.data?.id_paciente) {
            localStorage.setItem('id_paciente', String(respuesta.data.id_paciente));
          }
        }

        console.log('Datos del paciente:', respuesta.data);

        const nombre = [respuesta.data.nombre].filter(Boolean).join(' ').trim();
        const nuevoNombre = nombre || respuesta.data.nombre || response?.data?.u?.nombre || '';
        if (nuevoNombre) {
          setNombreCompleto(nuevoNombre);
          localStorage.setItem('nombre_usuario', nuevoNombre);
        }
      } catch (error) {
        console.error('Error al cargar datos del paciente:', error);
      }
    };
  
    cargarPaciente();
  }, []);

  const alfabeto = nombreCompleto
    .split(' ')
    .map((palabra) => palabra[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'P';

  const irAgendarCita = () => {
    navigate("/agendar-cita");
  };

  const irMedicos = () => {
    navigate("/medicos");
  }

  const irHistorialCitas = () => {
    navigate("/historial-citas-pac");
  }
  const irPerfil = () => {
    navigate("/perfil");
  }

  return (
    <div className="panel-paciente">

      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>

          <div className="pp-brand-text">
            <div className="pp-brand-name">Bienvenido</div>
            <div className="pp-brand-sub">Panel del paciente</div>
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
    <div className="pp-avatar">{alfabeto}</div>
    <div className="pp-user-name">{nombreCompleto}</div>
  </div>

  <BotonCerrarSesion />
</div>
      </header>

      <main className="pp-content">
        <section className="pp-greeting">
          <div>
            <h1>Buenos días, {nombreCompleto}</h1>
            <p>¿Qué deseas hacer hoy?</p>
          </div>
        </section>

        {/*Tarjeta Agendar Cita*/}
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


      {/*======== Tarjeta Nuestros Doctores=========*/}

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

          {/*======== Tarjeta Historial de Citas=========*/}

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
        
      </main>
    </div>
  );
}