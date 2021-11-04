// config/database.js
require('dotenv').config()

let db_name = process.env.DB_PASSWORD


module.exports = {


    url : `mongodb+srv://samekh:${db_name}@21savage.xlrtw.mongodb.net/demo?retryWrites=true&w=majority`,
    dbName: "coffeeShop"
};
