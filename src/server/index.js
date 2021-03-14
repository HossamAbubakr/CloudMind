/*        DOTENV        */
const dotenv = require("dotenv");
dotenv.config();

/*        PATH MODULE        */
var path = require("path");

/*        EXPRESS        */
const express = require("express");
const app = express();
const mockAPIResponse = require("./mockAPI.js");

/*        STATIC FOLDER        */
app.use(express.static("dist"));

/*        BODY PARSER        */
const bodyParser = require("body-parser");
// Allow parsing of nested objects
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

console.log(__dirname);

/*        CORS        */
const cors = require("cors");
app.use(cors());

/*        AXIOS        */
const axios = require("axios");

/*        END POINTS        */
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/scan/*", async (req, res) => {
  try {
    const url = req.params[0];
    apiURL = "https://api.meaningcloud.com/sentiment-2.1";
    apiKey = process.env.API_KEY;
    const apiResponse = await axios.get(
      `${apiURL}?key=${apiKey}&url=${url}&lang=en`
    );

    const { agreement, subjectivity, confidence, irony } = apiResponse.data;
    res.send({
      agreement,
      subjectivity,
      confidence,
      irony,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha..This shouldn't be happening..." + err);
  }
});

app.listen(8081, function () {
  console.log("Server is running on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
