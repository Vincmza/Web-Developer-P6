const express = require('express');
const router = express.Router();
const ctrlSauces = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, ctrlSauces.createSauce);
router.get('/', auth, ctrlSauces.getAllSauces);
router.get('/:id', auth, ctrlSauces.getOneSauce);
router.put('/:id', auth, ctrlSauces.modifySauce);
router.delete('/:id', auth, ctrlSauces.deleteSauce);

module.exports = router;