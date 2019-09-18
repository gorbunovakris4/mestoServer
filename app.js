const express = require('express');
const path = require('path');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

const cardsRouter = require('./routes/cards');

app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
