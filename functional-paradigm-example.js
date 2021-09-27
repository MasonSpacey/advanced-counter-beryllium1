const FunctionalApproach = function () {
  /*
    The Functional Paradigm Approach:

      Organize 
  */

 
  function Counter (startingValue = 0, timerInterval = 1000) {
    const countView = document.querySelector("#count")
    let count = startingValue
    let intervalId = null

    // Render() here returns a function which will run the provided callback function AND then render the result on the page. This is called "function composition": that is, we are composing two functions together. Or you might imagine this as "wrapping" the function with another.
    const render = callback => () => {
      callback()
      countView.replaceChildren(count)
      console.log({ count })

      return count
    }

    return {
      next: render(() => count += 1),
      prev: render(() => count -= 1),
      reset: render(() => count = 0),
      skipForward: render(() => count += 10),
      skipBackward: render(() => count -= 10),
      startTimer: () => {
        if (intervalId !== null) {
          clearInterval(intervalId) // We don't want it to be possible for two timers to be running at the same time for the same counter. So we will cancel any previous timer before starting a new one.
        }

        render(() => count += 1)() // Increment and render the count once now, so that the user doesn't have to wait one full second before seeing proof that the button has done something.

        // THEN start the 1 second interval:
        intervalId = setInterval(render(() => count += 1), timerInterval)
      },
      stopTimer: () => clearInterval(intervalId),
    }
  }



  // CLICK EVENT LISTENER ####################################
  const counter = Counter()
  const controlsElement = document.querySelector("#controls")

  controlsElement.addEventListener("click", event => {
    const clickedElement = event.target
    
    if (clickedElement.id === "next") {
      counter.next()
    } else if (clickedElement.id === "prev") {
      counter.prev()
    } else if (clickedElement.id === "reset") {
      counter.reset()
    } else if (clickedElement.id === "skip-forward") {
      counter.skipForward()
    } else if (clickedElement.id === "skip-backward") {
      counter.skipBackward()
    } else if (clickedElement.id === "start-timer") {
      counter.startTimer()
    } else if (clickedElement.id === "stop-timer") {
      counter.stopTimer()
    }
  })

}

