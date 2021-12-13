//const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express')
//const client = require('../database.js')
const router = express.Router()
const bcrypt = require('bcryptjs')


const client = require('../database.js')
const passport = require('passport')


//funciones para encryptar contraseña y verificar
async function encryptPass(pass) {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(pass, salt)
    return hash
}

async function matchPass(pass, mail) {
    const user = await collectionUser.findOne({ email: email })

    return await bcrypt.compare(pass, user.pass)

}

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.post('/users/signin', passport.authenticate('local',{ 
    successRedirect: '/docs', 
    failureRedirect: '/users/signin', 
    failureFlash:true
}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
    const { name, email, pass, confpass } = req.body;
    const errors = []


    //if en caso de que el usuario mande campos vacios
    if (name == '' || email == '' || pass == '' || confpass == '') {
        console.log('adentro de campos vacios')
        errors.push({ text: 'no se aceptan campos vacios' })
        res.render('users/signup', { errors, name, email, pass, confpass })
    } else {

        //valida la contraseña
        if (pass != confpass) {
            errors.push({ text: 'Las contraseñas no coinciden' })
        }
        //valida la longitud
        if (pass.length <= 4) {
            errors.push({ text: 'La contraseña debe de ser mayor a 4 caracteres' })
        }
        //se valida la cantidad de errores
        if (errors.length > 0) {
            res.render('users/signup', { errors, name, email, pass, confpass })
        } else {

            try {
                //conect to server and search db
                await client.connect()
                db = client.db('documents_nodejs')
                collectionUser = db.collection('users')
                
                //verify email is in use
                const isEmailInUse = await collectionUser.findOne({ email: email })
                
                if (isEmailInUse) {
                    req.flash('error_msg', 'El correo ya esta en uso')
                    res.redirect('/users/signup')
                } else {
                    newPass = await encryptPass(pass)
                    console.log(newPass)
                    await collectionUser.insertOne({ name: name, email: email, pass: newPass }, function (err, res) {
                        if (err) throw err;
                        console.log('1 document inserted!');
                        client.close();
                    })
                    req.flash('success_msg', 'Registro exitoso')
                    res.redirect('/users/signin')

                }


            } catch (error) {
                console.error(error)
            }


        }
    }




})

module.exports = router;
