const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const sqlite3 = require('sqlite3').verbose()
const DB_PATH = './sqlite.db'; // ':memory:';
// open database in memory
let db = new sqlite3.Database(DB_PATH, err => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the ' + DB_PATH + ' SQlite database.')
});

dbSchema = `CREATE TABLE IF NOT EXISTS Items (
    id integer NOT NULL PRIMARY KEY,
    name text NOT NULL,
    brand text NOT NULL,
    url text NOT NULL UNIQUE,
    type text,
    color text
);`

db.exec(dbSchema, function(err){
if (err) {
    console.log(err)
}
});

// API calls
app.get('/api/hello', (req, res) => {
    let sql = `SELECT PlaylistId id,
    Name name
  FROM playlists
  WHERE PlaylistId  = ?`
    let playlistId = 1

    // first row only
    db.get(sql, [playlistId], (err, row) => {
        if (err) {
            return console.error(err.message)
        }
        return row
            ? console.log(row.id, row.name)
            : console.log(`No playlist found with the id ${playlistId}`)
    })

    db.exec('PRAGMA foreign_keys = ON;', function(error)  {
        if (error){
            console.error("Pragma statement didn't work.")
        } else {
            console.log("Foreign Key Enforcement is on.")
        }
    });

    res.send({ express: 'Hello From Express' })
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
