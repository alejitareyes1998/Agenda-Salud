const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const protegerRuta = require('../middlewares/authMiddleware');

// Rutas para la entidad medicos
router.post('/', medicoController.createMedico);
router.get('/', medicoController.getAllMedicos);
// Guardian
router.use(protegerRuta);
router.get('/usuario/:id_usuario', medicoController.getMedicoByUsuarioId);
router.get('/:id', medicoController.getMedicoById);
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);
module.exports = router;