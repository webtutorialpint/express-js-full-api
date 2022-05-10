const mongoose = require("mongoose");
const { connectMongoose } = require("../db-connection");

var Schema = mongoose.Schema;
let productsSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
});
let productsModel = mongoose.model("products", productsSchema);

const getProductsMongoose = async () => {
  connectMongoose();
  let products = [];
  query = {};

  try {
    products = await productsModel.find(query, { _id: 0, __v: 0 }); // products = await productsModel.find({}).select("name");
  } catch (err) {
    records = [];
  }
  return products;
};

const createProductsMongoose = async (product) => {
  connectMongoose();
  query = { id: product.id, name: product.name, price: product.price };
  let response = "";
  const doc = new productsModel(query);
  try {
    await doc.save();
    response = "Product inserted successfully";
  } catch (err) {
    console.log(err);
    response = "Product Insertion Failed!";
  }
  return response;
};

const updateProductsMongoose = async (product) => {
  connectMongoose();
  const filter = { id: product.id };
  const update = { name: product.name, price: product.price };
  let response = "";
  let doc = await productsModel.findOneAndUpdate(filter, update, {
    new: true,
    rawResult: true, // Return the raw result from the MongoDB driver
  });

  try {
    if (doc.lastErrorObject.updatedExisting == true) {
      response = "Updated product Reecord";
    } else {
      response = "Product Updation Failed";
    }
  } catch {
    response = "Product Updation Failed";
  }
  return response;
};

const deleteProductsMongoose = async (ID) => {
  connectMongoose();
  let query = { id: ID };
  let deletedRecord = await productsModel.deleteOne(query);
  if (deletedRecord.deletedCount && deletedRecord.deletedCount > 0) {
    response = "Deleted product Sucessfully";
  } else {
    response = "Product Deletion Failed!";
  }
  return response;
};

module.exports = {
  getProductsMongoose,
  createProductsMongoose,
  updateProductsMongoose,
  deleteProductsMongoose,
};
