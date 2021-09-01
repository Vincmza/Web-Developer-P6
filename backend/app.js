const express = require('express');

const app = express();

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Vincent:arkhoninfaustus1987@cluster0.ifemo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/sauces/auth', userRoutes);

module.exports = app;

