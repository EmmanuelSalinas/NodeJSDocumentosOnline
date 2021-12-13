const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/', (req, res) =>{
    res.redirect('/users/signin')
});

router.get('/about', (req,res)=>{
    res.render('about');
})

module.exports=router;
 