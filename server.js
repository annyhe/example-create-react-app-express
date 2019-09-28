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

// dbSchema = `CREATE TABLE IF NOT EXISTS FavoriteItems (
//     id integer NOT NULL PRIMARY KEY,
//     combination text NOT NULL UNIQUE
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
        });
    }); 
})

app.get('/api/favorites', (req, res) => {
    db.serialize(function() {
        db.all("SELECT * FROM FavoriteItems", function(err, allRows) {
            if(err != null){
                console.log(err);
            }

            res.send({favorites: allRows});
        });
    }); 
})

app.post('/api/world', (req, res) => {
    console.log(req.body)
    if (req.body.isFavorite) {
        db.run(`INSERT INTO FavoriteItems(combination) VALUES(?)`, [req.body.id], function(error) {
            if (error) {
                console.log(error)
            } else {
                res.send("# of Row Changes: " + this.changes + ". ID: " + this.id)                
            }
        });
    } else {
        db.run(`DELETE FROM FavoriteItems WHERE combination=?`, req.body.id, function(error) {
            if (error) {
                console.log(error)
            } else {
                res.send("# of Row Changes: " + this.changes + ". ID: " + this.id)
            }
        });        
    }
    
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
