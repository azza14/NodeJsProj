var express = require('express');
var router = express.Router();
const User= require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/insert', (req,res,next)=>{
  const user= new User({
    username:req.body.username,
    middlename:req.body.middlename,
    lastname: req.body.lastname,
    email:req.body.email,
    password:req.body.password,
    phonenumber: req.body.phonenumber,
    
  });
  user.save((result,error)=>{
    if(error){
      console.log(error)
      return;
    }
    console.log(result)
    res.redirect('/')
  })
  //res.render()
  //console.log(req.body.username)
})
module.exports = router;
