const db = require('../config/db');
const bcrypt = require('bcryptjs'); 
const Medico = {
    // Obtener todos los medicos
    
    // Crear un nuevo medico (INSERT)
    crear: async (datos) => { 
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();
            // Datos Usuario
            const nombre = datos.nombre;
            const apellido= datos.apellido;
            const tipo_documento = datos.tipo_documento;
            const documento = datos.documento;
            const correo = datos.correo;
            const password = datos.password;
            const tipo_usuario = datos.tipo_usuario || 'medico';

            // Datos Medico
            const id_usuario = datos.id_usuario;
            const id_especialista = datos.id_especialista;
            const tarjeta_profesional = datos.tarjeta_profesional;
            const experiencia_clinica = datos.experiencia_clinica;
             //Encriptacion de contraseña
            
            // Insercion en entidad medico
            const queryMedico ='INSERT INTO medico (id_usuario, id_especialista, tarjeta_profesional, experiencia_clinica, estado) VALUES (?, ?, ?, ?, ?)';
            const [resultadoMedico] = await connection.execute(queryMedico, [
                id_usuario,
                id_especialista,
                tarjeta_profesional,
                experiencia_clinica,
                'pendiente'
            ]);
            await connection.commit();
            return resultadoMedico.insertId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
    // Funcion GET
     obtenerTodos: async () => {
        try {
            const query = `
            SELECT m.id_medico, m.id_usuario, u.nombre, u.apellido, u.tipo_documento, u.documento, u.correo, 
                   e.nombre_especialidad, m.tarjeta_profesional, m.experiencia_clinica, m.estado
                   FROM medico m
                   INNER JOIN usuario u ON m.id_usuario =  u.id_usuario
                   INNER JOIN especialista e ON m.id_especialista = e.id_especialista`;
                   const [resultado] = await db.query(query);
                   return resultado;
        } catch (error) {
            throw error;
        }
    },
    // Funcion GET por ID
    obtenerPorId: async (id) => {
        try {
            const query = `
            SELECT m.id_medico, m.id_usuario, u.nombre, u.apellido, u.tipo_documento, u.documento, u.correo,
                   e.nombre_especialidad, m.tarjeta_profesional, m.experiencia_clinica, m.estado
                   FROM medico m
                   INNER JOIN usuario u ON m.id_usuario = u.id_usuario
                   INNER JOIN especialista e ON m.id_especialista = e.id_especialista
                   WHERE m.id_medico = ?`;
           const [resultado] = await db.query(query, [id]);
           return resultado[0];
        } catch (error) {
            throw error;
        }
    },
    obtenerPorUsuarioConUsuario: async (idUsuario) => {
        try {
            const query = `
            SELECT m.id_medico, m.id_usuario, u.nombre, u.apellido, u.tipo_documento, u.documento, u.correo,
                   e.nombre_especialidad, m.tarjeta_profesional, m.experiencia_clinica, m.estado
                   FROM medico m
                   INNER JOIN usuario u ON m.id_usuario = u.id_usuario
                   INNER JOIN especialista e ON m.id_especialista = e.id_especialista
                   WHERE m.id_usuario = ?`;
           const [resultado] = await db.query(query, [idUsuario]);
           return resultado[0];
        } catch (error) {
            throw error;
        }
    },
    // Actualizar medico (PUT)
    actualizar: async (id, datos) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const [medicos] = await connection.query('SELECT id_usuario FROM medico WHERE id_medico = ?', [id]);
            if (!medicos || medicos.length === 0) {
                await connection.rollback();
                return { affectedRows: 0, mensaje: "El medico no existe en la base de datos" };
            }
            const id_usuario = medicos[0].id_usuario;
            const datosUsuario = {};
            const datosMedico = {};
            if (datos.id_especialista) datosMedico.id_especialista = datos.id_especialista;
            if (datos.tarjeta_profesional) datosMedico.tarjeta_profesional = datos.tarjeta_profesional;
            if (datos.experiencia_clinica) datosMedico.experiencia_clinica = datos.experiencia_clinica;
            if (datos.estado) datosMedico.estado = datos.estado;

            if (Object.keys(datosUsuario).length > 0) {
                await connection.query('UPDATE usuario SET ? WHERE id_usuario = ?', [datosUsuario, id_usuario]);
            }
            if (Object.keys(datosMedico).length > 0) {
                await connection.query('UPDATE medico SET ? WHERE id_medico = ?', [datosMedico, id]);
            }
            await connection.commit();
            return { affectedRows: 1 };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
        
 // Eliminar medico (DELETE)
    eliminar: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM medico WHERE id_medico = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
obtenerTodos: async () => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query('SELECT m.id_medico, u.nombre, e.nombre_especialidad FROM medico m JOIN usuario u ON m.id_usuario = u.id_usuario JOIN e ON m.id_especialista = e.id_especialista');
        return rows;
    } catch (err) {
        throw err;
    } finally {
        connection.release();
    }
  },

module.exports = Medico;

