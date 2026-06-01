import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./BotonCerrarSesion.css";

const BotonCerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <Button
      type="button"
      label="Cerrar Sesión"
      onClick={handleLogout}
      className="pp-logout-header"
    />
  );
};

export default BotonCerrarSesion;