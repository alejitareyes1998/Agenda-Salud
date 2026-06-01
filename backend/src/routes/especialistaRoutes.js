const express = require('express');
const router = express.Router();
const especialistaController = require('../controllers/especialistaController');
// Definir las rutas y conectarlas con el controlador
router.get('/', especialistaController.getAllEspecialistas);
router.post('/', especialistaController.createEspecialista);
router.put('/:id', especialistaController.updateEspecialista);
router.delete('/:id', especialistaController.deleteEspecialista);
module.exports = router;