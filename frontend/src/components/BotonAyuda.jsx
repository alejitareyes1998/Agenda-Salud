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
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(184, 245, 243, 0.9)",
        border: "none",
        color: "#455a64",
        fontWeight: "bold",
        zIndex: 1000
      }}
    />
  );
};

export default BotonAyuda;