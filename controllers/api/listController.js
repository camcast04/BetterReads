const List = require('../models/list');

module.exports = {
  create,
  // delete: deleteList,
  // update,
  // index,
  // show,
};

async function create(req, res) {
  try {
    console.log('create function called');
    console.log('Request body:', req.body);
    const list = await List.create(req.body);
    console.log('List created:', list);
    res.json(list);
  } catch (err) {
    console.error('Error creating list:', err);
    res.status(400).json({ message: err.message });
  }
}
