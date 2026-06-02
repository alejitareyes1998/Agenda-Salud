import PanelLayout from "../../layouts/PanelLayout";

export default function HistorialCitasMed() {
  return (
    <PanelLayout
      title="Historial de citas"
      subtitle="Panel médico"
      userType="medico"
    >
      <section className="pp-greeting">
        <div>
          <h1>Historial de citas médicas</h1>
          <p>Contenido del historial de citas aparecerá aquí.</p>
        </div>
      </section>
    </PanelLayout>
  );
}