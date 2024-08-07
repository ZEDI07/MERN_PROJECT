const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const {generateToken} = require('../middleware/authorization')



exports.getusers=async(req,res)=>{
    const users = await User.find();
    res.status(200).json(users);
}


exports.registerUser=async(req,res)=>{
    try {
       // console.log(req.body)
        const {name,email,contact,password} = req.body;
        if(!name || !email || !contact || !password){
            return res.status(400).json({message:'please fill required feilds.'});
        }

        const userExisted = await User.findOne({email:email});
        if(userExisted){
           return res.status(400).json({message:'User Already Existed'});
        }

        // Hash the password 
        const salt = await bcrypt.genSalt(10);                      // generate incryption level 
        const hashedPass = await bcrypt.hash(password,salt);        // hash the password 
        
        // creating user 
        const registered = await User.create({name,email,contact,password:hashedPass});
       
        // sending response 
        if(registered){
            res.status(201).json({
                _id: registered._id,
                name: registered.name,
                email: registered.email,
                contact: registered.contact,
                password:registered.password,
                token: generateToken({id:registered._id,email,password})   // generate token for registered user and send in response
            });
    
        }
       
    } catch (error) {
        res.status(400).json(error);
    }
    
}

exports.login=async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'please fill required feilds.'});
        }

        const user = await User.findOne({email:email});
        
        if(user && (await bcrypt.compare(password,user?.password))){

          const token = generateToken({id:user._id,email,password});

            res.status(200).json({
                id : user._id,
                name: user.name,
                email: user.email,
                token
            })
        } else {
            return res.status(400).json({message:'Wrong Credentials !!'});
        }

    } catch (error) {
        res.status(400)
        throw new Error(error);
    }
    
}

exports.updateUser=async(req,res)=>{
    try {
        const Existed = await User.findById(req.params.id)
        if(Existed){
            const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.status(200).json(updateUser);
            
        }else{
            return res.status(400).json({message: 'Either you are not authorized to update goals or goal did not exist'});
        }
          
    } catch (error) {
        res.status(400).json(error);
    }
   
}

exports.deleteUser=(req,res)=>{
    res.status(200).json('Delete users');
}
