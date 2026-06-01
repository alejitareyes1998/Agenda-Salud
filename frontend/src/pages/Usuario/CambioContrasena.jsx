import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios';

// Página para cambiar la contraseña
const CambiarContrasena = () => {
    const navigate = useNavigate();
    // Estado para guardar la nueva contraseña
    const [nuevaContrasena, setNuevaContrasena] = useState('');

    // Estado para confirmar la nueva contraseña
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    // Función asíncrona para cambiar la contraseña en el backend
    const handleCambiarContrasena = async (e) => {
    e.preventDefault();

    // Validamos que la nueva contraseña no esté vacía
    if (!nuevaContrasena.trim()) {
        alert('Por favor ingresa la nueva contraseña.');
        return;
    }

    // Validamos que la confirmación no esté vacía
    if (!confirmarContrasena.trim()) {
        alert('Por favor confirma la nueva contraseña.');
        return;
    }
    // Validamos que tenga al menos una letra mayúscula
    if (!/[A-Z]/.test(nuevaContrasena)) {
        alert('La contraseña debe tener al menos una letra mayúscula.');
        return;
    }

    // Validamos que tenga al menos una letra minúscula
    if (!/[a-z]/.test(nuevaContrasena)) {
        alert('La contraseña debe tener al menos una letra minúscula.');
        return;
    }

    // Validamos que tenga al menos 6 números
    const cantidadNumeros = nuevaContrasena.replace(/[^0-9]/g, '').length;

    if (cantidadNumeros < 6) {
        alert('La contraseña debe tener al menos 6 números.');
        return;
    }

    // Validamos que tenga al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(nuevaContrasena)) {
        alert('La contraseña debe tener al menos un carácter especial.');
        return;
    }

    // Validamos que ambas contraseñas sean iguales
    if (nuevaContrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
    }

        // Obtenemos el código que fue validado anteriormente
    const codigoRecuperacion = localStorage.getItem('codigoRecuperacion');

    // Validamos que exista el código antes de cambiar la contraseña
    if (!codigoRecuperacion) {
        alert('No se encontró un código de recuperación validado.');
        return;
    }

    // Enviamos la nueva contraseña al backend
try {
    const respuesta = await axios.put('http://localhost:3000/api/usuario/cambiar-contrasena', {
    codigo: codigoRecuperacion,
    nuevaContrasena: nuevaContrasena
});

    if (respuesta.status === 200) {
        alert('Contraseña recibida correctamente por el backend.');
        navigate('/login');
    }

} catch (error) {
    console.log('Error al cambiar contraseña:', error.response?.data || error.message);
    alert('No fue posible cambiar la contraseña.');
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
            <div className='flex flex-column align-items-center mb-4'>
                {/* Logo */}
                <img
                    src='/imagenes/logo.png'
                    alt='Logo Agenda Salud'
                    style={{ width: '150px' }}
                />

                {/* Título principal */}
                <h2 className='text-900 font-bold mt-3 mb-0'>
                    Cambiar Contraseña
                </h2>

                {/* Texto descriptivo */}
                <p className='text-600 font-medium text-center'>
                    Ingresa tu nueva contraseña.
                </p>

            </div>

            {/* Formulario para cambiar la contraseña */}
    <form onSubmit={handleCambiarContrasena} className='flex flex-column gap-3 w-full'>

        {/* Campo nueva contraseña */}
        <div className='flex flex-column gap-2'>

            <label htmlFor='nuevaContrasena' className='text-sm font-bold'>
                Nueva Contraseña
            </label>

            <Password
                id='nuevaContrasena'
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                placeholder='Ingrese la nueva contraseña'
                toggleMask
                feedback={false}
                className='w-full'
                inputClassName='w-full'
            />

        </div>

        {/* Campo confirmar contraseña */}
        <div className='flex flex-column gap-2'>

            <label htmlFor='confirmarContrasena' className='text-sm font-bold'>
                Confirmar Contraseña
            </label>

            <Password
                id='confirmarContrasena'
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                placeholder='Confirme la contraseña'
                toggleMask
                feedback={false}
                className='w-full'
                inputClassName='w-full'
            />
        </div>
        {/* Botón para guardar la nueva contraseña */}
            <Button
                type='submit'
                label='Guardar Contraseña'
                className='w-full mt-2 btn-principal p-button-sm'
            />
    </form>

           
        </Card>


        </div>
        
    );
}
// Exportamos la página
export default CambiarContrasena;