import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import BotonAyuda from '../../components/BotonAyuda';
import axios from 'axios';


    const RecuperarContrasena = () => {

    // Estado para guardar el correo escrito por el usuario
    const [correo, setCorreo] = useState('');

    const navigate = useNavigate();
// Función asíncrona para enviar la solicitud al backend (espere la respuesta del backen antes de continuar)
    const handleRecuperarContrasena = async (e) => {
    e.preventDefault();

    if (!correo.trim()) {
        alert('Por favor ingresa tu correo electrónico.');
        return;
    }

    // Enviamos el correo al backend para solicitar la recuperación
    try {
        const respuesta = await axios.post('http://localhost:3000/api/usuario/recuperar-contrasena', {
            correo: correo
        });
    
        // Si el backend responde correctamente, mostramos mensaje de éxito
        if (respuesta.status === 200) {
            alert('Su correo a sido confirmado. Se ha enviado un código de recuperación a tu correo');
            navigate('/validar-codigo');
        }
        
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola
        console.log('Error al recuperar contraseña:', error.response?.data || error.message);
    
        // Mensaje para el usuario
        alert('No fue posible enviar la solicitud. Verifica que el correo esté registrado.');
    }
};

        return (
            // Contenedor principal de la página
            <div
                className='flex align-items-center justify-content-center'
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
                }}
            >

{/* Tarjeta principal del formulario */}
    <Card
        className='shadow-8'
        style={{
            width: '22rem',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
    >
{/* Contenedor del logo y textos */}
            <div className='flex flex-column align-items-center mb-4'>

                <img
                    src='/imagenes/logo.png'
                    alt='Logo Agenda Salud'
                    style={{ width: '150px' }}
                />

                <h2 className='text-900 font-bold mt-3 mb-0'>
                    Recuperar Contraseña
                </h2>

                <p className='text-600 font-medium text-center'>
                    Ingresa tu correo
                </p>

{/* Formulario para recuperar contraseña */}
        <form onSubmit={handleRecuperarContrasena} className='flex flex-column gap-3 w-full'>

            {/* Campo de correo */}
            <div className='flex flex-column gap-2'>

                {/* Texto del campo */}
                <label htmlFor='correo' className='text-sm font-bold'>
                    Correo Electrónico
                </label>

{/* Input donde el usuario escribe el correo */}
                <InputText
                    id='correo'
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder='prueba@ejemplo.com'
                    className='w-full p-inputtext-sm'
                />
            </div>

        <Button
        type='submit'
        label='Recuperar'
        className='w-full mt-2 btn-principal p-button-sm'
        />

        </form>

    {/* Botón para volver al login */}
        <Button
            type='button'
            label='Volver al Login'
            onClick={() => navigate('/login')}
            className='w-full mt-2 btn-principal p-button-sm'
        />

            </div>
    </Card>
    <BotonAyuda />
</div>
    );
};

// Exportamos la página
export default RecuperarContrasena;