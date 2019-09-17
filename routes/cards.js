// создадим express router
const router = require('express').Router();
const cards = require('../data/cards.json');
// экспортируем его
module.exports = router;

router.get('/cards', (req, res) => {
  res.send(cards);
});
