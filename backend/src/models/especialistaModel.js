const db = require('../config/db');
const Especialista = {
    // Obtener todas las especialidades
    findAll: async () => {
        try {
            const [rows] = await db.execute('SELECT * FROM especialista ORDER BY nombre_especialidad ASC');
            return rows;
        } catch (error) {
            throw error;
    }
},
// Crear una especialidad nueva
create: async (datos) => {
    try {
        const [result] = await db.query('INSERT INTO especialista SET ?', [datos]);
        return result;
    } catch (error) {
        throw error;
    }
},
// Actualizar nombre de la especialidad
    update: async (id, datos) => {
        try {
            const [result] = await db.query('UPDATE especialista SET ? WHERE id_especialista = ?', [datos, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    // Eliminar especialista
    delete: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM especialista WHERE id_especialista = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
        }
    };
module.exports = Especialista;

