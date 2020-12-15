const core = require('@actions/core')
const github = require('@actions/github')
const series = require('async')
const {exec} = require('child_process');

const runExec = async ()=> {
    return series.series([
        () => exec('npm test 2>&1 | tee test.log'),
        () => exec('cat test.log') 
    ])
}
try {
    const nameToGreet = core.getInput('who-to-greet')
    // console.log(nameToGreet)
    const time = (new Date()).toTimeString()
    core.setOutput("time", time)
    runExec().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`Event payload e ${payload}`)
} catch (error) {
    core.setFailed(error.message)
}