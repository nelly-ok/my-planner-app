//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const dates = require(__dirname + "/dates.js")

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res){
  //res.send("Hello");
  let date = dates.getToday();

  Task.find(function(err, results){
    if(err){
      console.log(err)
    }else {
      console.log(results)
    }
  })

  res.render("grid", {day: date});
});



/*
app.post("/delete", function(req, res){
  const checkedID = req.body.checkbox;
  
});
*/

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server started successfully");
});







//MONGOOSE


const mongoose = require('mongoose');

//Creates connection and database if it doesnt exist
mongoose.connect("mongodb+srv://nellyok:mongotest@my-planner-zevbi.mongodb.net/my-plannerDB", { useNewUrlParser: true,  useUnifiedTopology: true } );

//**C**
const tasksSchema = new mongoose.Schema({
  day: String,
  date: [Number],
  entry1: String,
  entry2: String,
  entry3: String,
  entry4: String,
  //Validators
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please check your data entry, no rating"]
  }
  //relationship: subSchema
})
  
const Task = mongoose.model("Task", tasksSchema) //creates a collectioon Task that uses schema

const task = new Task ({
  day: "Sunday",
  date: [4,21],
  entry1: "Eat",
  entry2: "Sleep",
  entry3: "Piss",
  entry4: "",
  rating: 10
});

/*
const task2 = new Task ({
  day: "Sunday",
  date: [4,21],
  entry1: "Eat",
  entry2: "Sleep",
  entry3: "Piss",
  entry4: ""
});

const task3 = new Task ({
  day: "Sunday",
  date: [4,21],
  entry1: "Eat",
  entry2: "Sleep",
  entry3: "Piss",
  entry4: ""
});
*/

task.save();
/* Task.insertMany([task2, task3], function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Successfully ssved all to DB");
  }

}); //if alot
*/

//**R** 
Task.find(function(err, tasks){
  if(err) {
    console.log(err);
  } else {
    console.log(tasks);
  }

  

  tasks.forEach(function(task){
    console.log(task.day)
  });

});


//** U **
/* Task.updateOne({_id: "5e9a97119c8ca686884a1a3d"}, {entry4: "YERRRR"}, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Successfully updated the document")
  }
});
*/



// ** D ** 

Task.deleteOne({entry4: "YERRRR"}, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Success Deleted");
  };
});


Task.deleteMany({day: "Sunday"}, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Success Deleted Many");
  };
})




