const supabase = require('../config/supabaseClient');

async function getUsers(req, res) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nombre, email, telefono, direccion, rol, creado_en')
    .order('creado_en', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nombre, email, telefono, direccion, rol, creado_en')
    .eq('id', id)
    .maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(data);
}

module.exports = { getUsers, getUserById };
