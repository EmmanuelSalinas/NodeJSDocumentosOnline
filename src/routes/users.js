const express = require('express')
const client = require('../database.js')
const router = express.Router()

const connection = require('../database.js')


router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
})

router.get('/users/signup',(req,res)=>{
    res.render('users/signup')
})

router.post('/users/signup',(req,res)=>{
    const { name, email, pass, confpass } = req.body;
    const errors = []
    console.log(req.body)


    if(name=='' || email=='' || pass=='' || confpass==''){
        console.log('adentro de campos vacios')
        errors.push({text:'no se aceptan campos vacios'})
        res.render('users/signup' , {errors, name, email, pass, confpass})
    }else{
        console.log('No vacios')

        if (pass != confpass){
            errors.push({text:'Las contraseñas no coinciden'})
        }
    
        if(pass.length <= 4){
            errors.push({text:'La contraseña debe de ser mayor a 4 caracteres'})
        }
    
    
        if(errors.length > 0){
            res.render('users/signup' , {errors, name, email, pass, confpass})
        }else{
            //const db = client.db('documents_nodejs')
            //const collection = db.collection('users')
            

            try{
                //collection.insertOne({name: name, email: email, pass:pass})
            }catch(error){
                console.error(error)
            }


        }
    }

    


})

module.exports=router;
