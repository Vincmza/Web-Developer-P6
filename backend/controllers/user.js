const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

/*User create an account using an email and a password*/
exports.signup = ('', (req, res, next)=>{
    if(schema.validate(req.body.password)){
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
    }else {
        return res.json({message: 'Votre mot de passe ne contient pas les caractères attendus'})
    } 
});

/*User log in to the website with one's email and password*/
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
                            process.env.secretToken,
                            {expiresIn: process.env.tokenExpiration}
                        )
                    });
                })
                .catch(error=>(res.status(500).json({error})))
        })
        .catch(error=>(res.status(500).json({error})))
});
