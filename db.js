var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run(`
        CREATE TABLE Info (
            Uuid varchar(500),
            Vin varchar(500),
            Make varchar(500),
            Model varchar(500),
            Mileage varchar(500),
            Year varchar(500),
            Price varchar(500),
            ZipCode varchar(500),
            CreateDate varchar(500),
            UpdateDate varchar(500)
        )
        `);
    db.on("error", function(error) {
        console.log("Getting an error : ", error);
    }); 
});

module.exports = {
    db
}