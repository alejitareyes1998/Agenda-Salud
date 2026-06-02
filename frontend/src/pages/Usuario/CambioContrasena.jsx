import { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password} from 'primereact/password';
import axios from 'axios';

              // 1. Variables para contraseña
    const CambiarContrasena =() => {
    const navigate = useNavigate();
    // Guardar contraseña nueva
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    // Confirmar nueva contraseña
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    // Funcion asincronica para cambiar contraseña en el Backend
    const handleCambiarContrasena = async (e) => {
        e.preventDefault();
        //validamos que la nueva contraseña no este vacia
        if (!nuevaContrasena.trim()) {
            alert('Por favor ingresar nueva contraseña.');
            return;
        }
        // Validamos que la confirmacion no este vacia
        if (!confirmarContrasena.trim()) {
            alert('Por favor confirmar la nueva contraseña.');
            return;
        }
        // Validamod que tenga minimo una letra mayuscula
        if (!/[A-Z]/.test(nuevaContrasena)) {
            alert('La nueva contraseña deba tener al menos una letra mayuscula.');
            return;
        }
        // Validamos que tenga minimo una letra minuscula
        if(!/[a-z]/.test(nuevaContrasena)) {
            alert('La nueva contraseña debe tener al menos una letra minuscula.');
            return;
        }
        // Validamos que tenga minimo 4 numeros
        const cantidadNumeros=nuevaContrasena.replace(/[^0-9]/g,'').length;
            if (cantidadNumeros<4) {
                alert('La nueva contraseña debe tener al menos 4 numeros.');
                return;
            }
            // Validamos que tenga nimo un caracter especial
            if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];]/.test(nuevaContrasena)) {
                alert('La nueva contraseña debe tener al menos un caracter especial.');
                return;
            }
            // Validamos que ambas contraseñas coincidan
            if (nuevaContrasena !== confirmarContrasena) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            // Obtenemos el codigo que fue validado anteriormente
            const codigoRecuperacion = localStorage.getItem('codigoRecuperacion');
            // Validamos que exista el codigo
            if (!codigoRecuperacion) {
                alert('No se encontro un codigo de recuperacion valido.');
                return;
            }
            // Enviamos la nueva contraseña al backend
        try {      
        
           const respuesta = await axios.put('http://localhost:3000/api/usuario/cambiar-contrasena', {
           codigo: codigoRecuperacion,
           nuevaContrasena: nuevaContrasena
           
 });
        if (respuesta.status === 200) {
         alert('Contraseña cambiada exitosamente');
         navigate('/login');
        }
  } catch (error) {
    console.log('Error al cambiar la contraseña:', error.response?.data || error.message);
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
                    width: '18rem',
                    height: '500px',
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    padding: '10px 0px 5px 0px'
                }}
            >
            <div className='flex flex-column align-items-center mb-4'>
                {/* Logo */}
                <img
                    src='/imagenes/logo.png'
                    alt='Logo Agenda Salud'
                    style={{ width: '100px' }}
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
export default CambiarContrasena;