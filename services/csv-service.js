const { db } = require("../db")

const columns = [
    { name: 'UUID' },
    { name: 'VIN' },
    { name: 'Make' },
    { name: 'Model' },
    { name: 'Mileage' },
    { name: 'Year' },
    { name: 'Price' },
    { name: 'Zip Code' },
    { name: 'Create Date' },
    { name: 'Update Date' }
];

const saveToDb = (values, success) => {
    for (let i = 0; i < values.length; i++) {
        var query = `
                INSERT INTO info VALUES (
                    '${values[0].UUID}',
                    '${values[0].VIN}' ,
                    '${values[0].Make}',
                    '${values[0].Model}' ,
                    '${values[0].Mileage}' ,
                    '${values[0].Year}' ,
                    '${values[0].Price}' ,
                    '${values[0].ZipCode}' ,
                    '${values[0].CreateDate}' ,
                    '${values[0].UpdateDate}'
                )
        `;
        try{
            db.run(query);
        }catch(error){
            console.log(error)
        }
    }
    db.all("SELECT * FROM Info", function(err, row) {
        success(row)
    });
}
const csvToObjs = (csv) => {
    let file = csv;
    let data = file.data.toString('utf8').split('\n');

    const columnsData = data[0].replace('\r','').split(',');
    for (let i = 0; i<columnsData.length; i++){
        const value = columns.find((column)=> column.name === columnsData[i] )
        if (value) {
           const index = columns.indexOf(value)
           columns[index].possition = i 
        }
    }
    const objects = [];
    for(let i = 1; i < data.length; i++ ){
        const rawData = data[i].replace('\r','').split(',');
        objects.push({
            UUID: rawData[columns[0].possition],
            VIN: rawData[columns[1].possition],
            Make: rawData[columns[2].possition],
            Model: rawData[columns[3].possition],
            Mileage: rawData[columns[4].possition],
            Year: rawData[columns[5].possition],
            Price: rawData[columns[6].possition],
            ZipCode: rawData[columns[7].possition],
            CreateDate: rawData[columns[8].possition],
            UpdateDate: rawData[columns[9].possition]
        })
    }
    return objects;
}

module.exports = {
    saveToDb,
    csvToObjs
}