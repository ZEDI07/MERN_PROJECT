const Goal = require('../models/goalModel')

exports.getGoals = async(req,res) =>{
    try {
        const goals = await Goal.find({user:req.user.id});
        res.status(200).json(goals);
    } catch (error) {
        
    }
}

exports.setGoal=async(req,res)=>{
    try {
        console.log(req)
        const goals = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
       res.status(201).json(goals);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

exports.updateGoal=async(req,res)=>{
    try {
        const goalId = req.params.id;
        const userId = req.user.id;
       
        const goal = await Goal.find({_id:goalId, user:userId});
        if(goal !== null){
            console.log('enterrr')
            const result =  await Goal.findByIdAndUpdate(goalId,req.body,{new:true})    // new : true  >> return updated value , bydefault false
            console.log(result);
            res.status(200).json(result);
        } else {
            return res.status(400).json({message: 'Either you are not authorized to update goals or goal did not exist'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
   
}

exports.removeGoal=async(req,res)=>{
    try {
        const goalId = req.params.id;
        const userId = req.user.id;

        const goal = await Goal.find({_id:goalId, user:userId});
        if(goal !== null){
           const removedGoal = await Goal.deleteOne({_id:goalId});
            res.status(200).json(removedGoal);
        }else {
            res.status(400).json('goal not found or u are not authorized to remove that goal');
        }
       
    } catch (error) {
        res.status(400).json(error);
    }
   
}