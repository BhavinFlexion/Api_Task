const express = require('express');

const router = express.Router();

const admin = require('../model/adminmodel');

const adminController = require('../controller/admincontroller');

router.post('/registerData', adminController.registerData);

router.post('/loginData',adminController.loginData);

router.post('/addData', admin.uploadAvatar, adminController.addData);

router.get('/getAllData', adminController.getAllData);

router.patch('/updateData/:id', admin.uploadAvatar, adminController.updateData);

router.delete('/deletedata/:id', adminController.deletedata);

router.get('/getData', adminController.getData);

module.exports = router;