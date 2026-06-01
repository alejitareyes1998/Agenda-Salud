// Importamos nodemailer para enviar correos
const nodemailer = require('nodemailer');

// Configuración del correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CORREO_APP,
        pass: process.env.PASSWORD_APP
    }
});

// Función para enviar el código
const enviarCodigoRecuperacion = async (correoDestino, codigoRecuperacion) => {

    // Enviamos el correo
    await transporter.sendMail({
        from: process.env.CORREO_APP,
        to: correoDestino,
        subject: 'Código de recuperación - Agenda Salud',

        html: `
            <h2>Recuperación de contraseña</h2>
            <p>Tu código de recuperación es:</p>
            <h1>${codigoRecuperacion}</h1>
            <p>Ingresa este código en Agenda Salud para continuar.</p>
        `
    });

    // Confirmación en consola
    console.log('Correo enviado correctamente a:', correoDestino);
};

module.exports = {
    enviarCodigoRecuperacion
};