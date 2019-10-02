require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');
var axios = require('axios');

//moment js
var moment = require('moment');
// moment().format();

//variable for input
var command = process.argv[2];
var input = process.argv[3];


function bandsInTown(bandQuery) {

    // bands in town url
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp";
  
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            var concertData = JSON.parse(body);

            var concertDT = concertData[0].datetime
            var momentDT = moment().format('L');


            console.log(concertData); 
            // Name of the venue
            console.log("Venue Name : " + concertData[0].venue.name +
                // Venue location
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                //Date of the Event (use moment to format this as "MM/DD/YYYY")
                "\nDate of the Event: " + momentDT);
        };
    });
}
// bandsInTown();

function spotifyThis(musicSearch) {

    //If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (musicSearch === undefined || null) {
        musicSearch = "Panic at the disco";
    }

    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
                    
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var musicQuery = data.tracks.items[i];
                // console.log("===============================");
                 // * Artist(s)
                console.log("Artist: " + musicQuery.artists[0].name +
                // * The song's name
                "\nSong Name: " + musicQuery.name +
                //* A preview link of the song from Spotify
                "\nLink to Song: " + musicQuery.preview_url +
                //* The album that the song is from
                "\nAlbum Name: " + musicQuery.album.name +
                "\n===============================");
            }
        };  
    });
}

// spotifyThis();

function movieIt (movieQuery) {
 
    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'
     if (movieQuery === undefined || null) {
            movieQuery = "Mr.Nobody";
        }

    // omdb API key
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) { 
        
    // If the request is successful
       if (!error && response.statusCode === 200) {      
           // JSON.parse for legibility
            var movieData = JSON.parse(body);
                                   
            // for (i = 0; i < movieData.length && i < 5; i++) {
                console.log("===============================");
            // * Title of the movie.              
                console.log("Movie Title: " + movieData.Title +
            // * Year the movie came out.
                "\nYear: " + movieData.released +
            // * IMDB Rating of the movie.
                "\nIMDB Rating: " + movieData.imdbRating +
            // * Rotten Tomatoes Rating of the movie.
                "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
            // * Country where the movie was produced.
                "\nCountry: " + movieData.Country +
            // * Language of the movie.
                "\nLanguage: " + movieData.Language +
            // * Plot of the movie.
                "\nPlot: " + movieData.Plot +
            // * Actors in the movie.
                "\nActors: " + movieData.Actors +
                "\n===============================");             
            // };
        };
    }); 
};

// movieIt();

// Switch for commands for all functions
var ask = function (commands, data){
    switch(commands) {
        case "concert-this":
            concertIt(data);
            break;
        case "movie-this" :
            movieIt(data);
            break;    
        case 'spotify-this':
            spotifyIt(data); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
        default:
        console.log("Invalid command. Please try again");
    }
};

