const core = require('@actions/core')
const github = require('@actions/github')

try {
    const nameToGreet = core.getInput('who-to-greet')
    console.log(`Yo ngene! ${nameToGreet}`)
    const time = (new Date()).toTimeString()
    core.setOutput("time", time)

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`Event payload e ${payload}`)
} catch (error) {
    core.setFailed(error.message)
}