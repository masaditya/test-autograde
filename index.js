import { getInput, setOutput, setFailed } from '@actions/core'
import { context } from '@actions/github'

try {
    const nameToGreet = getInput('who-to-greet')
    console.log(`Yo ngene! ${nameToGreet}`)
    const time = (new Date()).toTimeString()
    setOutput("time", time)

    const payload = JSON.stringify(context.payload, undefined, 2)
    console.log(`Event payload e ${payload}`)
} catch (error) {
    setFailed(error.message)
}