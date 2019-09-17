// создадим express router
const router = require('express').Router();
const users = require('../data/users.json');
// экспортируем его
module.exports = router;

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  // eslint-disable-next-line no-undef
  if (!users[id]) {
    res.send({ error: 'Такого пользователя нет' });
  } else {
    // eslint-disable-next-line no-undef
    res.send(users[id]);
  }
});
