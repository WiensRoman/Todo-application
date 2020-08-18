<template>
  <div class="note">
    <fieldset>
      <legend>
        <input
          class="name"
          type="text"
          v-model="todo.title"
          placeholder="Название заметки"
        />
      </legend>
      <div class="manage">
        <button
          class="back"
          type="submit"
          @click="$emit('return', [todo, (popupType = 'Возвращение')])"
        ></button>
        <button
          class="deleteall"
          type="submit"
          @click="$emit('remove-todo', [todo, (popupType = 'Удаление')])"
        >
          Удалить заметку
        </button>
      </div>
      <template v-for="input in todo.inputs">
        <div :key="input.id">
          <div class="combo-1">
            <span
              ><input
                class="checkbox"
                type="checkbox"
                :checked="input.completed"
                @change="input.completed = !input.completed"
              />
              {{ todo.text }}
            </span>
            <input
              v-model="input.text"
              class="input"
              :class="{ done: input.completed }"
              type="text"
              :id="input.label"
              :disabled="input.completed"
            />
            <button class="delete" @click="deleteInput(input.id)"></button>
          </div>
        </div>
      </template>

      <div class="combo-2">
        <div class="width">
          <button class="add" @click="pushInput"></button>
        </div>
        <router-link :to="{ name: 'Home' }">
          <button class="save" type="submit" @click="save">Сохранить</button>
        </router-link>
        <button class="cancel" type="submit" @click="$emit('cancel-changes')">
          Отменить изменения
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    todos: {
      type: Array
    },
    todo: {
      type: Object
    }
  },
  data() {
    return {
      oldValue: [],
      popupType: ""
    };
  },
  methods: {
    ...mapActions([
      "getTodos",
      "removeTodosAction",
      "updateAction",
      "oldValueAction"
    ]),
    save() {
      this.updateAction(this.todo);
    },
    pushInput() {
      this.todo.inputs.push({
        id: this.todo.inputs.length + 1,
        label: this.todo.inputs.length + 1,
        text: "",
        completed: false
      });
    },
    deleteInput(id) {
      this.todo.inputs = this.todo.inputs.filter(input => input.id !== id);
    },
    getOldValue() {
      this.oldValueAction(this.todo);
      const dcopy = require("deepcopy");
      this.oldValue = dcopy(this.todo);
    }
  },
  created() {
    if (!this.todo) {
      this.$router.push({ name: "Home" }); // возвращение,если нет объекта
    }
    this.getOldValue();
  }
};
</script>

<style scoped>
.note {
  margin: 0 auto;
  height: 700px;
  width: 1000px;
  color: rgb(0, 0, 0);
  background-image: url("../assets/clip.png");
  background-size: 20% 20%;
  background-repeat: no-repeat;
  background-position: 5% 0%;
}
p {
  height: 100px;
  width: 100px;
}
fieldset {
  margin: 0 auto;
  font-family: inherit;
  height: 900px;
  width: 600px;
  background: rgb(250, 231, 126);
  border: 1px solid rgb(32, 24, 2);
}
.done {
  text-decoration: line-through;
  background-color: rgb(141, 214, 57);
}

.input {
  margin-bottom: 10px;
  font-family: inherit;
  width: 300px;
  height: 25px;
  border: 2px dashed darkgray;
}
.input:hover {
  border: 2px dashed rgb(12, 12, 8);
  transition: 0.9s;
  cursor: pointer;
}

.manage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.back {
  width: 50px;
  height: 50px;
  background-image: url("../assets/back.png");
  background-size: 53px 53px;
  background-position: center;
  border: 2px solid black;
  border-radius: 30px;
  box-shadow: 7px 7px 4px 0px rgb(109, 99, 81);
  background-repeat: no-repeat;
}
.back:active,
button:focus {
  outline: none;
}

.add {
  width: 50px;
  height: 50px;
  background-image: url("../assets/add.png");
  background-size: 50px 50px;
  background-position: center;
  border: 2px solid black;
  border-radius: 30px;
  background-repeat: no-repeat;
}
.add:active,
button:focus {
  outline: none;
}
.add:hover,
.back:hover {
  transform: scale(1.1);
  box-shadow: 5px 5px 4px 0px rgb(109, 99, 81);
  cursor: pointer;
}

.delete {
  width: 25px;
  height: 25px;
  background-image: url("../assets/delete.png");
  background-size: 23px 23px;
  background-position: center;
  border-radius: 80%;
  margin: 2px 0px 0px 5px;
  border: 1px solid rgba(24, 19, 5, 0.945);
  background-repeat: no-repeat;
}
.delete:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 5px 5px 4px 0px rgb(109, 99, 81);
}
.save {
  width: 150px;
  height: 50px;
  font-size: 14px;
  border-radius: 20px;
  background-color: rgb(250, 210, 32);
  box-shadow: 7px 7px 4px 0px rgb(109, 99, 81);
  border: 2px solid rgb(32, 24, 2);
  color: rgb(7, 3, 0);
  font-weight: bold;
}

.cancel {
  width: 150px;
  height: 50px;
  font-size: 14px;
  border-radius: 20px;
  background-color: rgb(250, 210, 32);
  box-shadow: 7px 7px 4px 0px rgb(109, 99, 81);
  border: 2px solid rgb(32, 24, 2);
  color: rgb(7, 3, 0);
  font-weight: bold;
}

.deleteall {
  width: 120px;
  height: 40px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 20px;
  background-color: rgb(250, 47, 32);
  box-shadow: 7px 7px 4px 0px rgb(109, 99, 81);
  border: 2px solid rgb(32, 24, 2);
  color: rgb(7, 3, 0);
}
.deleteall:hover {
  box-shadow: 7px 7px 7px 3px rgb(194, 53, 10);
  transform: scale(1.1);
  cursor: pointer;
}

.save:hover {
  box-shadow: 7px 7px 7px 3px rgb(141, 214, 57);
  transform: scale(1.1);
  cursor: pointer;
}
.cancel:hover {
  box-shadow: 7px 7px 7px 3px rgb(238, 54, 54);
  transform: scale(1.1);
  cursor: pointer;
}
.combo-1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.combo-2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.width {
  width: 600px;
}

.checkbox {
  width: 20px;
  height: 20px;
  background-color: chartreuse;
}

.name {
  width: 350px;
  height: 25px;
  background-color: rgb(250, 210, 32);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: 3px solid rgb(32, 24, 2);
  border-bottom: 3px dashed rgb(32, 24, 2);
  border-radius: 20px 20px 0px 0px;
}
</style>
