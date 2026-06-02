const Paciente = require('../models/pacienteModel');

exports.createPaciente = async (req, res) => {
    try {
        const result = await Paciente.crear(req.body);
        res.status(201).json({ mensaje: '¡paciente guardado con exito!', id: result.insertId });
    } catch (error) {
        console.error('Error al insertar paciente:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al intentar guardar el paciente', error: error.message });
    }
};

exports.getAllPacientes = async (req, res) => {
    try {
        const result = await Paciente.obtenerTodos();
        console.log("Cantidad de pacientes encontrados:", result.length);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Paciente.obtenerPorIdConUsuario(id);

        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        res.status(200).json(resultado[0]);
    } catch (error) {
        console.error('Error al obtener paciente por id:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getPacienteByUsuarioId = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const resultado = await Paciente.obtenerPorUsuarioConUsuario(id_usuario);

        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado para este usuario' });
        }

        res.status(200).json(resultado[0]);
    } catch (error) {
        console.error('Error al obtener paciente por usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.actualizar(id, req.body);
        res.status(200).json({ mensaje: 'Paciente actualizado con exito' });
    } catch (error) {
        console.error('Error al actualizar paciente correctamente', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.eliminar(id);
        res.status(200).json({ mensaje: 'Paciente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar paciente en Mysql:', error);
        res.status(500).json({ error: error.message });
    }
};

