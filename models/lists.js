//Require mongoose
var mongoose = require("mongoose");

//Create the listSchema
var listSchema = new mongoose.Schema({
    title: String,
    date: String,
    content: String
});

//Compile the listSchema into a model
var List = mongoose.model("List", listSchema);

//Export List
module.exports = List;