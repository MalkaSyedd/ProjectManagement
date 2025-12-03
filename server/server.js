
const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./UserSchema')
const Project = require('./Project.js');
const Team = require('./TeamName');



app.use(express.json());
app.use(cors())
app.listen(9000, ()=> { //listening on port 9000
    console.log('Server Started at ${9000}')
})

const mongoose = require('mongoose');
const mongoString = "mongodb+srv://malka:malka@cluster1.zp1xduq.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))

database.once('connected', () => console.log('Databased Connected'))

app.post('/createProject', async (req, res) => {
    try {
            const project = new Project(req.body);
            await project.save() //add await to make sure data fully saved before sending response
            console.log(`Project created! ${project}`)
            res.send(project)
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.post('/createTeam', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    console.log(`✅ Team created! ${team}`);
    res.send(team);
  } catch (error) {
    res.status(500).send(error);
  }
});



app.post('/createUser', async (req, res) => { //server side end point
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    const un = req.body.username //request object called req, contains all values in corresponding attirbutes while sending from client side to server side
    try {
        //Check if username already exists in database
        User.exists({username: un}).then(result => { //checks if user present in collection, if exists do nothing
            if(Object.is(result, null)) { //if not present, then create new user with recieved body from client side 
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else { //if user present send message 
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){
        res.status(500).send(error)
    }
})


app.get('/getUser', async (req, res) => {
    // console.log(`SERVER: GET USER REQ BODY: ${req.query}`)
    console.log("SERVER: GET USER REQ QUERY:", req.query);
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {firstName:1, lastName:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getTeams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/getProjects', async (req, res) => {
  try {
    const projects = await Project.find();
    let responseDetails = [];

    for (const project of projects) {
      const manager = await User.findById(project.mgr_id);
      const owner = await User.findById(project.prod_owner_id);
      const team = await Team.findById(project.team_id);

      responseDetails.push({
        project_id: project._id,
        project_name: project.proj_name,
        description: project.proj_desc,
        manager_details: manager,
        owner_details: owner,
        team_details: team
      });
    }

    res.send(responseDetails);
  } catch (error) {
    res.status(500).send(error);
  }
});
