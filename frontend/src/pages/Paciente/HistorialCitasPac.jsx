import PanelLayout from "../../layouts/PanelLayout";

export default function HistorialCitasPac() {
  return (
    <PanelLayout
      title="Historial de citas"
      subtitle="Revisa tus citas pasadas y sus detalles"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Historial de citas</h1>
          <p>Revisa tus citas pasadas y sus detalles.</p>
        </div>
      </section>
    </PanelLayout>
  );
}