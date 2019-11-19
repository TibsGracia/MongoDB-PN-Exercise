// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/db_MotorRider';
mongoose.connect(db_url, { useNewUrlParser: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------

// Import Models
const Rider = require('./models/rider.model');
const Motorcycle = require('./models/motorcycle.model')


// Question 1 - Create a HTTP Request to add a riders in the database :
// When we create a rider he doesn't have a score yet.
app.post('/rider/create', (req, res) => {
    console.log(req.body)
    const data = new Rider({ 
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        age: req.body.age,
        score: req.body.score
     });
    data.save((err) => {
        if (err) return res.status(404).send({ message: err.message });
        return res.send({ data });
    });
});


// Question 2 - Create a HTTP Request to fetch all the riders :
app.get('/rider/fetch', (req, res) => {
    Rider.find({}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

// Question 3 - Create a HTTP Request to fetch one rider :
app.get('/rider/fetchOne/:id', (req, res) => {
    Rider.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})


// Question 4 - Create a HTTP Request to update firstName or/and lastName of a rider :
app.post('/rider/update/:id', (req, res) => {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    Rider.findByIdAndUpdate(req.params.id, data, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
        
    })
})


// Question 5 - Create a HTTP Request to ADD score of a rider :
app.post('/rider/updateScore/:id', (req, res) => {
    const data = req.body.score
    Rider.findByIdAndUpdate(req.params.id,{$push: {score: data}}, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
    })
})


// Question 6 - Create a HTTP Request to delete one rider :
app.post('/rider/delete/:id', (req, res) => {
    Rider.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})

// Question 7 - Create a HTTP Request to create motorcycles :
// For create a motorcycle you will need to create the model first.
app.post('/motorcycle/create', (req, res) => {
    console.log(req.body)
    const data = new Motorcycle({ 
        manufacturer: req.body.manufacturer, 
        displacement: req.body.displacement, 
        weight: req.body.weight,
        riderId: req.body.riderId
     });
    data.save((err) => {
        if (err) return res.status(404).send({ message: err.message });
        return res.send({ data });
    });
});

// Question 8 - Create a HTTP Request to fetch all the motorcycles:
app.get('/motorcyle/fetch', (req, res) => {
    Motorcycle.find({}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

// Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one rider:
app.get('/motorcyle/fetchmotor/:id', (req, res) => {
    Motorcycle.find({riderId: req.params.id}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

// BONUS 10 - Create a HTTP Request to to get the riders ranking


//
// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});