export default function (server, mongoose) {

  // Creates a schema for "workout" that defines the structure for the "workout"-document in the database.
  const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User
    workout: String, // type of workout
    steps: Number, // how many steps taken
    distance: Number, // distance in km
    caloriesBurned: Number // how many calories burned 
  });

  /*
   Creates a Mongoose-model based on the workoutSchema. 
   This makes it possible for us to create, read, update and delete documents in our "workout"-collection. (CRUD)
 */
const Workout = mongoose.model("Workout", workoutSchema);

  // Create a GET-route to fetch all workouts.
  server.get('/api/workouts', async (req, res) => {
    try {
      const workouts = await Workout.find();
      res.json(workouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while fetching workout" });
    }
  });

  // Create a GET-route to get a specific workout ID.
  server.get('/api/workouts/:id', async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.json(workout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while fetching workout" });
    }
  });

  // Create a POST-route to create a new workout.
  server.post('/api/workouts', async (req, res) => {
    try {
      const newWorkout = new Workout({
        userId: req.body.userId,
        workout: req.body.workout,
        steps: req.body.steps,
        distance: req.body.distance,
        caloriesBurned: req.body.caloriesBurned
      }); // Creates a new workout with ^ from request body.
      const savedWorkout = await newWorkout.save(); // Saves the new workout in the database.
      res.status(201).json(savedWorkout); // Sends back the saved workout as JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while saving workout" });
    }
  });

   // Create a PUT-route to update a workout.
  server.put('/api/workouts/:id', async (req, res) => {
    try {
      const updateWorkout = {
        workout: req.body.workout,
        steps: req.body.steps,
        distance: req.body.distance,
        caloriesBurned: req.body.caloriesBurned
      };
      const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, updateWorkout, { new: true }); // Returns the updated workout.
      if (!updatedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.json(updatedWorkout); // Sends back the updated workout as JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while updating workout." });
    }
  });

  // Create a DELETE-route to remove a workout.
  server.delete('/api/workouts/:id', async (req, res) => {
    try {
      const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
      if (!deletedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.json({ message: "Workout has been removed!" }); // Confirmation than an user has been deleted.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while removing workout." });
    }
  });

}