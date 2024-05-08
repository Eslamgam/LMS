

const express = require('express')
const dbConnection = require('./database/connection')
const path = require('path');
require('dotenv').config()
const app = express()
app.use(express.json())


const connection = require('./database/connection')
const sequelize = require('./models/sequelize')
const routeHandler = require('./errors/routeHandler')
const globalHandlar = require('./errors/globalHandlar');
const { routes } = require('./routes/routes');


app.use('/uploads', express.static(path.join(__dirname, 'uploads/course')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/faculty')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/lecturefile')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/new')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/tasks')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/taskanswers')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/users')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/university')));

routes(app)

app.all('*',routeHandler)
app.use(globalHandlar)


  app.listen(3000, (req, res)=>{
    console.log('server started');
  })



