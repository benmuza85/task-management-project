// src/index.js
const express = require('express');
const path = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const session = require('express-session');
const passport = require('./config/passport');


// Connect to MongoDB
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Routes for authentication
app.use('/auth', require('./routes/authRoutes'));

app.use('/api', taskRoutes);

app.use(express.static(path.join(__dirname,'client', 'build')))
app.get('*', (req, res)=>{
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
