/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const imdb = require('./imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const METASCORE = 77;

async function start (actor = DENZEL_IMDB_ID, metascore = METASCORE) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= metascore);

    movies_str = JSON.stringify(movies, null, 2);
    awesome_str = JSON.stringify(awesome, null, 2);

    console.log(`🍿 ${movies.length} movies found.`);
    console.log(movies_str);
    fs.writeFileSync('movies.json', movies_str, 'utf8');

    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(awesome_str);
    fs.writeFileSync('awesome.json', awesome_str, 'utf8');
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [, , id, metascore] = process.argv;

start(id, metascore);
