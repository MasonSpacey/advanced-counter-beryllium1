const FunctionalApproach = function () {
  /*
    The Functional Paradigm Approach:

      Organize code by strictly limiting and closely controlling precisely where, when, and how side effects occur. To do this, functions are used to their full potential, making heavy use of:
        - Callback Functions: one function accepting another as input.
        - Function Composition: one function returning another as output (!!). Combined with callbacks (above) and closures (below), composition can allow you to COMBINE functions, like Lego bricks of interconnecting logic, in useful and reusable ways.
        - Closures: a function using a variable or parameter from a higher scope. This can have interesting data-protection benefits.

      See https://mdn.io/closures to read more about closures and see a few examples of function composition.

      ### CAN I USE THE PARADIGMS TOGETHER? AND WHY WOULD I? ###

      These three paradigms (Imperative-Procedural, Object-Oriented, and Functional) can be used together to an extent which varies between languages. They are not opposites.

      The Imperative-Procedural paradigm is most effective for organizing the smaller steps of logic in a program. It gets complicated in large, unbroken quantities. There aren't many abstractions - mostly just simple functions.
      
      The Object-Oriented paradigm is most effective for organizing easily-definable abstractions (overarching concepts) in a program. It gets complicated when the abstractions are defined poorly or no longer meet business needs.
      
      The Functional paradigm (FP) seems equally effective at both smaller logic steps and larger concepts. It can be used to varying degrees wherever it makes most sense for your program.
      
      FP has been increasing steadily in popularity over the last 10 years. In the JavaScript community particularly, OOP use has been relatively stable, while FP use has been trending upward.
  */

 
  function Counter (startingValue = 0) {
    const countView = document.querySelector("#count")

    // We keep all of our changeable values in one place.
    // We call this "state":
    const state = {
      count: startingValue,
      intervalId: null,
    }

    // The render() function below is the ONLY function here which
    // reassigns `count`. This reduces the number of places where 
    // something can go wrong with our most important data value!
    function render (callback) {
      return function () {
        state.count = callback()
        countView.replaceChildren(state.count.toLocaleString())
        console.log({ count: state.count })
        
        return state.count
      }
    }

    // Notice NO assignment operators!
    const next = render(() => state.count + 1)
    const prev = render(() => state.count - 1)
    const reset = render(() => state.count * 0)
    const skipForward = render(() => state.count + 10)
    const skipBackward = render(() => state.count - 10)
    const stopTimer = () => clearInterval(state.intervalId)
    const startTimer = () => {
      stopTimer() // We don't want two timers to be running at the same time for the same counter.
      next() // The user shouldn't have to wait one full second before seeing proof that the button has done something.
      state.intervalId = setInterval(next, 1000)
    }

    // Now we will return an object containing nothing but our functions.
    // We do NOT expose our state (changeable data) in a way which would 
    // permit some code somewhere else to change it in some way we have
    // not anticipated and designed for. We only expose the features we
    // want to permit.
    return {
      next,
      prev,
      reset,
      skipForward,
      skipBackward,
      stopTimer,
      startTimer,
      stopTimer,
    }
  }



  // CLICK EVENT LISTENER ####################################
  const counter = Counter()
  const controlsElement = document.querySelector("#controls")
  const clickHandler = event => ({
    "next": counter.next,
    "prev": counter.prev,
    "reset": counter.reset,
    "skip-forward": counter.skipForward,
    "skip-backward": counter.skipBackward,
    "start-timer": counter.startTimer,
    "stop-timer": counter.stopTimer,
  })[event.target.id]?.()  /* If the ID of the clicked element
                              matches up with a function listed
                              above, we will run that function. */

  controlsElement.addEventListener("click", clickHandler)

}

