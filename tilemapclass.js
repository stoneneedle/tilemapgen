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

  // get grid() {
  //   return this.populate();
  // }

  // populate() {
  //   var map = [];
  //   for(var x = 0; x < this.width; x++) {
  //     var row = [];
  //     for(var y = 0; y < this.height; y++) {
  //       row.push(0);
  //     }
  //     map.push(row);
  //   }
  //   return map;
  // }

  get elevation() {
    return this.perlin2DElevationMap();
  }

  perlin2DElevationMap() {
    var map = new Array();
    for(var y = 0; y < this.height; y++) {
      var row = new Array();
      for(var x = 0; x < this.width; x++) {
        var xp = parseFloat(x / 10);
        var yp = parseFloat(y / 10);
        // console.log("(" + x + "," + y + ") => " + p.perlin.get(xp, yp));
        row.push(p.noise.perlin2(xp, yp));
      }
      map.push(row);
    }
    return map;
  }

  toString() {
    var outStr = "";

    for(var y = 0; y < this.height; y++) {
      for(var x = 0; x < this.width; x++) {
        var currentTile = this.elevation[x][y];
        if(currentTile < 0) {
          // outStr += OCEAN + coolMap.elevation[x][y].toPrecision(3) + " "; // Debug Perlin values
          outStr += OCEAN + " ~ ";
        } else if(currentTile > 0.4) {
          // outStr += MTNS + coolMap.elevation[x][y].toPrecision(3) + " "; // Debug Perlin values
          outStr += MTNS + " ^ ";
        } else {
          // outStr += PLAINS + coolMap.elevation[x][y].toPrecision(3) + " "; // Debug Perlin values
          outStr += PLAINS + " + ";
        }
      }
      outStr += "\n";
    }
    return outStr;
  }
}

// var coolMap = new HexTileMap(40, 40);
// console.log(coolMap.toString());

// ANSI Escape Code Colors

// Black        0;30     Dark Gray     1;30
// Red          0;31     Light Red     1;31
// Green        0;32     Light Green   1;32
// Brown/Orange 0;33     Yellow        1;33
// Blue         0;34     Light Blue    1;34
// Purple       0;35     Light Purple  1;35
// Cyan         0;36     Light Cyan    1;36
// Light Gray   0;37     White         1;37

//export default HexTileMap;
module.exports = HexTileMap;