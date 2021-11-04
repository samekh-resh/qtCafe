// config/database.js
// require('dotenv').config()

let db_password = process.env.DB_PASSWORD


module.exports = {


    url : `mongodb+srv://samekh:${db_password}@21savage.xlrtw.mongodb.net/coffeeShop?retryWrites=true&w=majority`,
    dbName: "coffeeShop"
};
