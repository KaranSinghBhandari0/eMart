const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

// Multer config
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);  
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
});

const { login, logout, checkAuth, addNewProduct, updateProduct, deleteProduct, getAllOrders, updateOrderStatus } = require('../controllers/admin');
const { isAuthorized } = require('../Middlewares/auth');

router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", isAuthorized, checkAuth);
router.post("/addNewProduct", isAuthorized, upload.single('image'), addNewProduct);
router.put("/updateProduct/:id", isAuthorized, upload.single('image'), updateProduct);
router.delete("/deleteProduct/:id", isAuthorized, deleteProduct);
router.get("/allOrders", getAllOrders);
router.put('/updateOrderStatus', isAuthorized, updateOrderStatus )

module.exports = router;