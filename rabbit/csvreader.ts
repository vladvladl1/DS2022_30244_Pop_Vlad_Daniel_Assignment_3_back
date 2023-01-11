var fs = require('fs');
var {parse} = require('csv-parse');

var citit = [];



    fs.createReadStream("./sensor.csv")
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", function (row) {
            citit.push(row);
            //console.log(citit);
        });

