//------------------------SERVER-------------------------
//-------------------------------------------------------



//###################################
//-------importing packages
//###################################
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//###################################
//-------connecting to DB
//###################################
mongoose.connect('mongodb://localhost/activities',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(db => console.log('Db connected'))
    .catch(err => console.log('err: ', err));

    
//###################################
//-------importing routes
//###################################
const indexRoutes = require('./routes/index');


//###################################
//-------settings
//###################################
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname, 'views'));//set views location
app.set('view engine','ejs');//set templates engine


//###################################
//-------middlewares
//###################################
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));//for understand form data. extends:false because it wont be receibing images or big files
//app.use(express.urlencoded({extends:false}));


//###################################
//-------routes
//###################################
app.use('/',indexRoutes);


//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port: ', + app.get('port'));
});