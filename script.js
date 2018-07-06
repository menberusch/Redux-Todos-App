// We need a reducer(rootReducer)
// We need some redux store and initialState
// We need some way of changing the state

const initialState = {
  todos: [],
  id: 0
};

function rootReducer(state=initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      //add todo
      var newState = {...state};
      newState.id++
      return {
        ...newState,
        todos: [...newState.todos, {todo: action.todo, id: newState.id}]
      };
    case 'REMOVE_TODO':
      let todos = state.todos.filter(todo => todo.id !== action.id);
      return {...state, todos};
    default:
      return state; 
  }
}

const store = Redux.createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

$(document).ready(function() {
  $('ul').click('button', function(e) {
    store.dispatch({
      type: 'REMOVE_TODO',
      id: parseInt($(e.target).attr('id'))
    });
    $(e.target).parent().remove();
  });

  $('form').submit(function(e) {
    e.preventDefault();
    let newTodo = $('#todo-input').val();
    store.dispatch({
      type: 'ADD_TODO',
      todo: newTodo
    });
    let currentState = store.getState();
    let $newLi = $('<li>', {
      text: newTodo
    });
    let $newButton = $('<button>', {
      text: 'X',
      id: currentState.id
    })

    $('#todos').append($newLi.append($newButton));
    $(this).trigger('reset');
  });
});