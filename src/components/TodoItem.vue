<template>
  <li>
    <div class="template">
      <div>
        <span>
          {{ todo.title }}
        </span>
        <template v-for="input in todo.inputs">
          <div :key="input.id">
            <span :class="{ done: todo.inputs.completed }">
              <input type="checkbox" disabled :checked="input.completed" />
              {{ todo.text }}
            </span>
            <input
              v-model="input.text"
              :class="{ done: input.completed }"
              type="text"
              :id="input.label"
              disabled
            />
          </div>
        </template>
      </div>
      <div class="submit">
        <button class="rm" @click="$emit('remove-todo', todo)"></button>
        <router-link
          :to="{ name: 'Edit', params: { todo: todo, todos: todos } }"
        >
          <button class="correct" type="submit"></button>
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    todos: {
      type: Array
    }
  }
};
</script>

<style>
li {
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 300px;
  align-items: flex-start;
  padding: 0.5rem 2rem;
  margin-bottom: 1rem;
  background-image: url("../assets/todo2.png");
  background-size: 600px;
  background-position: -80% 38%;
  background-repeat: no-repeat;
}

.template {
  margin: 90px 0px 0px -20px;
  width: 280px;
  display: flex;
  justify-content: baseline;
  flex-direction: row;
}

input {
  margin: 5px;
  border: 2px dashed darkgray;
}

.submit {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  width: 60px;
  height: 110px;
}

.correct {
  width: 40px;
  height: 40px;
  background-image: url("../assets/correct.jpg");
  background-position: 30% 40%;
  background-size: 35px 35px;
  padding: 5px;
  border: 2px solid darkgray;
  border-radius: 20px;
  background-color: white;
  background-repeat: no-repeat;
}
.correct:hover {
  transform: scale(1.1);
  box-shadow: 3px 3px 4px 0px rgb(109, 99, 81);
  cursor: pointer;
}
.correct:active,
button:focus {
  outline: none;
}

.rm {
  width: 40px;
  height: 40px;
  background-image: url("../assets/delete.png");
  background-position: 30% 40%;
  background-size: 35px 35px;
  padding: 5px;
  border: 2px solid darkgray;
  border-radius: 20px;
  background-color: rgb(248, 215, 28);
  margin-bottom: 8px;
  background-repeat: no-repeat;
}
.rm:hover {
  transform: scale(1.1);
  box-shadow: 3px 3px 4px 0px rgb(109, 99, 81);
  cursor: pointer;
}
.rm:active,
button:focus {
  outline: none;
}
.points {
  display: flex;
  flex-direction: column;
  background-color: rgb(65, 243, 42);
}

.done {
  text-decoration: line-through;
}
</style>
