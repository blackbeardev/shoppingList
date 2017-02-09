//Require mongoose, List
var mongoose = require("mongoose"),
    List = require("./models/lists");

//Create the dummyList
var dummyList = [
        {
            title: "Shopping list 1",
            date: "08/02/17",
            content: "potatoes, pumpkin, beer, oranges"
        },
        {
            title: "Shopping list 2",
            date: "09/03/17",
            content: "tampons, ibuprofen, toilet paper, chocolate"
        },
        {
            title: "Shopping list 3",
            date: "010/04/17",
            content: "tuna, rice, wine, seahorses"
        }
    ];
    
//Create the seedDB function
var seedDB = function() {
    //Remove all entries from the database
    List.remove({}, function(err) {
        if(err) {
            console.log(err);
            console.log("All entries removed!");
        }
        dummyList.forEach(function(list) {
            List.create(list, function(err, newlyCreated) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("New list added");
                }
            });
        });
    });
};

//Export seedDB
module.exports = seedDB;