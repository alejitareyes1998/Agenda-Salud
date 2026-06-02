import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../layouts/PanelLayout";
import apiConfig from "../../api/apiConfig";

export default function Medicos() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await apiConfig.get("/medico");
        setMedicos(res.data || []);
      } catch (err) {
        console.error("Error cargando médicos:", err);
      }
    };

    fetchMedicos();
  }, []);

  return (
    <PanelLayout
      title="Nuestros Médicos"
      subtitle="Encuentra al especialista adecuado"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Doctores disponibles</h1>
          <p>Selecciona un médico para ver su perfil y horarios.</p>
        </div>
      </section>

      <section className="pp-nav-grid">
        {medicos.length === 0 ? (
          <p>No hay médicos disponibles por ahora.</p>
        ) : (
          medicos.map((medico) => (
            <button
              key={medico.id_medico || medico.id}
              className="pp-nav-card"
              type="button"
              onClick={() => navigate("/perfil-medico")}
            >
              <div className="pp-nav-icon pp-ic-azul">
                <i className="pi pi-user" />
              </div>

              <p className="pp-nav-title">
                {medico.nombre} {medico.apellido}
              </p>

              <p className="pp-nav-desc">
                {medico.especialidad ||
                  medico.nombre_especialidad ||
                  "General"}
              </p>
            </button>
          ))
        )}
      </section>
    </PanelLayout>
  );
}