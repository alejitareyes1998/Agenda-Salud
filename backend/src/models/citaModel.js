const db = require('../config/db');
const Cita = {
    // Funcion para obtener todas las citas
    findAll: async () => {
             const sql = `
           SELECT
            c.id_cita, c.fecha, c.hora, c.estado, c.motivo,
          CONCAT(up.nombre, ' ', up.apellido) AS nombre_paciente,
           CONCAT(um.nombre, ' ',um.apellido) AS nombre_medico
    FROM cita c
    INNER JOIN paciente p ON c.id_paciente = p.id_paciente
    INNER JOIN usuario up ON p.id_usuario = up.id_usuario
    INNER JOIN medico m ON c.id_medico = m.id_medico
    INNER JOIN usuario um ON m.id_usuario = um.id_usuario
    ORDER BY c.fecha DESC, c.hora DESC`;
    try {
            const [rows] = await db.execute(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    // Funcion para crear una nueva cita
    create: async (datos) => {
        try {
            const [result] = await db.query('INSERT INTO cita SET ?', [datos]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    // Actualizar cita (PUT)
    update: async (id, datos) => {
        try {
            const [result] = await db.query('UPDATE cita SET ? WHERE id_cita = ?', [datos, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    // Eliminar cita
    delete: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM cita WHERE id_cita = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
module.exports = Cita;
    
