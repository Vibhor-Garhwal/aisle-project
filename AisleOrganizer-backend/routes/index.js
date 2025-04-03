const express = require("express");
const userRouter = require('./user');
const accountRouter = require('./acounts');

const router = express.Router();
//all request to the /api/v1/user to the user router
router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router;
