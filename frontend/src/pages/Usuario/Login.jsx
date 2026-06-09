import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; //Sirve para cambiar de pagina desde codigo
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios';
import { AlertaContext } from '../../context/AlertaContenedorContext';

const Login = () => {
    const navigate = useNavigate(); //Prepara la funcion para enviar al usuario de Login a otra pagina
    const { mostrarAlertaGlobal } = useContext(AlertaContext);
    // 1. Estados para guardar lo que el usuario escribe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Intentando ingresar:", email, password);

        try {
            const respuesta = await axios.post('http://localhost:3000/api/usuario/login', {
                correo: email,
                password: password
            });

            if (respuesta.data && respuesta.data.token) {
                localStorage.setItem('token_agenda', respuesta.data.token);

                const datosUnificados = respuesta.data.usuario ? respuesta.data.usuario : respuesta.data;
                const idUsuario = datosUnificados.id_usuario ?? datosUnificados.id ?? null;
                const nombreCompleto = [datosUnificados.nombre, datosUnificados.apellido].filter(Boolean).join(' ').trim();

                localStorage.setItem('rol_usuario', datosUnificados.tipo_usuario);
                localStorage.setItem('nombre_usuario', nombreCompleto || datosUnificados.nombre || 'Paciente');
                localStorage.setItem('tipo_usuario', datosUnificados.tipo_usuario);
                if (idUsuario) {
                    localStorage.setItem('id_usuario', String(idUsuario));
                }
                //props.onLoginSuccess();
                const rolUsuario = datosUnificados.tipo_usuario;

                if (rolUsuario === 'admin') {
                    mostrarAlertaGlobal('¡Inicio Exitoso!', 'Bienvenido Administrador.', 'success');
                    setTimeout(() => navigate('/admin'), 3000);
                } else if (rolUsuario === 'medico') {
                    mostrarAlertaGlobal('¡Inicio Exitoso!', 'Bienvenido Doctor(a).', 'success');
                    setTimeout(() => navigate('/panel-medico'), 3000);
                } else {
                    mostrarAlertaGlobal('¡Inicio Exitoso!', 'Bienvenido a su portal de salud.', 'success');
                    setTimeout(() => navigate('/panel-paciente'), 3000);
                }
            }
        } catch (error) {
            console.log("Error completo:", error.response?.data || error.message);
            // 1. Si el servidor esta caido o MySQL no responde.
            if (!error.response) {
                mostrarAlertaGlobal('Error de Conexion', 'No se pudo establecer comunicacion con el centro medico. Intentelo mas tarde.', 'error');
            }
            // 2. Si el backend si responde, pero rechaza las credenciales (Codigo 401, 400, etc)
            mostrarAlertaGlobal('Acceso Invalido', 'Usuario o contraseña incorrectos. Verifica la informacion e intenta nuevamente.', 'error');
        }
    };

    return (
        <div className='flex align-items-center justify-content-center'
        style={{
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
            <Card 
            className='shadow-8'
             style={{
                 //width: '20rem',
                 minHeight: '420px',
                  borderRadius: '15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  paddingTop: '10px'
                 }}>
                <div className='flex flex-column align-items-center mb-'>
                    <img src='/imagenes/logo.png'
                     alt='Logo Agenda Salud'
                      style={{ width: '120px'
                       }}
                        />
                    <h2 className='text-900 font-bold mt-0 mb-0'>Bienvenido</h2>
                    <p className='text-600 font-mediun'></p>
                </div>

                <form onSubmit={handleLogin} className='flex flex-column gap-2 w-full'>
                    <div className='flex flex-column gap-1 w-full'>
                        <label className='email' className='text-sm font-bold'>Correo Electronico</label>
                        <InputText
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='usuario@correo.com'
                            className='w-full p-inputtext-sm placeholder:font-bold font-bold'
                            style={{ height: '38px', fontSize: '15px' }}
                        />
                    </div>

                    <div className='flex flex-column gap-1 w-full'>
                        <label htmlFor='password' title='Contraseña' className='text-sm font-bold'>Contraseña</label>
                        <Password
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                            className='w-full'
                            style={{ width: '100%', height: '38px'  }}
                            inputClassName='w-full placeholder:font-semibold'
                            inputStyle={{ width: '100%', height: '100%', fontSize:'15px', fontWeight: 'bold'  }}
                            placeholder='Minimo 8 Caracteres'
                           
                        />
                    </div>

                    <div className='flex flex-column gap-2 mt-2'>
                        <Button
                            type="submit"
                            label='Ingresar'
                            className='w-full mt-1'
                            style={{
                                background: 'linear-gradient(to right, #89cff0 0%, #b3e5fc 100%)',
                                border: ' none',
                                color: '#455a64',
                                fontWeight: 'bold',
                                height: '35px', fontSize: '16px',
                                fontWidth: '600'
                            }}
                        />

                        <Button
                            type="button"
                            label='Registrarse'
                            onClick={() => navigate('/registro')}
                            className='w-full mt-1'
                            style={{
                                background: ' linear-gradient(to right, #e1bee7 0%, #f3e5f5 100%)',
                                border: 'none',
                                color: '#455a64',
                                fontWeight: 'bold',
                                 height: '35px', fontSize: '16px',
                                 fontWidth: '600'
                            }}
                        />
                    </div>

                    <div className='text-center mt-[15px] w-full' style={{ display: 'block', width: '100%' }}>
                        <span
                            onClick={() => navigate('/recuperar-contrasena')}
                            className='no-underline text-primary font-bold cursor-pointer'
                            style={{ fontSize: '15px', display: 'inline-block', width: '100%' }}
                        >
                            ¿Olvidaste tu contraseña?
                        </span>
                    </div>
                </form>
            </Card>


        </div>
    );
};

export default Login;