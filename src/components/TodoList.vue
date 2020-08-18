<template>
  <div>
    <ul class="list">
      <todo-item
        v-for="todo of todos"
        :key="todo.id"
        :todo="todo"
        :todos="todos"
        @remove-todo="removeTodo"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  props: {
    todos: {
      type: Array
    }
  },
  components: {
    TodoItem
  },
  methods: {
    removeTodo(todo) {
      this.$emit("remove-todo", todo);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 4px;
}
</style>
