const express = require('express');
const path = require('path');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/users.json'));
});

app.get('/cards', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/cards.json'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
