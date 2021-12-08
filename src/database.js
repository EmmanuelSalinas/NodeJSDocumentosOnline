const { MongoClient } = require('mongodb')


async function run(){
    const uri = 'mongodb+srv://emmanuel:SalinaS@cluster0.smf6z.mongodb.net/documentosApp?retryWrites=true&w=majority'

    const client = new MongoClient(uri)

    try{
        await client.connect();

        await listDatabases(client)
    } catch(e){
        console.error(e);
    }finally{
        await client.close
    }
    
}

run().catch(console.error)


async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log('databases:')
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    });
}


