const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride =require('method-override');
const session = require('express-session');


//Initializations
const app =express()
require('./database')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))//se establecen las vistas

app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partials: path.join(app.get('views'), 'partials'),
    extname:  '.hbs'
}) );
app.set('view engine', '.hbs');



//midlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method')) 
app.use(session({
    secret:'secretosecretillo',
    resave:true,
    saveUninitialized: true
}))


//Global variables

//routes
app.use(require('./routes/index'))
app.use(require('./routes/docs'))
app.use(require('./routes/users'))

//staticFiles
app.use(express.static(path.join(__dirname, 'public')))



//server is running
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});