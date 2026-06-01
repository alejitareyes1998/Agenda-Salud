const Especialista = require('../models/especialistaModel');
// Obtener todos los especialistas
exports.getAllEspecialistas = async (req, res) => {
    try {
        const results = await Especialista.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};
// Crear un nuevo especialista
exports.createEspecialista = async (req, res) => {
    try {
        const datos = req.body;
        const result = await Especialista.create(datos);
        res.status(201).json({ mensaje: "Especialidad creado con exito", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};
// Actualizar un especialista
exports.updateEspecialista = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        await Especialista.update(id, datos);
        res.status(200).json({ message: "Especialista actualizado con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message  });
    }
};
// Eliminar un especialista
exports.deleteEspecialista = async (req, res) => {
    try {
        const { id } = req.params;
        await Especialista.delete(id);
        res.status(200).json({ mensaje: "Especialista eliminado con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



