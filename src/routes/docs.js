const express = require('express')
const router = express.Router()

router.get('/docs', (req, res) =>{
    res.send('docs desde la base de datos');
});

 
module.exports=router;
