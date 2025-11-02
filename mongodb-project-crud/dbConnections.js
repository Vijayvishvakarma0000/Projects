const { MongoClient } = require("mongodb")

// let dbConnectionurl="mongodb://localhost:27017"
//kabhi kabhi localhost kuchh problem create kart ahe to ham uski jagah par mongodb ki id rakhenge taki problm create na ho kyo ki id uniqe hoti he 
let dbConnectionurl="mongodb://127.0.0.1:27017"
const client= new MongoClient(dbConnectionurl)

let dbConnection=async ()=>{
    await client.connect();
    let db=client.db("mongoDbProject_dataBase");
    return db;
}
module.exports={dbConnection}