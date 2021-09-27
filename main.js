// Please see the other JavaScript files in this project for examples from each of the three major paradigms (approaches to code organization).

// Uncomment only ONE of the following three approaches at one time to test it.

// ImperativeApproach()
// ObjectOrientedApproach()
FunctionalApproach()


// Brief setTimeout demo ##################################
const timerId = setTimeout(() => console.log("This will run fourth, unless it is cancelled first"), 5000)
clearTimeout(timerId)
setTimeout(() => console.log("This will run third"), 1000)
setTimeout(() => console.log("This will run second"), 0)
console.log("This console log will run first")