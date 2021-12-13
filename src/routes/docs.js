const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const { isAuthenticated } =require('../helpers/auth')

router.get('/docs', isAuthenticated,(req, res) =>{
    res.render('documents/indexDocument')
});

router.get('/docs/list', isAuthenticated,(req, res) =>{
    res.render('documents/listDocuments')
});
 
module.exports=router;
