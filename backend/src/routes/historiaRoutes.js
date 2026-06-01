const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController')
// Rutas para Historias Clinicas
router.get('/', historiaController.getAllHistorias);
router.post('/', historiaController.createHistoria);
router.put('/:id_historia', historiaController.updateHistoria);
router.delete('/:idhistoria', historiaController.deleteHistoria);
module.exports = router;