const ObjectOrientedApproach = function () {
  /*
    The Object-Oriented Programming Approach:
      - "Object-oriented" means "group your data and related functions"
      - "Message-oriented" means "when you send the same message to two objects, they respond differently" (Polymorphism)
        - Polymorphism: When I tell the neighborhood kids it is time to go home, I have provided the same instruction to each of them, but they each interpret what that means for them: each will go to their OWN home, taking whatever distinct path they need to accomplish that task. This is the heart of Object-Oriented Programming.

      Two Most Central Concepts:

      Polymorphism: Organize the code by providing a _consistent_ approach among related objects for accomplishing similar tasks in a way which permits code reuse when possible.

      Objects for Organizing Tasks: Organize the code by grouping your data and related functions all into an object.
      
      This approach works well for the larger, more important concepts in your program.

      In JavaScript, there are multiples ways to accomplish the goals of the Object-Oriented paradigm. The example below only uses one new language feature: the `this` keyword. In the next couple of weeks, we will explore other language features which will make Object-Oriented Programming simpler and more useful.
  */

  /*
    THE `THIS` KEYWORD ######

    The `this` keyword is the context in which the function is being CALLED (its "execution context"), not necessarily the same context in which function was DEFINED. By default, `this` will be whatever is to the left of the dot when you call the function.
    
    For example, when running `counter.next()`, the "counter" object will be the meaning of `this` inside next(), because "counter" is the execution context this time.

    And when running `advertisingCounter.next()`, the "advertisingCounter" object will be the meaning of `this` inside next(), because "advertisingCounter" is the execution context this time.
  */

  const counter = {
    countView: document.querySelector("#count"),
    count: 0,
    intervalId: null,

    render: function () {
      this.countView.replaceChildren(this.count.toLocaleString())
      console.log({ count: this.count })
    },

    next: function () {
      this.count += 1
      this.render()
    },

    prev: function () {
      this.count -= 1
      this.render()
    },

    reset: function () {
      this.count = 0
      this.render()
    },

    skipForward: function () {
      this.count += 10
      this.render()
    },

    skipBackward: function () {
      this.count -= 10
      this.render()
    },

    startTimer: function () { // THIS is considered a parameter
      if (this.intervalId !== null) {
        this.stopTimer() // We don't want it to be possible for TWO timers to be running at the same time for the same counter. So we will cancel this counter's previous timer before starting a new one.
      }

      this.next() // Increment and render the count once NOW, so that the user doesn't have to wait one full second before seeing proof that the button has done something.

      // THEN start the 1 second interval:
      this.intervalId = window.setInterval(this.next.bind(this), 1000)
    },

    // Normally, a function's THIS keyword will change meaning depending on where it is called/run/executed.
    // The bind() method allows me to turn OFF this feature, setting the THIS keyword to whatever object I want.

    stopTimer: function () {
      clearInterval(this.intervalId)
    },

  };

  // Examples of reusing the above functions in a new counter object:
  const advertisingCounter = {
    count: -100,
    intervalId: 0,
    render: counter.render,
    prev: counter.prev,
    reset: counter.reset,
    next: counter.next,
    skipForward: counter.skipForward,
    skipBackward: counter.skipBackward,
    startTimer: counter.startTimer,
    stopTimer: counter.stopTimer,
  }

  advertisingCounter.next()

  const newsletterCounter = {
    count: 500,
    render: counter.render,
    next: counter.next,
  }




  // CLICK EVENT LISTENER ####################################
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









