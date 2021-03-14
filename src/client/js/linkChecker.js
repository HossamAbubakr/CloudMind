function linkChecker(inputText) {
  // Log action
  console.log("::: Running checkURL :::", inputText);
  // Match URL regex pattern
  let urlPattern = new RegExp(
    /^((?:https?:\/\/)?[^.\/]+(?:\.[^.\/]+)+(?:\/.*)?)$/
  );
  console.log(urlPattern.test(inputText));
  // RegExp.test returns a boolean indicating whether there was a match or not
  return urlPattern.test(inputText);
}

export { linkChecker };
