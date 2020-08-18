export default {
  state: {
    todos: [],
    oldValue: []
  },
  mutations: {
    updateTodos(state, todos) {
      state.todos = todos;
    },
    removeTodo(state, id) {
      const todoForRemove = state.todos.findIndex(a => a.id === id);
      state.todos.splice(todoForRemove, 1);
    },
    update(state, todo) {
      state.todos = state.todos.filter(element => element.id !== todo.id);
      state.todos.push({ ...todo });
    },
    updateOldValue(state, todo) {
      state.oldValue = {
        ...state.todos.filter(element => element.id === todo.id)
      };
    }
  },
  actions: {
    getTodos(context, todos) {
      context.commit("updateTodos", todos);
    },
    removeTodosAction(context, id) {
      context.commit("removeTodo", id);
    },
    updateAction(context, todo) {
      context.commit("update", todo);
    },
    oldValueAction(context, todo) {
      context.commit("updateOldValue", todo);
    }
  },
  getters: {
    allTodos(state) {
      return state.todos;
    }
  }
};
