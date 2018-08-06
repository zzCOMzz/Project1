const express  = require('express');
const logger   = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const path = require('path')
const app = express();


//* connections
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/apiproject',{ useNewUrlParser : true})

//? Routes
const users = require('./routes/users');

// todo: MiddleWares
app.use(logger('dev'));
app.use(bodyParser.json()); 

// todo: Routes
app.get('/',(req, res)=>{
  res.status(200).send('Hello World')
})

app.use('/users', users);

// todo: Catch 404 errors dan forward ke error handler
app.use((req, res, next)=>{
 const err = new Error('Not Found');
 err.status = 404;
 next(err);
})

// todo: Error handler function
app.use((err, req, res, next)=>{
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  
  //* Respond to client
  // res.status(status).json({
  //   error: {
  //     message : error.message
  //   }
  // });
  res.status(404).sendFile(path.join(__dirname+'/404.html'))

  //* Respond to ourselves
  console.log(err)
})

// todo: start the server 
const port = app.get('port') || 3000;
app.listen(port, ()=> console.log(`Server start on http://127.0.0.1:${port}`))