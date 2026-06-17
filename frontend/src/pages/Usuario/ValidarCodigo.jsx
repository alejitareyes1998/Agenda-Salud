import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios';


// Página para validar el código de recuperación
const ValidarCodigo = () => {
// Estado para guardar el código escrito por el usuario
const [codigo, setCodigo] = useState('');
// Preparamos la navegación entre páginas
const navigate = useNavigate();

// Función asíncrona para validar el código en el backend
const handleValidarCodigo = async (e) => {
    // Evita que la página se recargue
    e.preventDefault();

    // Validamos que el usuario haya escrito el código
    if (!codigo.trim()) {
        alert('Por favor ingresa el código de recuperación.');
        return;
    }

    // Enviamos el código al backend para validarlo
    try {
        const respuesta = await axios.post('http://localhost:3000/api/usuario/validar-codigo', {
            codigo: codigo
        });
    
        // Si el backend responde correctamente
        if (respuesta.status === 200) {
            // Guardamos temporalmente el código validado
            localStorage.setItem('codigoRecuperacion', codigo);
        
            alert('Código validado correctamente.');
        
            // Enviamos al usuario a cambiar contraseña
            navigate('/cambio-contrasena');
        }
    } catch (error) {
        // Mostramos el error en consola para revisar detalles
        console.log('Error al validar código:', error.response?.data || error.message);
    
        // Mensaje para el usuario
        alert('El código ingresado no es válido.');
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
            {/* Tarjeta principal */}
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

            {/* Logo */}
            <img
                src='/imagenes/logo.png'
                alt='Logo Agenda Salud'
                style={{ width: '100px' }}
            />

            {/* Título principal */}
            <h2 className='text-900 font-bold mt-3 mb-0'>
                Validar Código
            </h2>

            {/* Texto descriptivo */}
            <p className='text-600 font-medium text-center'>
                Ingresa el código de recuperación que te enviamos por correo
            </p>

        </div>

        {/* Formulario para validar el código */}
        <form onSubmit={handleValidarCodigo} className='flex flex-column gap-3 w-full'>

          {/* Campo del código */}
        <div className='flex flex-column gap-2'>

            <label htmlFor='codigo' className='text-sm font-bold'>
                Código de Recuperación
            </label>

            <InputText
                id='codigo'
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder='Ingrese el código'
                className='w-full'
            />

        </div>

        {/* Botón para validar el código */}
        <Button
            type='submit'
            label='Validar Código'
            className='w-full mt-2 btn-principal p-button-sm'
        />

    </form>


    </Card>

        </div>
    );
};

// Exportamos la página
export default ValidarCodigo;