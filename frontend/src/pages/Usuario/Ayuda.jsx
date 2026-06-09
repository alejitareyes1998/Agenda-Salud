import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const AyudaUsuario = () => {
const navigate = useNavigate();
return (
    // Contenedor principal de la página de ayuda
    <div
    className="flex align-items-center justify-content-center"
    style={{
        backgroundImage: "url('/imagenes/fondo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        padding: "0.5rem 0"
    }}
    >
      {/* Tarjeta principal de ayuda */}
    <Card
        className="shadow-8"
        style={{
        width: "24rem",
        borderRadius: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        fontSize: "12px"
        }}
    >
        <div className="flex flex-column align-items-center mb-4">
        <img
            src="/imagenes/logo.png"
            alt="Logo Agenda Salud"
            style={{ width: "100px" }}
        />

        <h2 className="text-900 font-bold mt-3 mb-0">¿Necesitas Ayuda?</h2>

        <p className="text-600 font-medium text-center">
            Información básica para el uso de Agenda Salud.
        </p>
        </div>

        {/* Contenido de ayuda para el usuario */}
        <div className="flex flex-column gap-1">
        <div>
            <h4>¿Cómo registrarse?</h4>
                <p>
                Para crear una cuenta, ingresa a la opción de registro desde la pantalla de inicio de sesión.
                Completa tus datos personales, selecciona tu tipo de documento, escribe tu número de documento,
                correo electrónico y una contraseña segura.
                </p>
                <p>
                La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula,
                un número y un carácter especial.
                </p>
        </div>

        <div>
            <h4>¿Cómo iniciar sesión?</h4>
                <p>
                Una vez registrado, vuelve a la pantalla de login e ingresa tu correo electrónico
                y contraseña. Si los datos son correctos, podrás acceder al sistema según tu tipo de usuario.
                </p>
        </div>

        <div>
            <h4>¿Cómo agendar una cita?</h4>
                <p>
                Después de iniciar sesión como paciente, ingresa al panel principal y busca la opción
                para agendar una cita médica. Allí podrás seleccionar el especialista, la fecha y el horario
                disponible.
                </p>
                <p>
                Antes de confirmar, revisa que la información de la cita sea correcta.
                </p>
        </div>

        <div>
            <h4>¿Cómo recuperar tu contraseña?</h4>

                <p>
                    Si olvidaste tu contraseña, puedes recuperarla desde la opción 
                    <strong> “¿Olvidaste tu contraseña?” </strong>
                    que aparece en la pantalla de inicio de sesión.
                </p>

                <p>
                    Al ingresar, escribe el correo electrónico registrado en tu cuenta y presiona el botón
                    <strong> “Recuperar Contraseña”</strong>.
                </p>

                <p>
                    El sistema enviará las instrucciones de recuperación al correo ingresado. 
                    Revisa tu bandeja de entrada y también la carpeta de spam o correo no deseado.
                </p>

                <p>
                    Si no recibes el mensaje o el correo no está registrado, comunícate con soporte para recibir ayuda.
                </p>
        </div>

        <div>
            <h4>¿Qué hacer si tienes problemas?</h4>
                <p>
                Verifica que todos los campos estén completos y que la información ingresada sea correcta.
                Si el problema continúa, comunícate con el personal encargado del sistema.
                </p>
        </div>
        </div>


    <Button
        type="button"
        label="Volver"
        onClick={() => navigate(-1)}
        className="w-full mt-4"
    />

    </Card>

    </div>
);
};

export default AyudaUsuario;