const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authorization')
const userController = require("../controller/user.controller")

router.get('/',authenticate,userController.getusers)
router.post('/login',userController.login)
router.post('/registerUser',userController.registerUser)
router.put('/updateUser/:id',userController.updateUser)
router.delete('/removeUser/:id',userController.deleteUser)
module.exports = router;