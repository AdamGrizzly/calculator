var express = require('express');
var app = express();

app.get('/', function(req, res) {
  app.use(express.static("www"));
});

// запускаем сервер на порту 8000
app.listen(8000);
// отправляем сообщение
console.log('Сервер стартовал!');