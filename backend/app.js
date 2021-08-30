const express = require('express');

const app = express();

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

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

app.use('/api/sauces', (req, res, next) => {

    const object = [
    {
        _id: '#158aa-96',
        title: 'Godin G-550',
        description: 'Famous french rock-blues guitar',
        imageUrl: '',
        price: 5700,
        userId: 'cth52qsbn99'
    },
    {
        _id: '#128aa-96',
        title: 'Ibanez 141-Z',
        description: 'Are we supposed to introduce it ?',
        imageUrl: '',
        price: 6500,
        userId: 'cth52qsbn99'
    },
    ];
  res.status(201).json(object);
});
module.exports = app;

