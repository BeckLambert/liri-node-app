require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
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

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
    // + movieQuery +
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            var concertData = JSON.parse(body);

            var concertDT = concertData[0].datetime
            var momentDT = moment().format('L');


            console.log(concertData);
            // for (i = 0; i < movieData.length && i < 5; i++) {
          
            // * Name of the venue
            console.log("Venue Name : " + concertData[0].venue.name +
                // * Venue location
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
                "\nDate of the Event: " + momentDT);
        };
    });
}