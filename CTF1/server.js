const express = require('express');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/submit', (req, res) => {
  const name = req.query.name;
  res.send(`<input type="text" id="name" name="name" value="${name}">`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
