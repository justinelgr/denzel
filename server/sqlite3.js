const sqlite3 = require('sqlite3').verbose();
const movies = require('./movies.json');
const awesome = require('./awesome.json');

/*
Open the connection to the databse
*/
function openDatabase() {
    let db = new sqlite3.Database('./denzel_project.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the denzel_project database.');
    });
    return db;
}

/*
Drop the tables if they exist
*/
function dropTables(db) {
    db.run('DROP TABLE IF EXISTS movies');
    db.run('DROP TABLE IF EXISTS awesome');
    console.log("The tables movies and awesome were dropped.");
}

/*
Create the tables movies and awesome in the database
*/
function createTables(db) {
    db.run('CREATE TABLE IF NOT EXISTS movies(link varchar(30), id varchar(30), metascore integer, rating float, synopsis varchar(30), title varchar(30), votes float, year integer)');
    db.run('CREATE TABLE IF NOT EXISTS awesome(link varchar(30), id varchar(30), metascore integer, rating float, synopsis varchar(30), title varchar(30), votes float, year integer)');
    console.log("The tables movies and awesome were created.");
}

/*
Insert the data from the movies.json file to the movies table of the database
*/
function insertMovies(db) {
    movies.forEach(movie => {
        const sql = 'INSERT INTO movies(link, id, metascore, rating, synopsis, title, votes, year) ' +
            'VALUES("' + movie.link + '", "' + movie.id + '", ' + movie.metascore + ', ' + movie.rating +
            ', "' + movie.synopsis + '", "' + movie.title + '", ' + movie.votes + ', ' + movie.year + ')';
        db.run(sql);
    })
    console.log("Data from the movies.json file were inserted in the database.");
}

/*
Insert the data from the awesome.json file to the movies table of the database
*/
function insertAwesome(db) {
    awesome.forEach(movie => {
        const sql = 'INSERT INTO awesome(link, id, metascore, rating, synopsis, title, votes, year) ' +
            'VALUES("' + movie.link + '", "' + movie.id + '", ' + movie.metascore + ', ' + movie.rating +
            ', "' + movie.synopsis + '", "' + movie.title + '", ' + movie.votes + ', ' + movie.year + ')';
        db.run(sql);
    })
    console.log("Data from the awesome.json file were inserted in the database.");
}

/*
Close the database connection
*/
function closeDatabase(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function main() {
    let db = openDatabase();

    //dropTables(db);
    //createTables(db);
    //insertMovies(db);
    //insertAwesome(db);
    
    closeDatabase(db);
}

main();