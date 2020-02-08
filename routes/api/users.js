const express = require('express');
const router  = express.Router();
const gravatar=require('gravatar');
const bcrypt  =require('bcryptjs');
const jwt     = require('jsonwebtoken');
const config  =require('config');
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

const Ueser = require('../../models/User');

// @route   POST api/users
// @desc    Register Route
// @access  Public

router.post('/',[
    // name must be fill
    check('name','Name is required').not().isEmpty(),
    // email must be an email
     check('email','Please include valid email').isEmail(),
    // password must be at least 5 chars long
     check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
   ], async (req,res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            console.log('User already exists');
         return res.status(400).json({ errors: [{
               param:'email',
               msg:'User already exists'
           }] });
        }
      const avatar = gravatar.url(email,{
          s: '200',
          r: 'pg',
          d:'mm'
      });

       user = new User({
          name,
          email,
          avatar,
          password
      });

      const salt    = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);
      await user.save();

      const payload = {
        user:{
            id:user.id
        }
      }
      jwt.sign(
          payload,
          config.get('jwtSecret'),
          {expiresIn:360000},
          (err,token)=>{
              if(err) throw err;
              res.json({token})

          }
      );
       // res.send('User registered')
    }catch (err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});



module.exports = router;