const helpers ={};


helpers.isAuthenticated = (req,res,next)=>{
    console.log('isAuthenticated********************************************')
    console.log(req.isAuthenticated())
    
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No autorizado')
    res.redirect('users/signin')
}


module.exports =helpers