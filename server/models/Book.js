const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: { type: String },
    name: { type: String },
    pages: { type: Number }
});


module.exports = mongoose.model("Book", bookSchema);
