const core = require("@actions/core");
const github = require("@actions/github");
const { default: axios } = require("axios");
const fs = require("fs");

async function main() {
  try {
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    const { payload } = github.context;
    console.log(payload);
    fs.readFile("test.log", "utf-8", async (err, data) => {
      if (data) {
        const processedData = parseData(data);
        const gradeData = {
          user: {
            name: payload.head_commit.author.name,
            email: payload.head_commit.author.email,
            username: payload.head_commit.author.username,
            avatar: payload.sender.avatar_url,
            id: payload.sender.id,
          },
          assignment: {
            repo_url: payload.repository.html_url,
            repo_name: payload.repository.full_name.split("/")[1],
            last_push: new Date(
              payload.repository.pushed_at * 1000
            ).toLocaleString(["gmt", "id"]),
          },
          grade: {
            correct: processedData.correctTest.length,
            incorrect: processedData.incorrectTest.length,
            detail: processedData.testResult,
          },
        };
        console.log(gradeData);
        let response = await axios.post(
          "https://nostalgic-ramanujan-96cef2.netlify.app/.netlify/functions/postdata",
          gradeData
        );
        console.log(response);
      } else console.log("data empty");
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();

function parseData(data = "") {
  let arrString = data.split(/\s+/);
  let indexTestName = [];
  let indexTestNameClose = [];
  let testResult = [];
  let correctTest = [];
  let incorrectTest = [];

  arrString.forEach((item, i) => {
    if (item == "✓") {
      indexTestName.push(i);
      correctTest.push(i);
    }
    if (item == "✕") {
      indexTestName.push(i);
      incorrectTest.push(i);
    }
    if (item == "ms)") {
      indexTestNameClose.push(i + 1);
      return item;
    }
  });
  for (let i = 0; i < indexTestName.length; i++) {
    let testName = arrString
      .slice(indexTestName[i], indexTestNameClose[i])
      .join(" ");
    testResult.push(testName);
  }

  return { testResult, correctTest, incorrectTest };
}

async function sendData(gradeData) {}
