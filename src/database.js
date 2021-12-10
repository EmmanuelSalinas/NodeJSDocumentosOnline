const { MongoClient } = require("mongodb")
const uri = 'mongodb+srv://emmanuel:SalinaS@cluster0.smf6z.mongodb.net/documentosApp?retryWrites=true&w=majority'


let client = new MongoClient(uri)



module.exports = client



    /*
    const collection = db.collection('users')

    try{
        await collection.insertOne({name:'Emmanuel', mail:'salinas.e9810@gmail.com'})
    }catch(error){
        console.error(error)
    }



*/



