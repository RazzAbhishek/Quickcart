const mongoose =require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData =async () =>{
    try {
       // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
    //created a default admin
    const createdUser =await User.create({
        name:"Abhishek Raj",
        email:"admin@example.com",
        password:"123456",
        role:"admin",
    });

    // Assign the default user Id to each product

    const userID =createdUser._id;

    const sampleProducts = products.map((product)=>{
        return {...product,user: userID};
    });

    // insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");
    process.exit();
    } catch (error) {
        console.error("Error seeding the data:",error);
        process.exit(1);
    }
};

seedData();