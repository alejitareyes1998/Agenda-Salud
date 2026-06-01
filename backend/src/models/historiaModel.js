const db = require('../config/db');
const Historia = {
    findAll: async () => {
            const sql = `
                SELECT 
                    h.id_historia, h.fecha, h.diagnostico, h.tratamiento, h.observaciones, h.estado,
                    CONCAT(up.nombre, ' ', up.apellido) AS nombre_paciente,
                    CONCAT(um.nombre, ' ', um.apellido) AS nombre_medico
                    FROM historia_clinica h
                    LEFT JOIN paciente p ON h.id_paciente = p.id_paciente
                    LEFT JOIN usuario up ON p.id_usuario = up.id_usuario
                    LEFT JOIN medico m ON h.id_medico = m.id_medico
                    LEFT JOIN usuario um ON m.id_usuario = um.id_usuario
                    ORDER BY h.fecha DESC`;
                    try {
            const [rows] = await db.execute(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    create: async (datos) => {
        try {
            const [result] = await db.query('INSERT INTO historia_clinica SET ?', [datos]);
            return result;
        } catch (error) {
            throw error;
        }
    }, 
    update: async (id, datos) => {
        try {
            const [result] = await db.query('UPDATE historia_clinica SET ? WHERE id_historia = ?', [datos, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM historia_clinica WHERE id_historia = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
module.exports = Historia;
    
    
