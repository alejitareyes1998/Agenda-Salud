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
        position: "fixed",
        bottom: "20px",
        left: "20px",
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        color: "#455a64",
        fontWeight: "bold",
        zIndex: 1000
      }}
    />
  );
};

export default BotonAtras;