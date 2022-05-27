const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=4d2719da4e6a5e05775f6aef933e8bc9&units=metric";
    https.get(url, function(response) {
        response.on("data", function(data) {
            var weatherData = JSON.parse(data);
            if(weatherData.cod === 200){
                var iconURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png";
                res.write("<p>The temperature in "+ weatherData.name + " is " + weatherData.main.temp + "</p>");
                res.write("<img src=" + iconURL + " alt=\"weather icon\">");
                res.send();
            }
            else {
                res.send("<h3>Invalid city</h3>");
            }
        }).on("error", function (param) {
            res.sendFile(__dirname + "/index.html");
          });
    });
});



app.listen(8000, function() {
    console.log("Server is running on port 8000");
});