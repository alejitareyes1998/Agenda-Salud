const Historia = require('../models/historiaModel');
// 1. Obtener todas las historias
exports.getAllHistorias = async (req, res) => {
    try {
        const results = await Historia.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 2. CREAR HISTORIA CLINICA (POST)
exports.createHistoria =  async (req, res) => {
    try {
        const datos = req.body;
        const result = await Historia.create(datos);
        res.status(201).json({ mensaje: " Historia clinica creada con exito", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// ACTUALIZAR HISTORIA CLINICA (PUT)
exports.updateHistoria = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body
        await Historia.update(id, datos);
        res.status(200).json({ mensaje: "Historia clinica actualizada con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// ELIMINAR HISTORIA CLINICA (DELETE)
exports.deleteHistoria = async (req, res) => {
    try {
        const { id } = req.params;
        await Historia.delete(id);
        res.status(200).json({ mensaje: "Historia clinica eliminada con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


