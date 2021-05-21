/*        DOTENV        */
const dotenv = require("dotenv");
dotenv.config();
/*        PATH MODULE        */
var path = require("path");
/*        EXPRESS        */
const express = require("express");
const app = express();
/*        STATIC FOLDER        */
app.use(express.static("dist"));
/*        CORS        */
const cors = require("cors");
app.use(cors());
/*        AXIOS        */
const axios = require("axios");
/*        END POINTS        */
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/scan/*", async (req, res) => {
  try {
    // if a named param is used then the url would have to be encoded
    const url = req.params[0];
    // API endpoint
    apiURL = "https://api.meaningcloud.com/sentiment-2.1";
    // load the API key from the env file 
    apiKey = process.env.API_KEY;
    // make a get request to the API endpoint
    const apiResponse = await axios.get(`${apiURL}?key=${apiKey}&url=${url}&lang=en`);
    // get the results and send it back
    const { agreement, subjectivity, confidence, irony } = apiResponse.data;
    res.send({ agreement, subjectivity, confidence, irony });
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha..This shouldn't be happening..." + err);
  }
});

app.listen(8081, function () {
  console.log("Server is running on port 8081!");
});
