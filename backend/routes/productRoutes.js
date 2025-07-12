const express = require("express");
const Product = require("../models/Product");
const { protect , admin} = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin (you can add admin middleware later)
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user:req.user._id,  //Reference to the admin user who created it.
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);

  } catch (error) {
    console.error( error);
    res.status(500).json("Server Error");
  }
});


// @route Put /api/products/:Id
// @desc update an existing product Id
// @access Private/admin

router.put("/:id",protect,admin,async(req,res) => {
    try {
      const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
 
    // Find product by Id

    const product = await Product.findById(req.params.id);
    
    if (product){
        // update product fields
          product.name = name || product.name;
          product.description = description || product.description;
          product.price = price || product.price;
          product.discountPrice = discountPrice || product.discountPrice;
          product.countInStock = countInStock || product.countInStock;
          product.category = category || product.category;
          product.brand = brand || product.brand;
          product.sizes = sizes || product.sizes;
          product.colors = colors || product.colors;
          product.collections = collections || product.collections;
          product.material = material || product.material;
          product.gender = gender || product.gender;
          product.images = images || product.images;
          product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
          product.isPublished =  isPublished !== undefined ? isPublished : product.isPublished;
          product.tags = tags || product.tags;
          product.dimensions = dimensions || product.dimensions;
          product.weight = weight || product.weight;
          product.sku = sku || product.sku;

        //   save the update product

        const updatedProduct =await product.save();
        res.json(updatedProduct);
    }else{
        res.status(404).json({message : "product not found"});
    }
  } catch (error){
    console.error(error);
    res.status(500).send("server error");
  }
});


//@route DELETE /api/products/:id
// @desc delete a product by id
// @access private /admin

router.delete("/:id", protect , admin ,async(req,res) => {
    try{
        // find the product by ID
        const product =await Product.findById(req.params.id);

        if(product){
            // remove the product from Db

            await product.deleteOne();
            res.json({message : "product removed"});
        }else{
           res.status(404).json({message:"product not found"});
        }
    }catch (error){
      console.error(error);
      res.status(500).send("server error");
    }
});

//@route GET /api/products
// @desc get all products with optional query filters
// @acess public
router.get("/",async(req,res)=>{
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    }= req.query;

    let query ={};

    // filter logic
    if(collection && collection.toLocaleLowerCase() !== "all"){
      query.collections =collection;
    }

    if(category && category.toLocaleLowerCase() !== "all"){
      query.category ={ $regex: new RegExp(category, "i") };
    }
    if(material){
      query.material ={$in: material.split(",")};
    }
        if(brand){
      query.brand ={$in: brand.split(",")};
    }
        if(size){
      query.sizes ={$in: size.split(",")};
    }
    if(color){
      query.colors ={$in: color.split(",")};
    }
    if(gender){
      query.gender = { $regex: new RegExp(gender, "i") };
    }
    if(minPrice || maxPrice){
      query.price ={};
      if(minPrice) query.price.$gte =Number(minPrice);
      if(maxPrice) query.price.$lte =Number(maxPrice);
    } 
    if(search){
      query.$or =[
        {name:{$regex:search,$options:"i"}},
        {description:{$regex:search,$options:"i"}},
      ];
    }

    // sort logic
    let sort ={};
    if(sortBy){
      switch(sortBy){
        case "priceAsc":
          sort = {price: 1};
          break;
        case "priceDesc":
          sort = {price: -1};
          break;
        case "popularity":
          sort = {rating: -1};
          break; 
         default:
          break; 
      }
    }

    // fetch products and apply sorting and limit
    let products =await Product.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route GET /api/products/best-seller
//@desc retrive the product with highest rating
//@access public

router.get("/best-seller", async (req,res)=>{
  try {
    const bestSeller =await Product.findOne().sort({rating: -1});
    if(bestSeller){
      res.json(bestSeller);
    }else{
      res.status(404).json({message:"No best seller found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

//@route GET /api/products/new-arrivals
//@desc reterive latest 8 product - creation date 
//@asecess public
router.get("/new-arrivals", async(req,res)=>{
  try {
    //fetch latest 8 products
    const newArrivals =await Product.find().sort({createdAt: -1}).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error ");
  }
});


// @route GET /api/products/similar/:id
// @desc retrieve similar products based on the current product's gender and category
// @aecess public

router.get("/similar/:id",async (req,res)=>{
  const {id} =req.params;
  try {
    const product =await Product.findById(id);
    if(!product){
      return res.status(404).json({message:"product not found"});
    }

    const similarProducts =await Product.find({
      _id:{$ne: id}, //exclude the current product id
      gender:product.gender,
      category:product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});


// @route GET /api/products/:id
// @desc get a single product by id
// @ascess public

router.get("/:id",async (req,res)=>{
  try {
    const product =await Product.findById(req.params.id);
    if(product){
      res.json(product);
    }else{
      res.status(404).json({message:"product not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});
module.exports = router;



