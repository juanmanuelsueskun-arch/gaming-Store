const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/ordersController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, createOrder);
router.get('/user', verificarToken, getMyOrders);
router.get('/', verificarToken, verificarAdmin, getAllOrders);
router.get('/:id', verificarToken, getOrderById);
router.put('/:id/status', verificarToken, verificarAdmin, updateOrderStatus);

module.exports = router;