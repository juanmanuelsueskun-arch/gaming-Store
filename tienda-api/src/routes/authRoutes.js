const express = require('express');
const router = express.Router();
const { register, registerAdmin, login } = require('../controllers/authController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/register-admin', verificarToken, verificarAdmin, registerAdmin);

module.exports = router;