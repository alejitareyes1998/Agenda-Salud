import PanelLayout from "../../layouts/PanelLayout";

export default function PerfilPaciente() {
  return (
    <PanelLayout
      title="Perfil del paciente"
      subtitle="Actualiza tus datos personales"
      userType="paciente"
    >
      <section className="pp-greeting">
        <div>
          <h1>Mi perfil</h1>
          <p>Aquí puedes ver y editar tu información personal.</p>
        </div>
      </section>
    </PanelLayout>
  );
}