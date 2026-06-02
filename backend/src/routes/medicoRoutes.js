const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
// Rutas para la entidad medicos
router.get('/', medicoController.getAllMedicos);
router.post('/', medicoController.createMedico);
router.get('/usuario/:id_usuario', medicoController.getMedicoByUsuarioId);
router.get('/:id', medicoController.getMedicoById);
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);
module.exports = router;