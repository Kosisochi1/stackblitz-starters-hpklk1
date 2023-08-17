const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3010;

const dBasePath = path.join(__dirname, 'dBase', 'books.json');

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Home').end();
});
app.get('/Home', (req, res) => {
  fs.readFile(dBasePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send('not found');
    }
    res.status(200).send(data);
  });
});
app.get('/Home/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dBasePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send('nOT FOUND');
    }
    const single = JSON.parse(data);
    const singles = single.find((item) => item.id === parseInt(id));
    res.status(200).send(singles);
  });
  // if (!single) {
  //   res.send('Not item matching');
  // }
  // res.status(200).send(single);
});
app.get('/post', (req,res)=>{
  
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
