const jwt = require('jsonwebtoken');
const protegerRuta = (req, res, next) => {
    // Buscamos la llave digital en los encabezados de la peticion
    const token = req.headers['authorization'];
    if (!token) {
        // Si no hay llave, el guardian bloquea la entrada
        return res.status(401).json({ mensaje: "aceso denegado. no tiene token de seguridad." });
    }
    try {
        // Si hay llave, verificamos que sea la original del proyecto
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_de_emergencia');
        req.usuario = verificado;
        next(); // ¡LLave correcta ! el guardian da acceso a la base de datos
    } catch (error) {
        return res.status(403). json({ mensaje: "Token invalido o expirado."});
    }
};
module.exports = protegerRuta;
