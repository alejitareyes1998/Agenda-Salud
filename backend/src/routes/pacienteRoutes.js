const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const protegerRuta = require('../middlewares/authMiddleware');

router.post('/', pacienteController.createPaciente);
router.use(protegerRuta);

router.get('/', pacienteController.getAllPacientes);
router.get('/usuario/:id_usuario', pacienteController.getPacienteByUsuarioId);
router.get('/:id', pacienteController.getPacienteById);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;