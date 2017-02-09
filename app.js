//Require express, body-parser, mongoose, method-override, passport, passport-local, passport-local-mongoose, lists.js, seedDB
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require("./seed"),
    List = require("./models/lists");
    
//Require express-session


//Set the views directory to hold ejs files
app.set("view engine", "ejs");

//Use the public directory to hold assets
app.use(express.static("public"));

//Use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//Use methodOverride
app.use(methodOverride("_method"));

//Connect mongoose to mongodb
mongoose.connect("mongodb://localhost/shoppinglist");


//Call the seedDB function
seedDB();

//==================
// ROUTES
//==================

//Create the get request for the root route
app.get("/", function(req, res) {
    res.render("home");
});

//Create the get request for the shopping list page
app.get("/lists", function(req, res) {
    List.find({}, function(err, allLists) {
        if(err) {
            console.log(err);
        } else {
            res.render("shopping", {lists: allLists});
        }
    });
});

//Create the get request for the new list page
app.get("/lists/new", function(req, res) {
    res.render("new");
});

//Create the post request for the new page
app.post("/lists", function(req, res) {
    var newList = req.body.list;
    List.create(newList, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/lists");
        }
    });
});

//Create the get request to show a particular list
app.get("/lists/:id", function(req, res) {
    List.findById(req.params.id, function(err, foundList) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {list: foundList});
        }
    });
});

//Create the put route for a particular list
app.put("/lists/:id", function(req, res) {
    List.findByIdAndUpdate(req.params.id, req.body.list, function(err, updatedList) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/lists");
        }
    });
});

//Create the delete route
app.delete("/lists/:id", function(req, res) {
    List.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        res.redirect("/lists");
    });
});









//Tell the server to listen for requests
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started..");
});