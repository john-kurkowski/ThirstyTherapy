const express = require('express');

const app = express()
const port = process.env.PORT

app.use(express.static('../public'));

app.get('/', (req, res) => {
  console.log(process.env.HOME + '/public/index.html');
  res.sendFile(process.env.HOME + '/public/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))