import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";

export default function PQR() {
  const [tipo, setTipo] = useState("Petición");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const enviarPQR = (e) => {
    e.preventDefault();

    if (!asunto.trim() || !descripcion.trim()) {
      alert("Por favor complete todos los campos.");
      return;
    }

    alert("Solicitud enviada correctamente.");

    setTipo("Petición");
    setAsunto("");
    setDescripcion("");
  };

  return (
    <PanelLayout
      title="PQR"
      subtitle="Peticiones, Quejas, Reclamos y Sugerencias"
      userType="paciente"
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "30px auto",
          padding: "35px",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          backdropFilter: "blur(5px)",
        }}
      >
        <h2
          style={{
            marginBottom: "10px",
            color: "#1f2937",
          }}
        >
          Peticiones, Quejas, Reclamos y Sugerencias
        </h2>

        <p
          style={{
            marginBottom: "25px",
            color: "#64748b",
          }}
        >
          Utilice este formulario para registrar una petición, queja,
          reclamo o sugerencia relacionada con nuestros servicios.
        </p>

        <form onSubmit={enviarPQR}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600" }}>
              Tipo de solicitud
            </label>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #dbe2ea",
              }}
            >
              <option>Petición</option>
              <option>Queja</option>
              <option>Reclamo</option>
              <option>Sugerencia</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600" }}>
              Asunto
            </label>

            <input
              type="text"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Ingrese el asunto"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #dbe2ea",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600" }}>
              Descripción
            </label>

            <textarea
              rows="6"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describa detalladamente su solicitud"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid #dbe2ea",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </PanelLayout>
  );
}