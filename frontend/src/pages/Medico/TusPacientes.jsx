import PanelLayout from "../../layouts/PanelLayout";

export default function TusPacientes() {
  return (
    <PanelLayout
      title="Tus Pacientes"
      subtitle="Lista de pacientes asignados"
      userType="medico"
    >
      <section className="pp-greeting">
        <div>
          <h1>Pacientes</h1>
          <p>Aquí podrás consultar la información de tus pacientes asignados.</p>
        </div>
      </section>
    </PanelLayout>
  );
}