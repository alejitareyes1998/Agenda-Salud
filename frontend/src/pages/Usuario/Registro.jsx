import { useState } from "react"; // Permite guardar y actualizar los datos que el usuario escribe en el formulario
import { useNavigate } from "react-router-dom"; // Permite redirigir al usuario a la página de login después de registrarse
import { Card } from "primereact/card"; //Se importa el componente Card de PrimeReact para crear una tarjeta de Registro
import { InputText } from "primereact/inputtext"; // Formulario de texto para escribir datos como nombre, apellido, documento y correo.
import { Password } from "primereact/password"; // Campo de contraseña con botón para mostrar u ocultar
import { Button } from "primereact/button"; //Boton de registro
import BotonAyuda from '../../components/BotonAyuda';

import { Dropdown } from "primereact/dropdown"; // Componente desplegable para seleccionar el tipo de documento

import axios from "axios"; // Permite enviar los datos del registro al backend

//Estados que guardan los datos del usuario
const Registro = () => {
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
      alert("Todos los campos son obligatorios");
      return;
    }

    
// Validamos que el documento solo contenga números
const documentoValido = /^[0-9]+$/;

if (!documentoValido.test(documento)) {
  alert("El documento solo debe contener números");
  return;
}

// Validamos que el correo tenga un formato válido
const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!correoValido.test(correo)) {
  alert("Ingresa un correo electrónico válido");
  return;
}

  // Validamos que la contraseña sea segura: mínimo 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial
const passwordValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;



  if (!passwordValida.test(password)) {
    alert("La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial");
    return;
}

// Validamos que ambas contraseñas coincidan
if (password !== confirmarPassword) {
  alert("Las contraseñas no coinciden");
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
      alert("Continuar registro");
      if (tipoUsuario === 'paciente') {
        navigate('/registro-paciente', { state: { usuarioId: respuesta.data.id_usuario } });
      } else if (tipoUsuario === 'medico') {
        navigate('/registro-medico', { state: { datosUsuario:{ id_usuario: respuesta.data.id_usuario, nombre: nombre } } });
      }

     } catch (error) {
      console.log("Error al registrar:", error.response?.data || error.message);
      alert("Error al registrarse");
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
      className="shadow-8 w-full md:w-25rem"
      style= {{
        width: '360px',
        margin: '0 auto',
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}
      >

    <div className="flex flex-column align-items-center mb-4">

      <img
        src="/imagenes/logo.png"
        alt="Logo Agenda Salud"
        style={{ width: '150px' }} // Aumento tamaño del Logo
      />

      <h2 className="text-900 font-bold mt-3 mb-0">REGISTRO</h2>

      <p className="text-600 font-medium">
        Complete el formulario para registrarse
      </p>
    </div>

    {/*Formulario de registro*/}
      <form onSubmit={handleRegistro} className="flex flex-column gap-3 ">
        <div className="flex flex-column gap-2">
          <label htmlFor="nombre" className="text-sm font-bold">
            Nombre
          </label>

          <InputText
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full"
          />
        </div>

        {/* Campo para escribir el apellido del usuario */}
        <div className="flex flex-column gap-2">
          <label htmlFor="apellido" className="text-sm font-bold">
            Apellido
          </label>

          <InputText
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            className="w-full"
          />
        </div>

        {/* Campo para seleccionar el tipo de documento */}
        <div className="flex flex-column gap-2">
          <label htmlFor="tipoDocumento" className="text-sm font-bold">
            Tipo de documento
          </label>

          <Dropdown
            id="tipoDocumento"
            value={tipoDocumento}
            onChange={(e) => {
              console.log("Valor seleccionado:", e.value);
              setTipoDocumento(e.value);
            }}
            options={opcionesTipoDocumento}
            placeholder="Seleccione tipo de documento"
            className="w-full"
          />
        </div>
        
        {/* Campo para escribir el documento del usuario */}
        <div className="flex flex-column gap-2">
          <label htmlFor="documento" className="text-sm font-bold">
            Documento
          </label>

          <InputText
            id="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Documento"
            className="w-full"
          />
        </div>

        {/* Campo para escribir el correo del usuario */}
        <div className="flex flex-column gap-2">
          <label htmlFor="correo" className="text-sm font-bold">
            Correo
          </label>

          <InputText
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            className="w-full"
          />
        </div>

        
        {/* Campo para escribir la contraseña del usuario */}
        <div className="flex flex-column gap-2">
          <label htmlFor="password" className="text-sm font-bold">
            Contraseña
          </label>

          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            toggleMask
            feedback={false}
            className="w-full"
            inputClassName="w-full"
          />
        </div>

        {/*Confirmacion de contraseña*/}
        <div className="flex flex-column gap-2">
          <label htmlFor="confirmarPassword" className="text-sm font-bold">
            Confirmar contraseña
          </label>

          <Password
            id="confirmarPassword"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            toggleMask
            feedback={false}
            className="w-full"
            inputClassName="w-full"
          />
        </div>
        <div className="flex flex-column gap-2 mt-3">
           <label htmlFor="tipoUsuario" className="text-sm font-bold">
             Tipo Usuario
           </label>
           <Dropdown
           id="tipoUsuario"
           value={tipoUsuario}
           options={opcionesTipoUsuario}
           onChange={(e) => setTipoUsuario(e.value)}
           placeholder="Seleccione su rol"
           className="w-full" />

        </div>

        {/* Botón de registro */}
        <Button
          type="submit"
          label="Registrarse"
          className="w-full mt-2 btn-principal"
        />

        {/*Boton Ya tengo Cuenta*/}
        <Button
        type="button"
        label="Ya tengo una cuenta"
        onClick={() => navigate ('/login')}
        />

      </form>

      </Card>

      <BotonAyuda />

    </div>
  );
};
export default Registro;