<template>
  <div>
    <h1>Персональный список дел</h1>
    <hr noshade size="2" />
    <popup
      v-if="popupVisible"
      :popupTitle="popupTitle"
      :popupText="popupText"
      @close-popup="closePopup"
      @confirm-popup="confirmPopup"
    ></popup>
    <new-todo v-show="showNewTodo" @add-todo="addTodo" :todos="todos" />
    <button
      class="button-newtodo"
      v-if="!showNewTodo"
      type="submit"
      @click="showNewTodo = !showNewTodo"
    >
      Создать новую задачу
    </button>
    <button
      class="close"
      v-else
      type="submit"
      @click="showNewTodo = !showNewTodo"
    >
      Закрыть
    </button>
    <hr noshade size="2" />
    <todo-list :todos="allTodos" @remove-todo="showPopup" />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import NewTodo from "@/components/NewTodo";
import { mapGetters, mapActions } from "vuex";
import Popup from "@/components/Popup";
export default {
  name: "App",
  data() {
    return {
      todos: [],
      showNewTodo: false,
      popupVisible: false,
      popupText: "",
      popupTitle: "Удаление",
      todoForDelete: []
    };
  },
  components: {
    TodoList,
    NewTodo,
    Popup
  },
  computed: {
    ...mapGetters(["allTodos"])
  },
  methods: {
    ...mapActions(["getTodos", "removeTodosAction"]),
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.removeTodosAction(todo.id);
      this.popupVisible = false;
    },
    addTodo(todo) {
      this.todos.push(todo);
      this.getTodos(this.todos);
    },
    closePopup() {
      this.popupVisible = false;
      this.todoForDelete = [];
    },
    showPopup(todo) {
      this.todoForDelete = todo;
      this.popupVisible = true;
      this.popupText =
        "Вы действительно хотите удалить заметку " + todo.title + " ?";
    },
    confirmPopup() {
      this.removeTodo(this.todoForDelete);
    }
  },
  created() {
    this.todos = this.allTodos;
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  color: rgb(49, 47, 37);
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 16px rgba(105, 101, 101, 0.747);
}
.button-newtodo {
  width: 600px;
  height: 80px;
  font-size: 30px;
  border-radius: 20px 0px 20px 0px;
  background-color: rgb(247, 232, 74);
  box-shadow: 10px 10px 4px 0px rgb(158, 137, 97);
  border: none;
  color: rgb(49, 27, 8);
}
.button-newtodo:hover {
  cursor: pointer;
}
.button-newtodo:active,
button:focus {
  outline: none;
}

.close {
  position: absolute;
  top: 210px;
  left: 1220px;
  width: 100px;
  height: 30px;
  font-size: 14px;
  border-radius: 10px;
  background-color: rgb(250, 210, 32);
  box-shadow: 5px 5px 4px 0px rgb(109, 99, 81);
  border: none;
  color: rgb(49, 27, 8);
  font-weight: bold;
  overflow: initial;
}
.close:hover {
  transform: scale(1.1);
  box-shadow: 7px 7px 4px 0px rgb(194, 53, 10);
  cursor: pointer;
}
</style>
