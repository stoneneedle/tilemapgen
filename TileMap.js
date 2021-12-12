// The hex tile map will use 2D Perlin noise to calculate an elevation value for each hex tile,
// determining whether the tile is OCEAN/LAKE, COAST, PLAINS/HILLS, or MOUNTAINS

var p = require('./min.perlin'); // Stefan's Perlin implementation (Minified)

p.noise.seed(Math.random());

var BLUE = OCEAN = "\033[0;34m"; // console blue
var LTGREEN = PLAINS = "\033[1;32m"; // console light green
var BROWN = MTNS = "\033[0;33m"; // console brown/orange

class HexTileMap {
  constructor(width=5, height=5) {
    this.width = width;
    this.height = height;
  }

  get elevation() {
    return this.perlin2DElevationMap();
  }

  get simplexElevation() {
    return this.simplex2DElevationMap();
  }

  perlin2DElevationMap() {
    var map = new Array();
    for(var y = 0; y < this.height; y++) {
      var row = new Array();
      for(var x = 0; x < this.width; x++) {
        var xp = parseFloat(x / 10);
        var yp = parseFloat(y / 10);
        row.push(p.noise.perlin2(xp, yp));
      }
      map.push(row);
    }
    return map;
  }

  simplex2DElevationMap() {
    var map = new Array();
    for(var y = 0; y < this.height; y++) {
      var row = new Array();
      for(var x = 0; x < this.width; x++) {
        var xp = parseFloat(x / 10);
        var yp = parseFloat(y / 10);
        row.push(p.noise.simplex2(xp, yp));
      }
      map.push(row);
    }
    return map;
  }

  toStringPerlin() {
    var outStr = "";

    for(var y = 0; y < this.height; y++) {
      for(var x = 0; x < this.width; x++) {
        var currentTile = this.elevation[x][y];
        if(currentTile < 0) {
          // outStr += OCEAN + currentTile.toPrecision(3) + " "; // Debug Perlin values
          outStr += OCEAN + " ~ ";
        } else if(currentTile > 0.4) {
          // outStr += MTNS + currentTile.toPrecision(3) + " "; // Debug Perlin values
          outStr += MTNS + " ^ ";
        } else {
          // outStr += PLAINS + currentTile.toPrecision(3) + " "; // Debug Perlin values
          outStr += PLAINS + " + ";
        }
      }
      outStr += "\n";
    }
    return outStr;
  }

  toStringSimplex() {
    var outStr = "";

    for(var y = 0; y < this.height; y++) {
      for(var x = 0; x < this.width; x++) {
        var currentTile = this.simplexElevation[x][y];
        if(currentTile < 0) {
          // outStr += OCEAN + currentTile.toPrecision(3) + " "; // Debug Perlin values
          outStr += OCEAN + " ~ ";
        } else if(currentTile > 0.4) {
          // outStr += MTNS + currentTile.toPrecision(3) + " "; // Debug Perlin values
          outStr += MTNS + " ^ ";
        } else {
          // outStr += PLAINS + currentTile.toPrecision(3) + " "; // Debug Perlin values
          outStr += PLAINS + " + ";
        }
      }
      outStr += "\n";
    }
    return outStr;
  }
}

tm = new HexTileMap(40, 40);
console.log(tm.toStringSimplex());
