# Fsm-js

Fsm-js is a module to create and manipulate finite state machines. The module [behaviour-js](https://www.npmjs.com/package/behaviour-js) is required to manipulate fsm-js module. The documentation is located in the folder fsm-js_doc.

## Installation

### Package

Via npm:

```bash
$ npm install fsm-js
```

## Getting started

```js
// Add module for OneShotBehaviour
const OneShotBehaviour = require('behaviour-js').OneShotBehaviour;

// Add module for FSM
const FSM = require('fsm-js');

// To create another variables for this exemple
let message = "";
let count = 0;

// To create class "Behaviour1" inherits from OneShotBehaviour
class Behaviour1 extends OneShotBehaviour{

    action(){
        message += "Hello";
    }

    onEnd(){
        return "t1";
    }
}

// To create class "Behaviour2" inherits from OneShotBehaviour
class Behaviour2 extends OneShotBehaviour{

    action(){
        message += " ";
    }

    onEnd(){
        return "t2";
    }
}

// To create class "Behaviour3" inherits from OneShotBehaviour
class Behaviour3 extends OneShotBehaviour{

    action(){
        message += "world";
    }

    onEnd(){
        return "t3";
    }
}

// To create class "Behaviour4" inherits from OneShotBehaviour
class Behaviour4 extends OneShotBehaviour{

    action(){
        message += "!";
    }

    onEnd(){
        if(count < 3){
            count++;
            return "t4";
        }
        return "t5";
    }

}


// To create class "Behaviour5" inherits from OneShotBehaviour
class Behaviour5 extends OneShotBehaviour{

    action(){
        console.log(message);
    }
}

// To create a new FSM
let fsm = new FSM();

// To register all states
fsm.registerFirstState(new Behaviour1(), "b1");
fsm.registerState(new Behaviour2(), "b2");
fsm.registerState(new Behaviour3(), "b3");
fsm.registerState(new Behaviour4(), "b4");
fsm.registerLastState(new Behaviour5(), "b5");

// To register all transitions
fsm.registerTransition("b1", "b2", "t1");
fsm.registerTransition("b2", "b3", "t2");
fsm.registerTransition("b3", "b4", "t3");
fsm.registerTransition("b4", "b4", "t4");
fsm.registerTransition("b4", "b5", "t5");

// To execute the FSM
fsm.run();
```

## Author

If you have any questions or suggestions, please don't hesitate to contact me : <belaich.david@outlook.fr> .
