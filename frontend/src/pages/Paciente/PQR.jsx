import PanelLayout from "../../layouts/PanelLayout";

export default function PQR() {
  return (
    <PanelLayout
      title="PQR"
      subtitle="Peticiones, Quejas, Reclamos y Sugerencias"
      userType="paciente"
    >
      <div className="card">
        <h2>Peticiones, Quejas, Reclamos y Sugerencias</h2>

        <p>
          Desde este módulo podrás enviar solicitudes relacionadas con la
          atención recibida y realizar seguimiento a tus requerimientos.
        </p>
      </div>
    </PanelLayout>
  );
}