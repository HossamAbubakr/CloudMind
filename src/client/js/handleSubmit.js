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
      // Make sure the logger is visible
      logger.style.visibility = 'visible';
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
      document.getElementById("td-agreement").innerHTML = apiResponse.agreement.toLowerCase()
      document.getElementById("td-subjectivity").innerHTML = apiResponse.subjectivity.toLowerCase();
      document.getElementById("td-confidence").innerHTML = apiResponse.confidence;
      document.getElementById("td-irony").innerHTML = apiResponse.irony.toLowerCase();
      // Hide Logger
      logger.style.visibility = 'hidden';
      // Reveal Table
      document.getElementById("sentiment-table").style.visibility = 'visible';
      // Enable the submit button
      submitBtn.disabled = false;
    } catch (err) {
      // In case of an error enable the submit button again
      submitBtn.disabled = false;
      // Log the error
      console.log(err.message);
      // Make sure the logger is visible
      logger.style.visibility = 'visible';
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
