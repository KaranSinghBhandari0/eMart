const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middlewares/auth')

const { signup, login, logout, checkAuth } = require('../controllers/auth');

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", isAuthenticated, checkAuth)

module.exports = router;