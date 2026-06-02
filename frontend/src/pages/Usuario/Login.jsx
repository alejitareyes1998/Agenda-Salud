import  { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; //Sirve para cambiar de pagina desde codigo
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import BotonAyuda from '../../components/BotonAyuda';
import  axios  from 'axios';
const Login = () => {
    const navigate = useNavigate(); //Prepara la funcion para enviar al usuario de Login a otra pagina
    // 1. Estados para guardar lo que el usuario escribe
    const toast = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        // Aqui se concta con el archivo usuarioApi.js mas adelante
        console.log("Intentando ingresar:", email, password);
        //Peticion HTTP al backend
        try {
            const respuesta = await axios.post('http://localhost:3000/api/usuario/login', {
                correo: email,
                password: password
            });
            // Validacion del token
            if (respuesta.data && respuesta.data.token) {
            // Guardamos el el token de seguridad
                localStorage.setItem('token_agenda', respuesta.data.token);

                const datosUnificados = respuesta.data.usuario? respuesta.data.usuario : respuesta.data;
                localStorage.setItem('rol_usuario', datosUnificados.tipo_usuario);
                localStorage.setItem('nombre_usuario', datosUnificados.nombre);
                localStorage.setItem('tipo_usuario', datosUnificados.tipo_usuario);
                // Mensaje de ingreso exitoso
                    toast.current.show({
                        severity: 'success',
                        position: 'top-center',
                        summary: 'Bienvenido',
                        detail: 'inicio de sesion',
                        life: 4000
                    });
                    setTimeout(() => {
                    navigate('/inicio');
                }, 4000);
            }
         } catch (error) {
            console.log("Error completo:", error.response?.data || error.message);
                toast.current.show({
                severity: 'error',
                summary: 'Acceso Denegado',
                detail: 'Correo o Contraseña incorrectos.',
                life: 4000,
                icon: <i className='pi pi-times-circle' style={{ color: '#0b3dc6' }}></i>,
                closeIcon: <i className='pi pi-times' style={{ color: '#0b3dc6' }}></i>,
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.85', //Blanco Transparente
                    backdropFilter: 'blur(4px)',                //Efecto borroso
                    color: '#58b7e2',                        //Texto morado
                    borderLeft: '6px solid #3a73ed'          //Barra lateral
                }
                
            });
                
          }
    };
    return (
        //Usamos PrimeFlex para centrar todo en la pantalla
        <div className= 'flex align-items-center justify-content-center' style={{
            backgroundImage: "url('/imagenes/fondo.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0
        }}>
            {/*Bienvenida Flotante */}
            <Toast ref={toast} position="top-center" />
            {/* Contenedor Principal*/ }
            <Card className='shadow-8 p-0' style={{ width: '18rem', height: '500px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.92)' }}>
                <div className='flex flex-column align-items-center mt-0 pt-0 mb-1'>
                    <img src='/imagenes/logo.png' alt='Logo Agenda Salud' style={{ width: '100px' }} />
                    <h2 className='text-900 font-bold mt- mb-0' style={{ fontSize: '1.4rem' }}>BIENVENIDOS</h2>
                </div>

        <form onSubmit={handleLogin} className='flex flex-column gap-1.5' style={{ padding: '0 15px' }}>
            <div className='flex flex-column gap-1'>
                <label htmlFor='email' className='font-semibold text-base text-800 text-sm'>Correo Electronico</label>
                    <InputText id='email' type='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2'
                    required />
                </div>
            
            <div className='flex flex-column gap-1 mb-3'>
                <label htmlFor='password'title='Contraseña' className='font-semibold text-base text-800 text-sm'> Contraseña</label>
                    <Password id='password' value={password} onChange={(e) => setPassword(e.target.value)}
                    feedback={false}
                    toggleMask 
                    style={{ width: '100%', height: '39px' }}
                    inputStyle={{ width: '100%', height: '100%' }}
                    required />
            </div>

             <Button
                label='Ingresar'
                type='submit'
                className='w-full p-2 font-bold'
                style={{
                    background: 'linear-gradient(to right, #99d4ef 0%, #b3e5fc 100%)',
                    border: ' none',
                    color: '#455a64',
                    fontWeight: 'bold'
                }}
            />

            <Button
                type="button"
                label='Registrarse' 
                onClick={() => navigate('/registro')} //Ruta de navegacion para pasar al registro
                className='w-full p-2 font-bold'
                style={{
                    background: ' linear-gradient(to right, #ddb0f0 0%, #d1ade5 100%)',
                    border: 'none',
                    color: '#455a64',
                    fontWeight: 'bold'
                }}
            />
         </form>
            
            <div className='flex justify-content-center mt-3 text-sm'>
            {/* Link para ir a la página de recuperar contraseña */}
                <Link
                   to='/recuperar-contrasena'
                    className='text-primary cursor-pointer'
                    > 
                    ¿Olvidaste tu contrasena?
                </Link>
            </div>
          </Card>
       <BotonAyuda />
    </div>
    );
};

export default Login;