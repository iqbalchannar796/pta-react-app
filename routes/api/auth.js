const express = require('express');
const router  = express.Router();
const bcrypt  =require('bcryptjs');
const jwt     = require('jsonwebtoken');
const config  =require('config');
const auth    = require('../../middleware/auth');
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');




const User    = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Private

router.get('/', auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post('/',[
    // email must be an email
    check('email','Please include valid email').isEmail(),
    // password must be at least 5 chars long
    check('password','Password is required').exists()
], async (req,res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ errors: [{
                msg:'Invaid credentials'
            }] });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch){
            return res.status(400).json({ errors: [{
                msg:'Invaid credentials'
            }] });
        }

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