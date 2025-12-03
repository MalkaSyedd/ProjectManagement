const mongoose = require("mongoose");

// Define the Project schema
const ProjectSchema = new mongoose.Schema({
  proj_name: String,         // project name
  proj_desc: String,         // project description
  prod_owner_id: String,     // product owner (user ID)
  mgr_id: mongoose.Schema.Types.ObjectId,            // manager (user ID)
  team_id: String            // team (team ID)
});

const Project = mongoose.model("Project", ProjectSchema); // Create the Project model
module.exports = Project; // Export the model

