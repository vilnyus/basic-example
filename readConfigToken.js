const fs = require('fs');

function readAiAccessToken() {
  // Read the configuration file
  fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading configuration file:', err);
      return;
    }

    try {
      // Parse the JSON data to an object
      const config = JSON.parse(data);

      // Access the token key
      const apiToken = config.apiToken;

      console.log('API Token:', apiToken);
      return apiToken;
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

}

module.exports = {
  readAiAccessToken,
};
