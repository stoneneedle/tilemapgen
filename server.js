// very simple API server to send backend data to front

// required libraries
const express = require('express');
const cors = require('cors');
const HexTileMap = require('./TileMap');

// Use express and CORS
const app = express();
app.use(express.json());
app.use(cors());

// Testing our module that uses Perlin noise to generate terrain tilemap data
// on the backend
app.get('/test', async(req, res) => {
  tm = new tilemap(40, 40); // .HexTileMap(40, 40); //HexTileMap(40, 40);
  var msg = {"message": tm.toStringPerlin()};
  res.json(msg);
});

app.listen(3001);