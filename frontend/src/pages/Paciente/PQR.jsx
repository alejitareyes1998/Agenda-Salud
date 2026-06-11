import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";

export default function PQR() {
  const [tipoSolicitud, setTipoSolicitud] = useState("peticion");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mensaje.trim()) {
      alert("Escribe el detalle de tu solicitud para poder enviarla.");
      return;
    }

    setEnviado(true);
  };

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