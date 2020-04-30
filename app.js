//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const dates = require(__dirname + "/dates.js")
const APIKEY = require(__dirname + "/secret.js")
const path = require('path');

const app = express();


//Live Reload Start//

const livereload = require("livereload");

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

//Live Reload End//


//Connect Live Reload Start//

var connectLivereload = require("connect-livereload");


app.use(connectLivereload());

//Connect Live Reload End//

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});





app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"))

var me;

function getMe(item) {
  me = item
}

app.get("/", function (req, res) {
    //res.send("Hello");
    let date = dates.getToday();
    let time = dates.getTime();

    //let entries = req.body;

    var nelly;
    Task.find(function (err, results) {
        if (err) {

            console.log(err)
        } else {
            console.log("Retrieved entries from database tasks in db")
        }


        getMe(results)

        let nelly = results
        
        


        Subject.find(function (err, results) {
          if (err) {
    
              console.log(err)
          } else {
              console.log("Retrieved entries from database subjects in db")
          }


          res.render("grid", {
            day: date,
            info: nelly,
            subs: results,
            hr: time
        });
        
    
      });
    

        


    });

    //console.log("Me is", me, "end Me");


    

})



app.post("/", function (req, res) {

    let entries = req.body;
    console.log("I am body parser", entries)

    for (const item in entries) {
        if (Number.isInteger(parseInt(item[0])) && Number.isInteger(parseInt(item[1]))) {
            let sde = [parseInt(item[0]), parseInt(item[1]), parseInt(item[2])]

            let query = {
                day: sde
            }

            let update = {
                "entry": entries[item],
            };

            //console.log(entries[item[0] + item[1] + "0"])

            Task.findOneAndUpdate(query, update, function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("We have updated the needed shits", results)
                }
            });
        }

        if (item[0] == "s" && Number.isInteger(parseInt(item[4]))) {
          let sub = parseInt(item[4]);

            let query = {
                subject: sub
            }

            let update = {
                "entry": entries[item],
            };

            //console.log(entries[item[0] + item[1] + "0"])

            Subject.findOneAndUpdate(query, update, function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("We have updated the needed shits", results)
                }
            });
        }
    }
    //console.log(req.body);


     res.redirect("/");


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

app.listen(port, function () {
    console.log("Server started successfully");
});







//MONGOOSE


const mongoose = require('mongoose');

//Creates connection and database if it doesnt exist
mongoose.connect(APIKEY.mongoAuth(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//**C**
const tasksSchema = new mongoose.Schema({
    day: [Number],
    "entry": String,
    /*,
     //Validators
     rating: {
       type: Number,
       min: 1,
       max: 10,
       required: [true, "Please check your data entry, no rating"]
     }
     //relationship: subSchema */
})

const Task = mongoose.model("Task", tasksSchema) //creates a collectioon Task that uses schema

Task.find(function (err, tasks) {
    if (err) {
        console.log(err);
    } else {
        console.log("you have " + tasks.length + "Tasks");
    }
    /*
    tasks.forEach(function(task){
      console.log(task.day)
    }); */

    if (tasks.length != 140) {
        for (let s = 0; s < 5; s++) {
            for (let d = 0; d < 7; d++) {
                for (let e = 0; e < 4; e++) {
                    let task = new Task({
                        day: [s, d, e],
                        "entry": ""

                    });

                    task.save();
                };
            };
        };
    }
});



//task.save();
/* Task.insertMany([task2, task3], function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Successfully ssved all to DB");
  }

}); //if alot
*/

/* **R** 
Task.find(function(err, tasks){
  if(err) {
    console.log(err);
  } else {
    console.log(tasks);
  }

  

  tasks.forEach(function(task){
    console.log(task.day)
  });

}); */


//** U **
/* Task.updateOne({_id: "5e9a97119c8ca686884a1a3d"}, {entry3: "YERRRR"}, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Successfully updated the document")
  }
});
*/



// ** D ** 
/*
Task.deleteOne({entry3: "YERRRR"}, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Success Deleted");
  };
});*/
/*
Task.deleteMany( function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Success Deleted");
  };
}); 
*/





const subjectsSchema = new mongoose.Schema({
    subject: Number,
    "entry": String,
})

const Subject = mongoose.model("Subject", subjectsSchema) //creates a collectioon Task that uses schema

Subject.find(function (err, subjects) {
    if (err) {
        console.log(err);
    } else {
        console.log("you have " + subjects.length + "Subjects");
    }
    /*
    subjects.forEach(function(task){
      console.log(task.day)
    }); */

    if (subjects.length != 5) {
        for (let s = 0; s < 5; s++) {

            let subject = new Subject({
                subject: s,
                "entry": ""

            });

            subject.save();


        };
    }
});
