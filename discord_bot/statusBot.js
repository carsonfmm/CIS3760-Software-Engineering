const { Client, Intents } = require('discord.js');
const axios = require('axios');
const https = require('https');
const fs = require('fs')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

setInterval(() => {
  fs.readFile('../output.json', 'utf8', (err, data) => {
    let jsonData = JSON.parse(data);
    let successEmoji = ":white_check_mark:"
    let failEmoji = ":x:"
    let testResults = jsonData.testResults;
    let overallResult = jsonData.success;

    // creating the status message to send to the user
    let message = "**TESTING STATUS:**\n\n"

    // if result is true add checkmark emoji, else add fail
    overallResult === true ? message += successEmoji : message += failEmoji

    message += " Overall Status\n\nFrontend Testing:\n"

    // looping through test suites continuing to build the string
    for (let i = 0; i < testResults.length; i++) {
      // assertion results stores the data for each test case
      let assertionResults = testResults[i].assertionResults;

      // looping through each test case in the test suite
      for (let j = 0; j < assertionResults.length; j++) {
        let title = assertionResults[j].title;
        let testStatus = assertionResults[j].status;
        // ignoring test one test case
        if (title != "test") {
          message += "\t"
          testStatus === "passed" ? message += successEmoji : message += failEmoji
          message += ` ${title}\n`
        }
      }
    }

    message += "\nBackend Testing:\n"

    const makeRequests = async (message) => {
      const urlsToTest = [
        "https://131.104.49.101/api",
        "https://131.104.49.101/api/course-search/guelph",
        "https://131.104.49.101/api/course-search/waterloo",
        "https://131.104.49.101/api/course-search/carleton",
        "https://131.104.49.101/api/courses/guelph",
        "https://131.104.49.101/api/courses/waterloo",
        "https://131.104.49.101/api/courses/carleton",
        "https://131.104.49.101/api/graph?university=guelph&subject=CIS",
        "https://131.104.49.101/api/graph-major?major=CS",
      ]
      // At request level
      const agent = new https.Agent({  
        rejectUnauthorized: false
      });

      for (let i = 0; i < urlsToTest.length; i++) {
        try {
          await axios.get(urlsToTest[i], { httpsAgent: agent })
          message += `\t${successEmoji} ${urlsToTest[i]}\n`
        } catch (err) {
          message += `\t${failEmoji} ${urlsToTest[i]}\n`
        }
      }

      // sending message to hard-coded channel id for our server
      client.channels.cache.get(`957012130450772018`).send(message);
    }

    makeRequests(message).catch(console.error);
  });
}, 1800000)

client.login('OTU3MDAzODI2NzA2MTQxMzI0.Yj4dRA.8mJK0Nc6dKmk3mVdOcyfWk_-gdk');
