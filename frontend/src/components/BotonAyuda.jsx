import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const BotonAyuda = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      label="¿Necesitas ayuda?"
      onClick={() => navigate("/ayuda")}
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        color: "#455a64",
        fontWeight: "bold",
        marginLeft: "auto" // 👈 ESTA ES LA CLAVE
      }}
    />
  );
};

export default BotonAyuda;