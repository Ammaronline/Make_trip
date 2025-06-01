const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {
    filename: { type: String },
    url: { type: String, required: false, default: "https://www.houseofhiranandani.com/vlogs/storage/2019/01/35.png"}
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true }
});


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
