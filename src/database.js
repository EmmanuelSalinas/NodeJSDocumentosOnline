const mongo = require('mongodb')
const { MongoClient } = mongo


async function run(){
    const uri = 'mongodb+srv://emmanuel:SalinaS@cluster0.smf6z.mongodb.net/documentosApp?retryWrites=true&w=majority'

    const client = new MongoClient(uri)

    try{
        //conect with server
        await client.connect();
        //await client.db('documents_nodejs')

        

    }catch(e){
        console.error(e);
    }finally{
        await client.close
    }

    
    
}

run().catch(console.error)



    /*
    const collection = db.collection('users')

    try{
        await collection.insertOne({name:'Emmanuel', mail:'salinas.e9810@gmail.com'})
    }catch(error){
        console.error(error)
    }



*/



