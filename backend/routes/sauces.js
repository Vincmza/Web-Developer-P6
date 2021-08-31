const express = require('express');

const router = express.Router();

const ctrlSauces = require('../controllers/sauces');

router.post('/', ctrlSauces.createSauce);
router.get('/', ctrlSauces.getAllSauces);
router.get('/:id', ctrlSauces.getOneSauce);
router.put('/:id', ctrlSauces.modifySauce);
router.delete('/:id', ctrlSauces.deleteSauce);

module.exports = router;