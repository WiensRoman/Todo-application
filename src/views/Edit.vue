<template>
  <div class="edit">
    <div class="h1"><h1>Редактирование заметки</h1></div>
    <popup
      v-if="popupVisible"
      :popupTitle="popupTitle"
      :popupText="popupText"
      @close-popup="closePopup"
      @confirm-popup="confirmPopup"
    ></popup>
    <todo-edit
      :todo="todo"
      :todos="todos"
      @remove-todo="showPopup"
      @return-old-value="returnValue"
      @cancel-changes="copyTodos"
      @return="showPopup"
    >
    </todo-edit>
  </div>
</template>

<script>
import TodoEdit from "../components/TodoEdit";
import { mapActions } from "vuex";
import Popup from "@/components/Popup";
export default {
  data: () => {
    return {
      todos: [],
      todo: {},
      oldValue: null,
      popupVisible: false,
      popupText: "",
      popupTitle: "",
      todoForDelete: [],
      popupType: "Подтверждение"
    };
  },
  components: {
    TodoEdit,
    Popup
  },
  methods: {
    ...mapActions([
      "getTodos",
      "removeTodosAction",
      "updateAction",
      "oldValueAction"
    ]),
    async removeTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      await this.removeTodosAction(todo.id);
      this.popupVisible = false;
      this.$router.push({ name: "Home", params: { todos: this.allTodos } });
    },
    returnValue(oldValue) {
      this.todo = oldValue;
      this.updateAction(this.todo);
    },
    copyTodos() {
      const dcopy = require("deepcopy");
      this.todo = dcopy(this.$route.params.todo);
      this.todos = dcopy(this.$route.params.todos);
    },
    closePopup() {
      this.popupVisible = false;
      this.todoForDelete = [];
    },
    showPopup(eventParams) {
      this.popupVisible = true;
      const todo = eventParams[0]; // передача todo
      this.popupType = eventParams[1]; // передача типа popup
      if (this.popupType === "Удаление") {
        this.todoForDelete = todo;
        this.popupText =
          "Вы действительно хотите удалить заметку " + todo.title + " ?";
        this.popupTitle = "Удаление";
      } else {
        this.popupText =
          "Вы действительно хотите отменить редактирование и вернуться?";
        this.popupTitle = "Возвращение";
      }
    },
    confirmPopup() {
      if (this.popupType === "Удаление") {
        this.removeTodo(this.todoForDelete);
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  },
  async created() {
    this.copyTodos(); // глубокое копирование объекта
  }
};
</script>

<style>
.edit {
  width: auto;
}
.h1 {
  display: block;
  width: 500px;
  margin: 0px auto;
  font-size: 17px;
  color: rgb(49, 47, 37);
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 16px rgba(105, 101, 101, 0.747);
}
</style>
