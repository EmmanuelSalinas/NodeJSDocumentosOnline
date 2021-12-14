const passport = require('passport')
const client = require('../database.js')
const bcrypt = require('bcryptjs')

//autenticacion local
const LocalStrategy = require('passport-local').Strategy
const { ObjectId } = require('mongodb')


async function matchPass(pass, email) {
    const user = await collectionUser.findOne({ email: email })

    return await bcrypt.compare(pass, user.pass)

}

passport.use(new LocalStrategy({usernameField: 'email'},async(email, pass,done)=>{
    await client.connect();
    db = client.db('documents_nodejs');
    collectionUser = db.collection('users')

    const user = await collectionUser.findOne({email: email})

    


    if(!user){
        return done(null,false,{message: 'Usuario no encontrado'})
    }else{
        const match = await matchPass(pass, user.email)
        console.log('match', match)
        if(match){
            return done(null,user)
        }
        else{
            return done(null,false,{message:'Contraseña incorrecta'})
        }
    }

}));

passport.serializeUser((user,done)=>{
    
    
    done(null,user._id)
});

passport.deserializeUser(async(id,done)=>{
    
    await client.connect();
    db = client.db('documents_nodejs');
    collectionUser = db.collection('users')


    const user = await collectionUser.findOne({_id: new ObjectId(id)},(err,user)=>{
        

         done(err,user);
    })


    
})


//async function connectDB() {




//}