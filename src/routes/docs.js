const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const client = require('../database.js')
const { ObjectId } = require('mongodb')

router.get('/docs/new', isAuthenticated, (req, res) => {
    res.render('documents/indexDocument')
});

router.get('/docs/edit/:id', isAuthenticated, async(req, res) => {
    
    

    try {
        await client.connect()
        db = client.db('documents_nodejs')
        collectionDocs = db.collection('docs')

        
        
        const docs1 = await collectionDocs.findOne({ _id: new ObjectId(req.params.id) },)
        client.close();
        
        res.render('documents/editDocument', {docs1})

    } catch (err) {
        console.error(err)
    }

});


router.get('/docs/list', isAuthenticated, async (req, res) => {
    try {
        await client.connect()
        db = client.db('documents_nodejs')
        collectionDocs = db.collection('docs')
        var userid= req.user._id

        
        
        const docs1 = await collectionDocs.find({ idUser:userid },)
        const docs = await docs1.toArray()
        client.close();
        
        res.render('documents/listDocuments', {docs})

    } catch (err) {
        console.error(err)
    }
});


router.post('/docs/new', isAuthenticated, async (req, res) => {
    const { htmlDoc, titulo } = req.body
    const today = new Date().toUTCString()
    const user = req.user._id



    try {
        await client.connect()
        db = client.db('documents_nodejs')
        collectionDocs = db.collection('docs')

        await collectionDocs.insertOne({ titulo: titulo, dateCreation: today, docHtml: htmlDoc, idUser: user }, function (err, res) {
            if (err) throw err;
            console.log('1 document inserted!');
            client.close();
        })
        //req.flash('success_msg', 'Registro exitoso')
        res.json({ status: "Success", redirect: '/docs/list' })



    } catch (err) {
        console.error(error)
    }






    console.log(htmlDoc)
    console.log(today)
    console.log(user)

})

module.exports = router;
