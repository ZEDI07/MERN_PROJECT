const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authorization')
const goalController = require("../controller/goal.controller")

router.get('/',authenticate,goalController.getGoals)
router.post('/setGoal',authenticate,goalController.setGoal)
router.put('/updateGoal/:id',authenticate,goalController.updateGoal)
router.delete('/removeGoal/:id',authenticate,goalController.removeGoal)
module.exports = router;