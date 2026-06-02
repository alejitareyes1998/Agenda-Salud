import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonCerrarSesion from '../../components/BotonCerrarSesion';
import apiConfig from '../../api/apiConfig';
import '../Medico/PanelMedico.css';

export default function Medicos() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await apiConfig.get('/medico');
        setMedicos(res.data || []);
      } catch (err) {
        console.error('Error cargando médicos:', err);
      }
    };
    fetchMedicos();
  }, []);

  const fechaActual = fechaHora.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const horaActual = fechaHora.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="panel-medico">
      <header className="pp-topbar">
        <div className="pp-brand">
          <div className="pp-logo-box">
            <img src="/imagenes/logo.png" alt="Logo Agenda Salud" />
          </div>
          <div className="pp-brand-text">
            <div className="pp-brand-name">Nuestros Médicos</div>
            <div className="pp-brand-sub">Encuentra al especialista adecuado</div>
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
            <div className="pp-avatar">MP</div>
            <div className="pp-user-name">Paciente</div>
          </div>
          <BotonCerrarSesion />
        </div>
      </header>

      <main className="pp-content">
        <section className="pp-greeting">
          <h2>Doctores disponibles</h2>
          <p>Selecciona un médico para ver su perfil y horarios.</p>
        </section>

        <section className="pp-nav-grid">
          {medicos.length === 0 ? (
            <p>No hay médicos disponibles por ahora.</p>
          ) : (
            medicos.map((m) => (
              <button
                key={m.id_medico || m.id}
                className="pp-nav-card"
                type="button"
                onClick={() => navigate('/perfil-medico')}
              >
                <div className="pp-nav-icon pp-ic-azul">
                  <i className="pi pi-user" />
                </div>
                <p className="pp-nav-title">{m.nombre} {m.apellido}</p>
                <p className="pp-nav-desc">{m.especialidad || 'General'}</p>
              </button>
            ))
          )}
        </section>
      </main>
    </div>
  );
}