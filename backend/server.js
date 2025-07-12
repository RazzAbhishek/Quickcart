// const express = require("express");
// const cors = require("cors");
// const connectDB =require("./config/db");
// const dotenv =require("dotenv");
// const userRoutes =require("./routes/userRoutes");
// const productRoutes =require("./routes/productRoutes");
// const cartRoutes =require("./routes/cartRoutes");
// const checkoutRoutes =require("./routes/checkoutRoutes");
// const orderRoutes =require("./routes/orderRoutes");
// const uploadRoutes =require("./routes/uploadRoutes");
// const subscribeRoute =require("./routes/subscribeRoute");
// const adminRoutes =require("./routes/adminRoutes");
// const productAdminRoutes =require("./routes/productAdminRoutes");
// const adminOrderRoutes =require("./routes/adminOrderRoutes");





// const app = express();
// app.use(express.json());
// app.use(cors());

// dotenv.config();



// const PORT =process.env.PORT || 3000;


// // connect to database(mongodb)

// connectDB();

// app.get ("/" ,(req ,res) => {
//     res.send("WELCOME TO QUICKCART API !");
// });

// // API routes
// app.use("/api/users",userRoutes);
// app.use("/api/products",productRoutes); 
// app.use("/api/cart",cartRoutes);
// app.use("/api/checkout",checkoutRoutes);
// app.use("/api/orders",orderRoutes);
// app.use("/api/upload",uploadRoutes);
// app.use("/api",subscribeRoute);



// //Admin
// app.use("/api/admin/users",adminRoutes);
// app.use("/api/admin/products",productAdminRoutes);
// app.use("/api/admin/orders",adminOrderRoutes);

// app.listen(PORT ,()=> {
//     console.log(`server is running on http://localhost:${PORT}`);
    
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // for serving static files

const connectDB = require("./config/db");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");

// Admin Routes
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();
dotenv.config();
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve Static Images from Public Folder
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Test Route
app.get("/", (req, res) => {
  res.send("WELCOME TO QUICKCART API!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);


// Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



