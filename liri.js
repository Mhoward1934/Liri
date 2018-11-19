require("dotenv").config();

var keys = require("/Users/monroehowardii/Desktop/homework/Liri/keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var liriReturn = process.argv[2];
var movieName = process.argv[3];


//Switches for various commands
switch (liriReturn) {
    case "spotify-this-song":
    spotifyThisSong();
    break;

    case "concert-this":
    concertThis();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
}
