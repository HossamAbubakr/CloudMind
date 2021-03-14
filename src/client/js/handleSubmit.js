import { linkChecker } from "./linkChecker";

async function handleSubmit(event) {
  event.preventDefault();
  // Get the text from the text field
  let formText = document.getElementById("url").value;
  // Pass the text to the linkChecker function and check if it passes
  if (linkChecker(formText)) {
    try {
      // Get a reference to the submit button
      let submitBtn = document.getElementById("submitBtn");
      // Get a reference to the logger
      let logger = document.getElementById("logger");
      // Log the action
      console.log("::: Form Submitted :::");
      // Disable the button while the request is being made to prevent repeated actions
      submitBtn.disabled = true;
      // Update Logger
      logger.innerText = "Working...";
      // Send the request to the backend and get the JSON data
      const apiCall = await fetch(`http://localhost:8081/scan/${formText}`);
      const apiResponse = await apiCall.json();
      // Load the results element with the data from the backend
      document.getElementById("results").innerHTML = `<table>
      <tr><td>Sentiment</td><td>Result</td></tr>
      <tr><td>Agreement:</td><td>${apiResponse.agreement.toLowerCase()}</td></tr>
      <tr><td>Subjectivity:</td><td>${apiResponse.subjectivity.toLowerCase()}</td></tr>
      <tr><td>Confidence:</td><td>${apiResponse.confidence}</td></tr>
      <tr><td>Irony:</td><td>${apiResponse.irony.toLowerCase()}</td></tr>
      </table>`;
      // Enable the submit button
      submitBtn.disabled = false;
    } catch (err) {
      // In case of an error enable the submit button again
      submitBtn.disabled = false;
      // Log the error
      console.log(err.message);
      // Update Logger
      logger.innerText = "Error...";
    }
  } else {
    // In case of a failure to match the URL alert the user
    alert("Invalid URL, please make sure you are entering a valid URL.");
    // Update Logger
    logger.innerText =
      "Invalid URL, please try a working URL, ex: https://flaviocopes.com/npm-peer-dependencies/";
  }
}

export { handleSubmit };
