import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./BotonCerrarSesion.css";

const BotonAtras = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      label="Atrás"
      onClick={() => navigate(-1)}
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        color: "#455a64",
        fontWeight: "bold"
      }}
    />
  );
};

export default BotonAtras;