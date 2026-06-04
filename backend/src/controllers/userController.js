const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { enviarCodigoRecuperacion } = require('../utils/emailServices');
const jwt = require('jsonwebtoken');

loginUser = async (req, res) => {
    try {
        const { correo, password: contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios" });
        }

        const user = await User.findByEmail(correo);
        if (!user || user.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const usuarioReal = Array.isArray(user) ? user[0] : user;

        if (!usuarioReal) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const passwordGuardado = String(usuarioReal.password || '');
        const esHashSeguro = /^\$2[aby]\$\d{2}\$/.test(passwordGuardado);

        let passwordCorrecto = false;

        if (esHashSeguro) {
            passwordCorrecto = await bcrypt.compare(contrasena, passwordGuardado);
        } else {
            passwordCorrecto = passwordGuardado === contrasena;

            if (passwordCorrecto) {
                const salt = await bcrypt.genSalt(10);
                const passwordHasheado = await bcrypt.hash(contrasena, salt);
                const idUsuario = usuarioReal.id_usuario ?? usuarioReal.id;
                await User.updatePassword(idUsuario, passwordHasheado);
                const token = jwt.sign(
                    { id_usuario: idUsuario, tipo_ususario: usuarioReal.tipo_usuario },
                    'clave_secreta_de_emergencia',
                    {  expiresIn: '2h' }
                );
                return res.json({
                    token: token,
                    idusuario: idusuario,
                    usuario: {
                        tipo_usuario: usuarioReal.tipo_usuario,
                        nombre: usuarioReal.nombre || 'Usuario'
                    }
                });
            }
        }

        if (!passwordCorrecto) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta"});
        }

        const idUsuario = usuarioReal.id_usuario ?? usuarioReal.id;
        const token = jwt.sign(
           {id: idUsuario, tipo_usuario: usuarioReal.tipo_usuario },
           'mi_clave_secreta_del_sena_123',
           { expiresIn: '2h' }
        );
        res.json({
            mensaje:"Login exitoso",
            usuario: usuarioReal,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al buscar usuario" });
    }
};

// 2. Recuperar contraseña / Validar si el correo existe
recuperarContrasena = async (req, res) => {
    try {
        // Obtenemos el correo que llega desde el frontend
        const { correo } = req.body;

        // Validamos que el correo no venga vacío
        if (!correo) {
            return res.status(400).json({ mensaje: "El correo es obligatorio" });
        }

        // Buscamos el usuario por correo
        const user = await User.findByEmail(correo);

        // Si no existe ningún usuario con ese correo
        if (!user) {
            return res.status(404).json({ mensaje: "El correo no está registrado" });
        }

        // Si el correo existe, generamos un código aleatorio de 6 dígitos
        const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000);
        
        // Por ahora lo mostramos en consola para probar
        console.log("Código de recuperación:", codigoRecuperacion);

        // Guardamos el código en la base de datos
        await User.guardarCodigoRecuperacion(correo, codigoRecuperacion);

        // Enviamos el código al correo del usuario
        await enviarCodigoRecuperacion(correo, codigoRecuperacion);
        
        // Si el correo existe, respondemos correctamente SIN enviar el código por seguridad
        return res.status(200).json({
            mensaje: "Correo encontrado. Código generado correctamente."
        });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al recuperar contraseña" });
    }
};

// 3.Obtener los usuarios (GET)
        getAllUser = async (req, res) => {
            try {
                const users = await User.findAll();
                res.json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al obtener la lista de usuarios" });
        }
;}
        
    
// 4. Crear usuario (POST)
 createUser = async (req, res) => {
    try {
        const dataUsuario = req.body;
        // Encriptamos la contraseña
        const salt = await bcrypt.genSalt(10);
        dataUsuario.password = await bcrypt.hash(dataUsuario.password, salt);
        // Guardamos en la base de datos
        const id = await User.create(dataUsuario);
        res.status(201).json({ mensaje: "Usuario creado con exito", id_usuario: id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

// 5. Actualizar usuario (PUT)
 updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.update(id, req.body);
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
     } catch (error) {
        res.status(500).json({ error: error.message });
     }
};
// 4. Eliminar usuario (DELETE)
 deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.delete(id);
        res.json({ mensje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6.Validar código de recuperación
validarCodigoRecuperacion = async (req, res) => {
    try {
        // Obtenemos el código enviado desde el frontend
        const { codigo } = req.body;

        // Validamos que el código no venga vacío
        if (!codigo) {
            return res.status(400).json({ mensaje: "El código es obligatorio" });
        }

        // Buscamos si existe un usuario con ese código
        const user = await User.findByCodigoRecuperacion(codigo);

        // Si no existe ningún usuario con ese código
        if (!user) {
            return res.status(404).json({ mensaje: "Código inválido o vencido" });
        }

        // Si el código existe
        return res.status(200).json({
            mensaje: "Código validado correctamente"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor al validar el código" });
    }
};

// Cambiar contraseña usando el código de recuperación
cambiarContrasena = async (req, res) => {
    try {
        // Obtenemos el código y la nueva contraseña desde el frontend
        const { codigo, nuevaContrasena } = req.body;

        // Validamos que llegue el código
        if (!codigo) {
            return res.status(400).json({
                mensaje: "El código de recuperación es obligatorio"
            });
        }

        // Validamos que llegue la nueva contraseña
        if (!nuevaContrasena) {
            return res.status(400).json({
                mensaje: "La nueva contraseña es obligatoria"
            });
        }

        // Buscamos si existe un usuario con ese código
        const user = await User.findByCodigoRecuperacion(codigo);

        // Si no existe
        if (!user) {
            return res.status(404).json({
                mensaje: "Código inválido o vencido"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const nuevaContrasenaHasheada = await bcrypt.hash(nuevaContrasena, salt);

        // Actualizamos la contraseña usando el código
        await User.cambiarContrasenaPorCodigo(codigo, nuevaContrasenaHasheada);

        // Respondemos éxito
        return res.status(200).json({
            mensaje: "Contraseña actualizada correctamente"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error en el servidor al cambiar contraseña"
        });
    }
};

// Exportacion para las rutas
module.exports = {
    loginUser,
    recuperarContrasena,
    validarCodigoRecuperacion,
    cambiarContrasena,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
};



