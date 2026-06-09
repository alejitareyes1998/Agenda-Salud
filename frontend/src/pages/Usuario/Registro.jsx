
import { useState, useContext } from "react"; // Permite guardar y actualizar los datos que el usuario escribe en el formulario
import { useNavigate } from "react-router-dom"; // Permite redirigir al usuario a la página de login después de registrarse
import { Card } from "primereact/card"; //Se importa el componente Card de PrimeReact para crear una tarjeta de Registro
import { InputText } from "primereact/inputtext"; // Formulario de texto para escribir datos como nombre, apellido, documento y correo.
import { Password } from "primereact/password"; // Campo de contraseña con botón para mostrar u ocultar
import { Button } from "primereact/button"; //Boton de registro
import BotonAyuda from '../../components/BotonAyuda';
import axios from "axios"; // Permite enviar los datos del registro al backend
import { AlertaContext } from  "../../context/AlertaContenedorContext";
//import { classNames } from "primereact/utils";

//Estados que guardan los datos del usuario
const Registro = () => {
  const { mostrarAlertaGlobal } =useContext(AlertaContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
 
  const opcionesTipoDocumento = [
    { label: 'Cédula de Ciudadania', value: 'cedula_de_ciudadania' },
    { label: 'Tarjeta de identidad', value: 'tarjeta_identidad' },
    { label: 'Pasaporte', value: 'pasaporte' },
    { label: 'Cédula de extranjería', value: 'cedula_extranjeria' },
    { label: 'Registro Civil', value: 'registro_civil' }
  ];
  const opcionesTipoUsuario = [
    { label: 'Paciente', value: 'paciente' },
    { label: 'Medico', value: 'medico' }
  ];

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');  // Estado para confirmar que la contraseña escrita sea igual
  
  const handleRegistro = async (e) => {
    e.preventDefault();

  // Valida que todos los campos estén completos
  if (!nombre || !apellido || !tipoDocumento || !documento || !correo || !password  || !confirmarPassword || !tipoUsuario) 
    {
      mostrarAlertaGlobal("Todos los campos son obligatorios");
      return;
    }

    
// Validamos que el documento solo contenga números
const documentoValido = /^[0-9]+$/;

if (!documentoValido.test(documento)) {
  mostrarAlertaGlobal("El documento solo debe contener números");
  return;
}

// Validamos que el correo tenga un formato válido
const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!correoValido.test(correo)) {
  mostrarAlertaGlobal("Ingresa un correo electrónico válido");
  return;
}

  // Validamos que la contraseña sea segura: mínimo 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial
const passwordValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;



  if (!passwordValida.test(password)) {
    mostrarAlertaGlobal("La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial");
    return;
}

// Validamos que ambas contraseñas coincidan
if (password !== confirmarPassword) {
  mostrarAlertaGlobal("Las contraseñas no coinciden");
  return;
}

    try {
      console.log("tipo_documento:", tipoDocumento);
      const respuesta = await axios.post("http://localhost:3000/api/usuario", {
        nombre,
        apellido,
        tipo_documento: tipoDocumento,
        documento,
        correo,
        password,
        tipo_usuario: tipoUsuario
      });
    
      console.log("Respuesta del backend:", respuesta.data);
      mostrarAlertaGlobal("¡Datos guardados!", "Continuar Registro", "success");
      if (tipoUsuario === 'paciente') {
        navigate('/registro-paciente', { state: { usuarioId: respuesta.data.id_usuario } });
      } else if (tipoUsuario === 'medico') {
        navigate('/registro-medico', { state: { datosUsuario:{ id_usuario: respuesta.data.id_usuario, nombre: nombre } } });
      }

     } catch (error) {
      console.log("Error al registrar:", error.response?.data || error.message);
      mostrarAlertaGlobal("Error al registrarse");
    }
  };


  return (
   //Contenedor principal de registro
    <div
      className='flex align-items-center justify-content-center'
      style= {{
        backgroundImage: "url('/imagenes/fondo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem 0',
        overflow: 'auto'
      }}
    >

      <Card
      className="shadow-8 w-full md:w-22rem flex-column justify-content-start"
      style= {{
        margin: '0 auto',
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: '0px 15px 0px 15px',
        minHeight: '380px' 
      }}
      >

    <div className="-mt-3 flex flex-column align-items-center mb-0">

      <img
        src="/imagenes/logo.png"
        alt="Logo Agenda Salud"
        style={{ width: '120px' }} // Aumento tamaño del Logo
      />

      <h2 className="text-xl font-bold mt-0 mb-0 text-900">Registrarse</h2>

      <p className="text-700 font-semibold">
        Ingrese sus datos personales
      </p>
    </div>

    {/*Formulario de registro*/}
      <form onSubmit={handleRegistro} className="flex flex-column gap-2 ">
     
          <>
        <div className="flex flex-column gap-1 w-full">
         <InputText
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full h-1.5rem p-1"
            style={{ fontWeight: '600'}}
          />
        </div>

        {/* Campo para escribir el apellido del usuario */}
        <div className="flex flex-column gap-1 w-full">
          

          <InputText
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apelllido"
            className="w-full h-1.5rem p-1"
            style={{ fontWeight: '600'}}
          />
        </div>

        {/* Campo para seleccionar el tipo de documento */}
        <div className="flex flex-column gap-1 w-full" style={{ position: 'relative' }} >
          {!tipoDocumento && (
            <span style={{position: 'absolute',
              left: '3px',
              top: '20%',
              transform: 'translayeY(-50%)',
              color: '#777373',
              fontWeight: '600',
              pointerEvents: 'none',
              fontSize: '1rem'
            }}>
              Tipo de Documento
            </span>
          )}
           <select
            id="tipoDocumento"
            value={tipoDocumento || ""}
            onChange={(e) => {
              console.log("valor seleccionado:", e.target.value);
              setTipoDocumento(e.target.value); 
            }}
             
            className="w-full p-inputtext"
            style={{ height: '2rem', fontWeight: '600', paddingLeft: '10px', borderRadius: '6px',
               appearance: 'auto' }}
           >
            <option value=""disabled hidden></option>
            {opcionesTipoDocumento && opcionesTipoDocumento.map((opt) => (
             <option key={opt.value}  value={opt.value}>{opt.label}</option>
            ))}
              
            </select>
            

           
      
        </div>
        
        {/* Campo para escribir el documento del usuario */}
        <div className="w-full">
          

          <InputText
            id="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}     
            placeholder="Numero de Documento"
            className="w-full h-1.5rem p-1"
            style={{ fontWeight: '600'}}
          />
        </div>

        {/* Campo para escribir el correo del usuario */}
        <div className="flex flex-column gap-1 w-full">
          

          <InputText
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="ejemplo@correo"
            className="w-full h-1.5rem p-1"
            style={{ fontWeight: '600'}}
          />
        </div>
          
        {/* Campo para escribir la contraseña del usuario */}
        <div className="flex flex-col gap-2 w-full" style={{ display: 'flex', flexDirection: 'column', writingMode: 'horizontal-tb' }}>
          
          <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          toggleMask
          feedback={false}
          className="w-full"
          style={{ width: '100%', display: 'block',  writingMode: 'horizontal-tb' }}
          inputStyle={{ width: '100%', height: '2rem', padding: '0.5rem 0.75rem', fontSize: '16px', fontWeight: '600' }}
            pt={{ 
            root: { style: { paddingLeft: '0px'} },
            input: { style: { paddingLeft: '2px', marginLeft: '0px', textAlign: 'left' }}
           }}
         />
      </div>


        {/*Confirmacion de contraseña*/}
        <div className="flex flex-column gap-2 w-full">
          
          <Password
          id="confirmarContrasena"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          placeholder="Confirmar Contraseña"
          toggleMask
          feedback={false}
          style={{ width: '100%', display: 'block',  writingMode: 'horizontal-tb' }}
          inputStyle={{ width: '100%', height: '2rem', padding: '0.5rem 0.75rem', fontSize: '16px', fontWeight: '600' }}
            pt={{ 
            root: { style: { paddingLeft: '0px'} },
            input: { style: { paddingLeft: '2px', marginLeft: '0px', textAlign: 'left' }}
           }}
         />
                  {/*Tipo usuario*/}
        </div>
        <>
        <div className="flex flex-column gap-1 mt-2" style={{ position: 'relative' }}>
          {!tipoUsuario && (
            <span style={{position: 'absolute',
              left: '3px',
              top: '20%',
              transform: 'translayeY(-50%)',
              color: '#777373',
              fontWeight: '600',
              pointerEvents: 'none',
              fontSize: '1rem'
            }}>
              Tipo de Documento
            </span>
          )}
           <select
            id="tipoUsuario"
            value={tipoUsuario || ""}
            onChange={(e) => {
              console.log("valor seleccionado:", e.target.value);
              setTipoUsuario(e.target.value); 
            }}
             className="w-full p-inputtext"
            style={{ height: '2rem', fontWeight: '600', paddingLeft: '10px', borderRadius: '6px',
               appearance: 'auto' }}
            
           >
            <option value=""disabled hidden></option>
            {opcionesTipoUsuario&& opcionesTipoUsuario.map((opt) => (
             <option key={opt.value}  value={opt.value}>{opt.label}</option>
            ))}
              
            </select>
          
            </div> 
          </>
        {/* Botón de registro */}
        <Button
          type="submit"
          label="Continuar"
          className="w-full"
          style={{ height: '1.8rem', padding: '0px', paddingBottom: '0px',
             fontSize: '16px', fontWeight: '600'}}
        />

        {/*Boton Ya tengo Cuenta*/}
        <Button
        type="button"
        label="Ya tengo una cuenta"
        className="w-full"
        style={{ height: '1.8rem', padding: '0px', paddingBottom: '0px',
           fontSize: '16px',  fontWeight: '600'}}
        onClick={() => navigate ('/login')}
        />
        </>
     
      </form>

      </Card>

      <BotonAyuda />

    </div>
  );
};
export default Registro;