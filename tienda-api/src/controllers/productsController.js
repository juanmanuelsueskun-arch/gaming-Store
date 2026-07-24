const supabase = require('../config/supabaseClient');

async function getProducts(req, res) {
  const { data, error } = await supabase.from('productos').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const { data, error } = await supabase.from('productos').select('*').eq('id', id).maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(data);
}

async function createProduct(req, res) {
  const { nombre, descripcion, precio, imagen_url, stock } = req.body;
  const { data, error } = await supabase
    .from('productos')
    .insert({ nombre, descripcion, precio, imagen_url, stock })
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { nombre, descripcion, precio, imagen_url, stock } = req.body;
  const { data, error } = await supabase
    .from('productos')
    .update({ nombre, descripcion, precio, imagen_url, stock })
    .eq('id', id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: 'Producto eliminado' });
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };