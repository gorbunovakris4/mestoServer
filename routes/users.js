/* eslint-disable prefer-destructuring */
// создадим express router
const router = require('express').Router();
const users = require('../data/users.json');
// экспортируем его
module.exports = router;

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((elem) => elem._id === id);
  if (!user) {
    res.status = 404;
    res.send({ message: 'Нет пользователя с таким id' });
  } else {
    res.status = 200;
    res.send(user);
  }
});
