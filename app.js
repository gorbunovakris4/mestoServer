const express = require('express');
const path = require('path');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');

app.use(usersRouter);

const cardsRouter = require('./routes/cards');

app.use(cardsRouter);

app.get('/cards', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/cards.json'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
