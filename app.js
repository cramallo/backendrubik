const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

dotEnv.config();

const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoute');
const serviceRoutes = require('./routes/serviceRoute');
const userServiceRoutes = require('./routes/userServiceRoute');
const commentRoutes = require('./routes/commentRoute');
const planRoutes = require('./routes/planRoute');
const subscriptionRoutes = require('./routes/subscriptionRoute');
const bookingRoutes = require('./routes/bookingRoute');
const paymentRoutes = require('./routes/paymentRoute');

const app = express();

//Middlewares
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

//Routes
app.use('/auth', authRoutes);
app.use('/user/service', userServiceRoutes);

//TODO: renombrar
app.use('/comments', commentRoutes);
app.use('/subscription', subscriptionRoutes);
app.use('/services/booking', bookingRoutes);

// Admin Routes
app.use('/category', categoryRoutes);
app.use('/service', serviceRoutes);
app.use('/plan', planRoutes);
app.use('/payments', paymentRoutes);

//Database connection
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser : true, useUnifiedTopology: true}).then(
    ()=>{
        console.log("DB connected");
    },
    err=>{
        console.log("Error to connect to db:"+ err);
    }
);

app.listen(3000,()=>{
    console.log("succefully server conection");
});
