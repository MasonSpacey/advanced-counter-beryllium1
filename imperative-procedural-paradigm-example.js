const ImperativeProceduralApproach = function () {

  /* 
    The Imperative-Procedural Paradigm Approach:
      Very few rules for organizing code. Simply use function statements, IF statements, FOR statements, etc., as normal. This approach tends toward unorganized code, except in small quantities.
      
      This is basically how you have been writing code. Most developers think of it as the style of code we will normally write when we aren't DELIBERATELY following (or FORCE to follow) a stricter approach to code organization, like the Object-Oriented or Functional approaches.
      
      This approach is best used in small doses WITHIN functions/methods.
  */

  const countView = document.querySelector("#count")
  let count = 0
  let intervalId = null

  function render () {
    countView.replaceChildren(count.toLocaleString())
    console.log({ count })
  }

  function next () {
    count += 1
    render()
  }

  function prev () {
    count -= 1
    render()
  }

  function reset () {
    count = 0
    render()
  }

  function skipForward () {
    count += 10
    render()
  }

  function skipBackward () {
    count -= 10
    render()
  }

  function startTimer () {
    if (intervalId !== null) {
      stopTimer() // We don't want it to be possible for two timers to be running at the same time for the same counter. So we will cancel a previous timer before starting a new one.
    }
    
    next() // Increment the count now, so that the user doesn't have to wait one full second before seeing proof that the button has done something.

    intervalId = window.setInterval(() => {
      count += 1
      render()
    }, 1000)
  }

  function stopTimer () {
    clearInterval(intervalId)
  }


  // CLICK EVENT LISTENER ####################################
  const controlsElement = document.querySelector("#controls")

  controlsElement.addEventListener("click", event => {
    const clickedElement = event.target
    
    if (clickedElement.id === "next") {
      next()
    } else if (clickedElement.id === "prev") {
      prev()
    } else if (clickedElement.id === "reset") {
      reset()
    } else if (clickedElement.id === "skip-forward") {
      skipForward()
    } else if (clickedElement.id === "skip-backward") {
      skipBackward()
    } else if (clickedElement.id === "start-timer") {
      startTimer()
    } else if (clickedElement.id === "stop-timer") {
      stopTimer()
    }
  })

}