import alt from 'utils/Alt';

class Actions {
  GetTodoList(message) {
    this.dispatch(message);
  }
}

export default alt.createActions(Actions);
