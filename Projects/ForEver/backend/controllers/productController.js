import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // console.log(name, description, price, category, subCategory, sizes, bestseller)
    // console.log(imageUrl)

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes : JSON.parse(sizes),
      image : imageUrl,
      date : Date.now()
    };

    // console.log(productData)
    const product = new Product(productData)
    await product.save()


    res.json({success : true, message : 'Product Added Succesfully'});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        res.json({success : true, products})
    } catch (error) {
        console.log(error)
        res.json({ success : false , message : error.message})
    }
};

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id)

        res.json({success : true, message : 'Product removed'})
    } catch (error) {
        console.log(error)
        res.json({ success : false , message : error.message})
    }
};

// function for single add product
const singleAddProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Product.findById(productId)
        res.json({success : true, product})
    } catch (error) {
        console.log(error)
        res.json({ success : false , message : error.message})
    }
};

export { addProduct, listProducts, removeProduct, singleAddProduct };
