const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/usersController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, verificarAdmin, getUsers);
router.get('/:id', verificarToken, verificarAdmin, getUserById);

module.exports = router;