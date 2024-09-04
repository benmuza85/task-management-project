// src/index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');


// Connect to MongoDB
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET || 'my little secrect',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors({credentials: true, origin: 'https://task-management-benson-cda7d51e8621.herokuapp.com/'}));

app.use((req, res, next)=>{
    console.log(req.user)
    console.log(`METHOD ${req.method} ${req.url}`);
    next()
})

// Routes for authentication
app.use('/auth', require('./routes/authRoutes'));

app.use('/api', taskRoutes);

app.use(express.static(path.join(__dirname,'client', 'build')))
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'), (err)=>{
        if(err){
            res.status(500).send(err)
        }
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
