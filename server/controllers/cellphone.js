const cellphone = require('../models').cellphones;

cellphone.sync();
var cellphone_array = []
module.exports = {
    fetchAllData(req, res) {
        return cellphone
            .all()
            .then(todos => {
                for(var i=0;i<todos.length;i++){
                    todos[i].year = JSON.parse(todos[i].year)
                }
                res.status(200).send(todos)            
            })
            .catch(error => res.status(400).send(error));
    },
    createCSV(req, res) {
        cellphone_array = []
        var fs = require('fs');
        const parse = require('csv-parse')
        fs.createReadStream("public/data/cellphone.csv")
            .pipe(parse({delimiter: ',', columns: true}))
            .on('data', function(data){

                var year ={
                    y1990: data["y1990"],
                    y1991: data["y1991"],
                    y1992: data["y1992"],
                    y1993: data["y1993"],
                    y1994: data["y1994"],
                    y1995: data["y1995"],
                    y1996: data["y1996"],
                    y1997: data["y1997"],
                    y1998: data["y1998"],
                    y1999: data["y1999"],
                    y2000: data["y2000"],
                    y2001: data["y2001"],
                    y2002: data["y2002"],
                    y2003: data["y2003"],
                    y2004: data["y2004"],
                    y2005: data["y2005"],
                    y2006: data["y2006"],
                    y2007: data["y2007"],
                    y2008: data["y2008"],
                    y2009: data["y2009"],
                    y2010: data["y2010"],
                    y2011: data["y2011"]
                }
                
                var country = data["Country"];
                cellphone_array.push({Country: country,
                    year:JSON.stringify(year)
                })


                               
            })
            .on("end", function(){
                cellphone.destroy({ truncate : true, cascade: false }).then(function(){
                    cellphone.bulkCreate(cellphone_array)
                    .catch(error => res.status(400).send(error));
                }) 
                console.log(cellphone_array)
                
                res.status(201).send(cellphone_array);
            })
    }
};