// Example array maker in C#

// public static int[,] GenerateArray(int width, int height, bool empty)
// {
//     int[,] map = new int[width, height];
//     for (int x = 0; x < map.GetUpperBound(0); x++)
//     {
//         for (int y = 0; y < map.GetUpperBound(1); y++)
//         {
//             if (empty)
//             {
//                 map[x, y] = 0;
//             }
//             else
//             {
//                 map[x, y] = 1;
//             }
//         }
//     }
//     return map;
// }

function genArray(width, height, empty=true) {
  var map = [];

  for(var x = 0; x < width; x++) {
    var row = [];
    for(var y = 0; y < height; y++) {
      if(empty) {
        row.push(0);
      }
      else {
        row.push(1);
      }
    }
    map.push(row);
  }
  return map;
}



var testMap = genArray(4, 3);

var outStr = '';




console.log(testMap);

// var myMap = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
// console.log(myMap);