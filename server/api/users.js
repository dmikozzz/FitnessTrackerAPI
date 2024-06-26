export default function (server, mongoose) {
  let connected = true // database connected
  // Creates a schema for "users" that defines the structure for "users"-document in the database.
  const usersSchema = new mongoose.Schema({
    name: { type: String, required:true },  // Every "user" will have a "name". 
    dailyActiveCaloriesGoal: { type: Number, required:true } // daily goal for the user
  });

  /* 
    Creates a Mongoose-model based on the usersSchema. 
    This makes it possible for us to create, read, update and delete documents in our "users"-collection. (CRUD)
  */
  const User = mongoose.model("users", usersSchema);

  /*
  Creates an GET-route at '/api/users'.
  When this route is called, it will get all the documents from our "users"-collection and sends them back as a JSON-response.
  */
  server.get('/api/users', async (req, res) => {
    try {
      const { name } = req.query; // Retrieve the name from query parameters
      let query = {};

      if (name) {
        query.name = name; // Exact match 
      }
        if (req.query.disconnect === 'true') { // if query request for disconnect=true our database will stop being connected.
          if (connected) {
            await mongoose.disconnect();
            connected = false;
            console.log("Database connection now offline.");
          }
        } else {
          if (!connected) { //reconnect if not connected
            await mongoose.connect("mongodb+srv://duricmitar:12345kyh@cluster0.u0p0rie.mongodb.net/");
            connected = true;
            console.log("Database connection back online.");
          }
        }

      const users = await User.find(query); // Use the query to filter users else show all users
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while retrieving the users." });
    }
  });


  // Creates a GET-route to retrieve a specific user with a specific ID.
  server.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id); // Fetches user with ID from the database.
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "An error occured on the server while retrieving user." });
    }
  });

  // Creates a POST-route to add a new user. 
  server.post('/api/users', async (req, res) => {
    try {
      const newUser = new User({ 
        name: req.body.name,
        dailyActiveCaloriesGoal: req.body.dailyActiveCaloriesGoal
       }) // Creates a new user with "name" and "dailyActiveCaloriesGoal" from request body.
      const savedUser = await newUser.save() // Saves the new user in the database.
      res.status(201).json(savedUser); // Sends back the saved user as JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while creating a new user." });
    }
  });

  // Creates a PUT-route to update an user with a specific ID.
  server.put('/api/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body); // Returns the updated user.
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser); // Sends back the updated user as JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while updating the user." });
    }
  });

  // Creates a DELETE-route to remove an user with a specific ID.
  server.delete('/api/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User has been deleted!" }); // Confirmation than an user has been deleted.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured on the server while deleting user." });
    }
  });

}
