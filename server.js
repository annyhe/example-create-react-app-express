const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const sqlite3 = require('sqlite3').verbose()
const DB_PATH = './sqlite.db'; // ':memory:';

let db = new sqlite3.Database(DB_PATH, err => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the ' + DB_PATH + ' SQlite database.')
});

// TODO: create schema for saved items
// dbSchema = `CREATE TABLE IF NOT EXISTS Items (
//     id integer NOT NULL PRIMARY KEY,
//     name text NOT NULL,
//     brand text NOT NULL,
//     url text NOT NULL UNIQUE,
//     type text,
//     color text
// );`

// db.exec(dbSchema, function(err){
// if (err) {
//     console.log(err)
// }
// });

// API calls
app.get('/api/hello', (req, res) => {
    db.serialize(function() {
        // let sql = 'SELECT id, name, brand, url, type, color FROM Items';
        db.all("SELECT * FROM Items", function(err, allRows) {

            if(err != null){
                console.log(err);
            }

            res.send({express: allRows});
            db.close();
        });
    });

    db.exec('PRAGMA foreign_keys = ON;', function(error)  {
        if (error){
            console.error("Pragma statement didn't work.")
        } else {
            console.log("Foreign Key Enforcement is on.")
        }
    });

    // res.send({ express: 'Hello From Express' })
})

app.post('/api/world', (req, res) => {
    console.log(req.body)
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`
    )
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

const server = app.listen(port, () => console.log(`Listening on port ${port}`))

process.on('SIGINT', () => {
    db.close(err => {
        if (err) {
            return console.error(err.message)
        }
        console.log('Close the database connection.')
    })
    server.close()
})
