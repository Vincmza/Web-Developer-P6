const Sauce = require('../models/sauce');
const fs = require('fs');

exports.likeSauce = (req, res, next) => {
  const bodyInfos = req.body;
  console.log(bodyInfos);

  if(bodyInfos.like === 1){
    Sauce.updateOne({_id: req.params.id}, {$inc:{likes:+1}, $push:{usersLiked:req.body.userId}})
      .then(()=>res.status(200).json({message: 'Like ajouté !'}))
      .catch(error=>res.status(400).json({error}))
  }else if(bodyInfos.like === -1){
    Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:+1}, $push:{usersDisliked:req.body.userId}})
      .then(()=>res.status(200).json({message: 'Dislike ajouté !'}))
      .catch(error=>res.status(400).json({error}))
  }else{
    Sauce.findOne({_id: req.params.id})
    .then((sauce)=>{
      if(sauce.usersLiked.includes(req.body.userId)){
        Sauce.updateOne ({_id: req.params.id}, {$inc:{likes:-1}, $pull:{usersLiked:req.body.userId}})
        .then(()=>res.status(200).json({message: 'Like supprimé !'}))
      }else{
        Sauce.updateOne ({_id: req.params.id}, {$inc:{dislikes:-1}, $pull:{usersDisliked:req.body.userId}})
        .then(()=>res.status(200).json({message: 'Dislike supprimé !'}))
      }
    })
    .then(()=>res.status(200).json({message: 'Parfait !'}))
    .catch(error=>res.status(400).json({error}))   
  }
}

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      likes: 0,
      dislikes: 0,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(()=>res.status(201).json({message:'Objet enregistré !'}))
    .catch(error=>res.status(400).json({error}))  
  }
  
exports.modifySauce = (req, res, next) => {
  if(req.file){

    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlinkSync(`images/${filename}`)
    })
    .catch(error => res.status(400).json({ error }));

    sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }     
  }
  else {
    sauceObject = {...req.body}
  }
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}



exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, (err)=>{
      if(err){
        console.log('problème')
      } else {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(()=> res.status(400).json({ message: 'Objet non supprimé !'}));
    }});
  })
  .catch(error => {
    res.status(500).json({ message: 'Echec de la suppression !' });
    console.error(error);
  });
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error=>res.status(400).json({error})) 
  }

exports.getOneSauce = (req,res,next)=>{
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error=>res.status(404).json({error}))
  }


