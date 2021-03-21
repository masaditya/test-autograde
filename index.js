const core = require('@actions/core')
const github = require('@actions/github')
const { default: axios } = require('axios');
const fs = require('fs');

async function main(){
try {
    const kelas = core.getInput('kelas');
    console.log(`Kelas ${kelas}!`);
    const week = core.getInput('week');
    console.log(`Week ${week}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    const {payload } = github.context.payload
    fs.readFile('test.log','utf-8', (err, data)=> {
      if(data){
        console.log( parseData(data))
      }
      else
        console.log("data empty")
    })
    sendData()
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main()

function parseData (data=""){
  let arrString = data.split(/\s+/)
  let indexTestName = []
  let indexTestNameClose = []
  let indexFileName = []
  let testResult = []


  arrString.forEach((item, i) => {
    if(item == "√" || item == "×"){
      indexTestName.push(i)
    }
    if(item == "ms)"){
      indexTestNameClose.push(i+1)
    }
  })
    
  for (let i = 0; i < indexTestName.length; i++) {
    let testName = arrString.slice(indexTestName[i], indexTestNameClose[i]).join(" ")
    testResult.push(testName)
  }

  return testResult
}

async function sendData ( ){
  let data = await axios.get('https://5fb13d76590189001644662d.mockapi.io/api/tugas')
  console.log(data.data)
}

