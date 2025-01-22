const mongoose = require('mongoose');
const Product = require('../models/Product');

const products =  [
  {
    "name": "Intel Core i3 12100F",
    "description": "💪🔥 🖥️Intel Core i3 12100F is a 12th Generation Alder lake Processor…",
    "price": 8899,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728407878/de4uhxl6l67iibzfymg1",
    "cloudinary_id": "de4uhxl6l67iibzfymg1",
    "category": "Electronics"
  },
  {
    "name": "CELLBELL Transformer Series Gaming/Racing Style Ergonomic High Back Chair",
    "description": "⚡️ GAMIFIED Experience : CELLBELL is dedicated to make the best gaming…",
    "price": 14999,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728408129/jpuu0knyndd1vtnwesus",
    "cloudinary_id": "jpuu0knyndd1vtnwesus",
    "category": "Furniture"
  },
  {
    "name": "Oneplus Nord CE4 (Dark Chrome, 8GB RAM, 128GB Storage)",
    "description": "Processor: The Qualcomm Snapdragon 7 Gen 3 chipset not only gives your…",
    "price": 19999,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728408383/mpf6iroqn8vwxvvvg3ok",
    "cloudinary_id": "mpf6iroqn8vwxvvvg3ok",
    "category": "Electronics"
  },
  {
    "name": "Titan Karishma Analog Black Dial Men's Watch NM1639SM02/NN1639SM02",
    "description": "Perfect Gift: Titan analog watch comes with Quartz Analog Movement and…",
    "price": 1500,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728410935/dhmf3tqtgy8coqpce4ly",
    "cloudinary_id": "dhmf3tqtgy8coqpce4ly",
    "category": "Clothing"
  },
  {
    "name": "Veirdo® Cotton Fleece Regular Fit Hooded Sweatshirt Full Sleeves Solid",
    "description": "STYLISH DESIGN: Create a lasting impression in this men's sweatshirt.",
    "price": 999,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728411426/sjkpnwtxj4nazcqqggb2",
    "cloudinary_id": "sjkpnwtxj4nazcqqggb2",
    "category": "Clothing"
  },
  {
    "name": "Jaspo Dominator Senior Plastic Tennis Cricket Full Size Bat",
    "description": "1. Comfortable Rubber Grip: Dominator cricket bat is specially designed…",
    "price": 599,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728411522/v6vtbrbwhz5zpz9julym",
    "cloudinary_id": "v6vtbrbwhz5zpz9julym",
    "category": "Sports"
  },
  {
    "name": "MamyPoko Pants All Night Absorb Baby Diapers, Medium (M), 48 Count",
    "description": "All Night Absorb Upto 12hrs. +50% Wider Criss Cross Sheet.",
    "price": 899,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728411636/dsgnauqf0h73t6edwix5",
    "cloudinary_id": "dsgnauqf0h73t6edwix5",
    "category": "ChildCare"
  },
  {
    "name": "Nivia Rubber Kross Rubber Hand Stitched Volleyball, Size 4",
    "description": "Rubberized Stitched 18 Panels Latex bladder offers optimum air retention.",
    "price": 499,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728411754/xy3vjg5qddfqcusgyf25",
    "cloudinary_id": "xy3vjg5qddfqcusgyf25",
    "category": "Sports"
  },
  {
    "name": "Red Tape Casual Sneaker Shoes for Men",
    "description": "Enhanced Comfort with Cushioned Insole and PU Upper.",
    "price": 1349,
    "image": "https://res.cloudinary.com/dvsgplgkf/image/upload/v1728495831/tt6h9nltrxr5abm4dhey",
    "cloudinary_id": "tt6h9nltrxr5abm4dhey",
    "category": "Clothing"
  }
]


let DB_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/E-commerce';

mongoose
  .connect(DB_url)
  .then(() => {
    console.log('Connected to MongoDB');
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Data seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
});