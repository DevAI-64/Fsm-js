const Graph = require("graph-js");

/** Class FSM, finite state machine.
 */
class FSM{

  #graph;
  #idFirstState;
  #idLastState;

  constructor(){
    this.#graph = new Graph();
    this.#idFirstState = null;
    this.#idLastState = null;
  }

  /** This method returns the finite state machine's graph.
   * @returns {Graph} the finite state machine's graph.
   */
  getGraph(){
    return this.#graph;
  }

  /** This method registers the first state of FSM.
   * @param {Behaviour} behaviour a desired behaviour (OneShotBehaviour, CyclicBehaviour, FSMBehaviour...).
   * @param {any} id state's identifier (only number or string).
   */
  registerFirstState(behaviour, id){

    this.#idFirstState = id;
    this.#graph.addNode(behaviour, id);
  }

  /** This method registers the last state of FSM.
   * @param {Behaviour} behaviour a desired behaviour (OneShotBehaviour, CyclicBehaviour, FSMBehaviour...).
   * @param {any} id state's identifier (only number or string).
   */
   registerLastState(behaviour, id){

    this.#idLastState = id;
    this.#graph.addNode(behaviour, id);
  }

  /** This method registers a state of FSM.
   * @param {Behaviour} behaviour a desired behaviour (OneShotBehaviour, CyclicBehaviour, FSMBehaviour...).
   * @param {any} id state's identifier (only number or string).
   */
  registerState(behaviour, id){

    this.#graph.addNode(behaviour, id);
  }

  /** This method registers the default transition.
   * @param {any} idStateStart the start state's identifier.
   * @param {any} idStateEnd the end state's identifier.
   */
  registerDefaultTransition(idStateStart, idStateEnd){

    this.#graph.addEdge(idStateStart, idStateEnd, "default");
  }

  /** This method registers the default transition.
   * @param {any} idStateStart the start state's identifier (only number or string).
   * @param {any} idStateEnd the end state's identifier (only number or string).
   * @param {any} id the transition's identifier (only number or string).
   */
  registerTransition(idStateStart, idStateEnd, id){

    this.#graph.addEdge(idStateStart, idStateEnd, id);
  }

  #execute(id){

    const nodes = this.#graph.getNodes();
    const edges = this.#graph.getEdges();
    let behaviour = null;
    let transition = null;

    nodes.forEach((node) => {

      if(Graph.equal(node.getId(), id)){

        behaviour = node.getContent();
        behaviour.action();

        while(!behaviour.done()) {
          behaviour.action();
        }

        transition = behaviour.onEnd();

        if(!Graph.equal(id, this.#idLastState)){

          edges.forEach((edge) => {

            if(Graph.equal(edge.getId(), transition)){
              this.#execute(edge.getNodeEnd().getId());
            }
          });
        }
      }
    });
  }

  /** This method runs the FSM.
   */
  run(){
    this.#execute(this.#idFirstState);
  }
}

module.exports = FSM;
