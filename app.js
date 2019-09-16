const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(__dirname, 'public'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
