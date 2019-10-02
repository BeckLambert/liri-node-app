require("dotenv").config();

var keys = require("./keys.js");
// var spotify = spotify(keys.spotify);
var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var dotenv = require("dotenv").config();

//moment js
var moment = require('moment');
moment().format();

//variable for input
var command = process.argv[2];
var input = process.argv[3];


function bandsInTown(bandQuery) {

    // bands in town url
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
  
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

function spotifyThis(musicSearch) {

    //If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (musicSearch === undefined || null) {
        musicSearch = "The Sign Ace of Base";
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

spotifyThis();
