const path = require("path");
const app = require("express").Router();
const Exercise = require("../models/workout");

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

app.post("/api/workouts/", ({body}, res) => {
      Exercise.create(body)
            .then(dbWorkout => {
            res.json(dbWorkout);
            })
            .catch(err => {
            res.status(400).json(err);
      }); 
});

app.put("/api/workouts/:id", (req, res) => {
      Exercise.findOneAndUpdate({
          _id: req.params.id
      }, {
          $push: {
              exercises: req.body
          }
      }, {
          new: true
      })
      .then(dbWorkout => {
          res.json(dbWorkout);
      }).catch(err => {
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
  
  