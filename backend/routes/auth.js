const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middlewares/auth');

const { signup, login, logout, checkAuth, updateProfile } = require('../controllers/auth');

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", isAuthenticated, checkAuth);
router.post("/updateProfile", isAuthenticated, updateProfile);

module.exports = router;