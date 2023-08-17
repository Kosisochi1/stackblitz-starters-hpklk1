const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3010;

const dBasePath = path.join(__dirname, 'dBase', 'books.json');

app.use(express.static('static'));
app.use(bodyParser.json());

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
    if (!singles) {
      res.status(404).send('No Data matched');
    }
    res.status(200).send(singles);
  });
  // if (!single) {
  //   res.send('Not item matching');
  // }
  // res.status(200).send(single);
});
app.get('/post', (req, res) => {
  const inventoryToString = req.body;
  fs.readFile(dBasePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send('Not Found');
    }
    const inventoryReturn = JSON.parse(data);
    const singleInventory = inventoryReturn.find((singleInven) => {
      singleInven.id === inventoryToString.id;
    });
    if (!singleInventory) {
      res.status(404).send('No data matched');
    }
    const upDatedInventory = { ...inventoryToString, ...singleInventory };
    fs.writeFile(dBasePath, JSON.stringify(upDatedInventory), (err) => {});
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
