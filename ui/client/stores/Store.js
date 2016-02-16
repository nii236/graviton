import alt from 'client/utils/Alt';
import Actions from 'client/actions';
class Store {
  constructor() {
    this.TodoList = {};
    this.bindListeners({
      handleGetTodoList: Actions.GET_TODO_LIST
    });
  }

  handleGetTodoList(message) {
    console.log('Store: ', message);
  }

}

export default alt.createStore(Store, 'Store');
