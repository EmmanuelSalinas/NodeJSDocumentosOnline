const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const { isAuthenticated } =require('../helpers/auth')

router.get('/docs/new', isAuthenticated,(req, res) =>{
    res.render('documents/indexDocument')
});

router.get('/docs/list', isAuthenticated,(req, res) =>{
    res.render('documents/listDocuments')
});
 

router.post('/docs/new', isAuthenticated,async(req,res)=>{
    const {htmlDoc} = req.body
    const today = new Date().toUTCString()
    const user = req.user._id







    console.log(htmlDoc)
    console.log(today)
    console.log(user)
    
})

module.exports=router;
