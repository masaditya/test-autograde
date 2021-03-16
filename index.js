const core = require('@actions/core')
const github = require('@actions/github')
const series = require('async');
const { default: axios } = require('axios');
const {exec} = require('child_process');
const fetch = require('node-fetch');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
async function main(){
try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    let data = await axios.get('https://5fb13d76590189001644662d.mockapi.io/api/tugas')
    console.log(data.data)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // const baseURL = 'http://localhost/'
    // let log = await fetch(new URL("test.log", document.baseURI))
    // console.log(log)
    
    fs.readFile('test.log','utf-8', (err, data)=> {
      if(data)
        console.log(data)
      else
        console.log("data empty")
    })
    
    // let file = await axios.get("test.log")
    // console.log(file)
    // var client = new XMLHttpRequest();
    // client.open('GET', '/test.log');
    // // client.getAllResponseHeaders = function() {
    //   console.log(client.responseText);
    // }
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main()
// const runExec = async ()=> {
//     return series.series([
//         () => exec('npm test 2>&1 | tee test.log'),
//         () => exec('cat test.log') 
//     ])
    
// }
// try {
//     const nameToGreet = core.getInput('who-to-greet')
//     // console.log(nameToGreet)
//     const time = (new Date()).toTimeString()
//     core.setOutput("time", time)
//     runExec().then(res => {
//         let x = await axios.get('https://5fb13d76590189001644662d.mockapi.io/api/tugas')
//         console.log(x)
//         console.log("res",res)
//     }).catch(err => {
//         console.log(err)
//     })
//     const payload = JSON.stringify(github.context.payload, undefined, 2)
//     // console.log(`Event payload e ${payload}`)
// } catch (error) {
//     core.setFailed(error.message)
// }