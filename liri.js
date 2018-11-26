require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//var liriReturn = process.argv[2];
//var movieName = process.argv[3];

var getArtistNames = function (artist) {
    return artist.name;
};

var getMyBand = function (artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            if (!jsonData.length) {
                console.log("No results found for " + artist);
                return;
            }

            console.log("Upcoming concerts for " + artist + ":");

            for (let i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];

                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );

            }
        }
    })
}

function getSpotify(song) {
    console.log(song);
    if (song === undefined || song === " ") {
        song = "Kiss"
    };

    spotify.search({
        type: "track",
        query: song
    },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log("Number: ", i, "/", songs.length);
                console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("Song Name: " + songs[i].name);
                console.log("Preview Song: " + songs[i].preview_url);
                console.log("Album Name: " + songs[i].album.name);
                console.log("------------------------------");

            }
        })
}


function getMovie(movie) {

    if (movie === undefined || movie === " ") {
        movie = "The Color Purple"
    };

    const queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            if (!jsonData.Ratings[1]) {
            } else { console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value) };
            console.log("------------------------------------------------------------------");
        }
    })
};

function followFileCommads() {
    let commands;
    let parameter;

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        const dataArr = data.split(',');

        for (var i = 0; i < dataArr.length; i++) {
            commands = dataArr[i]; i++;
            parameter = dataArr[i];
            console.log(commands, parameter);
            App(commands, parameter)
        };
    })
};

function App(commands, parameter) {

    switch (commands) {
        case `my-band`:
            getMyBand(parameter);
            break;
        case `spotify-this-song`:
            getSpotify(parameter);
            break;
        case `movie-this`:
            getMovie(parameter);
            break;
        case `do-what-it-says`:
            followFileCommads();
            break;
        default:
            console.log("Liri doesn't know that command.  Please try again.")
    }
};

App(process.argv[2], process.argv[3]);