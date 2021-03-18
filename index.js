const core = require('@actions/core')
const github = require('@actions/github')
const { default: axios } = require('axios');
const fs = require('fs');

async function main(){
try {
    const kelas = core.getInput('kelas');

    console.log(`Kelas ${kelas}!`);
    
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    
    fs.readFile('test.log','utf-8', (err, data)=> {
      if(data){
        // console.log(data)
        parseData(data)
      }
      else
        console.log("data empty")
    })

    sendData()
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main()

function parseData (data=""){
  let arrString = data.split(/\s+/)
  let indexFile = []
  let countPass = arrString.filter((item, i) => {
    if(item == "PASS"){
      indexFile.push(i)
      return item
    }
  })
  console.log(countPass)
  indexFile.forEach(i => {
    console.log(arrString[i+1])
  })
}

async function sendData ( ){
  let data = await axios.get('https://5fb13d76590189001644662d.mockapi.io/api/tugas')
  console.log(data.data)
}

