const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = ('', (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(()=>res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error=>(res.status(401).json({error})))
    })
    .catch(error=>(res.status(500).json({error})))
});

exports.login = ('', (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(user => {
        console.log(user);
        if(!user){
            return res.status(401).json({error: 'Utilisateur inconnu !'})
        }
        bcrypt.compare(req.body.password ,user.password)
        .then(valid =>{
            console.log(valid);
            if(!valid){
                return res.status(401).json({error: 'Mot de passe erroné !'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user.id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error=>(res.status(500).json({error})))

    })
    .catch(error=>(res.status(500).json({error})))

});
