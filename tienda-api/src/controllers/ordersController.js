const supabase = require('../config/supabaseClient');

async function createOrder(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { items } = req.body; // [{ producto_id, cantidad, precio_unitario }]

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El pedido debe tener al menos un producto' });
    }

    const total = items.reduce((acc, item) => acc + item.cantidad * item.precio_unitario, 0);

    const { data: pedido, error: errorPedido } = await supabase
      .from('pedidos')
      .insert({ usuario_id: usuarioId, total, estado: 'Pendiente' })
      .select()
      .single();

    if (errorPedido) throw errorPedido;

    const itemsConPedido = items.map((item) => ({
      pedido_id: pedido.id,
      producto_id: item.producto_id,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario
    }));

    const { error: errorItems } = await supabase.from('pedido_items').insert(itemsConPedido);
    if (errorItems) throw errorItems;

    res.status(201).json({ mensaje: 'Pedido creado', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
}

async function getMyOrders(req, res) {
  const usuarioId = req.usuario.id;
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('creado_en', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

async function getAllOrders(req, res) {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*, usuarios(nombre, email)')
    .order('creado_en', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

async function getOrderById(req, res) {
  const { id } = req.params;
  const { data: pedido, error } = await supabase
    .from('pedidos')
    .select('*, usuarios(nombre, email)')
    .eq('id', id)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

  const { data: items, error: errorItems } = await supabase
    .from('pedido_items')
    .select('*, productos(nombre, precio)')
    .eq('pedido_id', id);

  if (errorItems) return res.status(500).json({ error: errorItems.message });

  res.json({ ...pedido, items });
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['Pendiente', 'Aprobado', 'Rechazado', 'Enviado', 'Entregado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado invalido' });
  }

  const { data, error } = await supabase
    .from('pedidos')
    .update({ estado })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

module.exports = { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus };