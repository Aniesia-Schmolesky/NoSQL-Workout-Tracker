const path = require("path");
const app = require("express").Router();
const Exercise = require("../models");

app.get("/api/workouts", (req, res) => {
   Exercise.aggregate([
         {
               $addFields: {
                     totalDuration: {
                           $sum:'$exercises.duration',
                     },
               },
         },
   ])
   .then((dbWorkout) => {
      res.json(dbWorkout);
  })
  .catch((err) => {
      res.json(err);
  });     
});

app.get("/api/workouts/range", (req, res) => {
      Exercise.aggregate([
            {
                  $addFields: {
                        totalDuration: {
                              $sum:'$exercises.duration',
                        },
                  },
            },
      ])
      .then((dbWorkout) => {
         res.json(dbWorkout);
     })
     .catch((err) => {
         res.json(err);
     });     
   });
  
app.get("/exercise", function(req, res) {
   res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
  
app.get("/stats", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = app;
  
  