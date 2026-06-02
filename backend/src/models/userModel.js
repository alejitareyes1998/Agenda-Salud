const db = require('../config/db');
const User = {
    //Buscar un usuario por el email para (login)
    findByEmail: async (correo) => {
        try {
            //Usamos "usuario" en singular porque asi aparece en phpMyAdmin
            const [rows] = await db.execute('SELECT * FROM usuario WHERE correo = ?', [correo]);
            return rows[0];
        } catch (error) {
                console.error('Error en findByEmail:', error.message);
                throw error;
        }
    },

    // Guardar el código de recuperación en el usuario
    guardarCodigoRecuperacion: async (correo, codigoRecuperacion) => {
        try {
            const sql = 'UPDATE usuario SET codigo_recuperacion = ? WHERE correo = ?';
            const [result] = await db.execute(sql, [codigoRecuperacion, correo]);
            return result;
        } catch (error) {
            console.error('Error en guardarCodigoRecuperacion:', error.message);
            throw error;
        }
    },

    // Buscar usuario por código de recuperación
    findByCodigoRecuperacion: async (codigo) => {
        
        try {
            const sql = 'SELECT * FROM usuario WHERE codigo_recuperacion = ?';
            const [rows] = await db.execute(sql, [codigo]);
            return rows[0];
        } catch (error) {
            console.error('Error en findByCodigoRecuperacion:', error.message);
            throw error;
        }
    },

    // Actualizar contraseña en el perfil del usuario
    updatePassword: async (idUsuario, nuevaContrasena) => {
        try {
            const [result] = await db.execute('UPDATE usuario SET password = ? WHERE id_usuario = ?', [nuevaContrasena, idUsuario]);
            return result;
        } catch (error) {
            console.error('Error en updatePassword:', error.message);
            throw error;
        }
    },

    // Actualizar contraseña usando el código de recuperación
    cambiarContrasenaPorCodigo: async (codigo, nuevaContrasena) => {
        try {
            const sql = `
                UPDATE usuario
                SET password = ?, codigo_recuperacion = NULL
                WHERE codigo_recuperacion = ?
            `;

            const [result] = await db.execute(sql, [nuevaContrasena, codigo]);
            return result;

        } catch (error) {
            console.error('Error en cambiarContrasenaPorCodigo:', error.message);
            throw error;
        }
    },

// Crear un usuario (para el registro)
create: async (userData) => {
    try {
        const { nombre, apellido, tipo_documento, documento, correo, password, tipo_usuario } = userData;
        const sql = 'INSERT INTO usuario (nombre, apellido, tipo_documento, documento, correo, password, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db. execute(sql, [nombre, apellido, tipo_documento, documento, correo, password, tipo_usuario || 'paciente']);
        return result.insertId;
    } catch (error) {
        throw error;
    }
},

// Obtener todos los usuarios
findAll: async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM usuario');
        return rows;
    } catch (error) {
        console.error('Error en findAll:',  error.message);
        throw error;
    }
},

//Actualizar usuario
    update: async (id, userData) => {
        try {
            const query = 'UPDATE usuario SET ? WHERE id_usuario = ?';
            const [result] = await db.query(query, [userData, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },

//Eliminar usuario
    delete: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
    

module.exports = User;
