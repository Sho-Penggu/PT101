//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object


// Endpoint to Get a list of users from company.json file
app.get('/getUsers', (req, res) => {
    fs.readFile(__dirname + "/users.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading company.json:', err.message);
            res.status(500).json({ message: 'Error occurred while reading company data.' });
        } else {
            console.log(data);
            res.end(data);
        }
    });
});

// Create a server to listen at port 8080
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})



var user = {
    "users5":   {
        "id": 5,
        "companyName": "Xiaolin Company",
        "employees": [
          "A",
          "B",
          "C"
        ],
        "positions": [
          "Position X",
          "Position Y",
          "Position Z"
        ],
        "location": "Digos"
      },
} 

//The addUser endpoint
app.post('/addUser', function(req, res){
    //Step 2: read existing users
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //Step 3: append user variable to list
        data["users5"] = user["users5"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})


//Endpoint to get a single user by id
app.get('/:id', function (req, res) {
  // First retrieve existing user list
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    var userArray = JSON.parse(data);

    // Find the user with the specified id
    var userId = parseInt(req.params.id);
    var foundUser = null;

    userArray.forEach((users) => {
      for (var key in users) {
        if (users[key].id === userId) {
          foundUser = users[key];
          break;
        }
      }
    });

    if (foundUser) {
      console.log(foundUser);
      res.end(JSON.stringify(foundUser));
    } else {
      res.status(404).send('User not found');
    }
  });
});



  //Code to delete a user by id
  app.delete('/deleteUser/:id', function (req, res) {
    const id = parseInt(req.params.id);
  
    fs.readFile(__dirname + "/users.json", 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error while reading data');
      }
  
      let usersArray = JSON.parse(data);
  
      // Find the user with the specified "id" and delete it
      let userKey = 'users' + id;
  
      if (usersArray[0][userKey]) {
        delete usersArray[0][userKey];
  
        fs.writeFile(__dirname + "/users.json", JSON.stringify(usersArray, null, 2), 'utf8', (err) => {
          if (err) {
            return res.status(500).send('Error while saving data');
          }
  
          console.log('User deleted:', id);
          res.end('User deleted');
        });
      } else {
        return res.status(404).send('User not found');
      }
    });
  });
  
  
  
  //Update

  // PUT request to update an existing user by ID
  // PUT request to update an existing user by ID
app.put('/updateUser/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const updatedUserData = req.body;

  fs.readFile(__dirname + "/users.json", 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error while reading data');
    }

    let usersArray = JSON.parse(data);
    let userKey = 'users' + id;

    if (usersArray[0][userKey]) {
      // Update the user data with the new data
      usersArray[0][userKey] = { ...usersArray[0][userKey], ...updatedUserData };

      fs.writeFile(__dirname + "/users.json", JSON.stringify(usersArray, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).send('Error while saving data');
        }

        console.log('User updated:', id);
        res.end('User updated');
      });
    } else {
      return res.status(404).send('User not found');
    }
  });
});

  
