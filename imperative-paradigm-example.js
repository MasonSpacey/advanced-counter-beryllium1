const ImperativeApproach = function () {

  /* 
    The Imperative/Procedural Paradigm Approach:
      Very few rules for organizing code. Simply use function statements, IF statements, FOR statements, etc.
  */

  const countView = document.querySelector("#count")
  let count = 0
  let intervalId = null

  function render () {
    countView.replaceChildren(count)
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
      clearInterval(intervalId) // We don't want it to be possible for two timers to be running at the same time for the same counter. So we will cancel a previous timer before starting a new one.
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