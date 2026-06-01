const db = require('../config/db');
const Paciente = {
    obtenerTodos: async () => {
        const [rows] = await db.query('SELECT * FROM paciente');
        return rows;
    },

    crear: async (datos) => {
        const { id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado } = datos;
        const query = `INSERT INTO paciente (id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado]);
        return result;
    },

    obtenerPorId: async (id) => {
        const [rows] = await db.query('SELECT * FROM paciente WHERE id_paciente = ?', [id]);
        return rows;
    },

    obtenerPorIdConUsuario: async (id) => {
        const [rows] = await db.query(`
            SELECT
                p.id_paciente,
                p.id_usuario,
                p.tipo_sangre,
                p.sexo,
                p.fecha_nacimiento,
                p.telefono,
                p.direccion,
                p.estado,
                u.nombre,
                u.apellido,
                u.correo,
                u.tipo_usuario
            FROM paciente p
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
            WHERE p.id_paciente = ?
        `, [id]);
        return rows;
    },

    obtenerPorUsuarioConUsuario: async (idUsuario) => {
        const [rows] = await db.query(`
            SELECT
                p.id_paciente,
                p.id_usuario,
                p.tipo_sangre,
                p.sexo,
                p.fecha_nacimiento,
                p.telefono,
                p.direccion,
                p.estado,
                u.nombre,
                u.apellido,
                u.correo,
                u.tipo_usuario
            FROM paciente p
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
            WHERE p.id_usuario = ?
            ORDER BY p.id_paciente DESC
            LIMIT 1
        `, [idUsuario]);
        return rows;
    },

    actualizar: async (id, datos) => {
        try {
            const [result] = await db.query('UPDATE paciente SET ? WHERE id_paciente = ?', [datos, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    eliminar: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM paciente WHERE id_paciente = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Paciente;