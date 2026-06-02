import PanelLayout from "../../layouts/PanelLayout";

export default function PerfilMedico() {
  return (
    <PanelLayout
      title="Perfil Médico"
      subtitle="Información de tu perfil"
      userType="medico"
    >
      <section className="pp-greeting">
        <div>
          <h1>Perfil del médico</h1>
          <p>Aquí puedes ver y actualizar tus datos personales.</p>
        </div>
      </section>
    </PanelLayout>
  );
}