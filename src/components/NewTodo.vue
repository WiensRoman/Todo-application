<template>
  <form class="main">
    <div>
      <label>Название заметки</label>
      <br /><input
        v-model="title"
        class="notename"
        type="text"
        placeholder="Введите название"
        required
      />
    </div>
    <template v-for="input in inputs">
      <div :key="input.id">
        <div class="combo">
          <label class="point" :for="input.label">{{ input.label }}</label>
          <input
            v-model="input.text"
            :id="input.label"
            type="text"
            placeholder="Описание задачи"
          />
          <button class="button-2" @click="deleteInput(input.id)"></button>
        </div>
      </div>
    </template>
    <div>
      <button class="button-1" @click="pushInput">Добавить задачу</button>
    </div>
    <div class="add">
      <div>
        <button class="button-3" type="submit" @click.prevent="onSubmit">
          Сохранить заметку
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array
    }
  },
  data() {
    return {
      title: "",
      inputText: "",
      inputs: [
        {
          label: "1",
          id: 1,
          text: "",
          completed: false
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      if (this.title.trim()) {
        const newTodo = {
          id: this.createNewId(),
          title: this.title,
          inputs: this.inputsg
        };
        this.$emit("add-todo", newTodo);
        this.title = "";
        this.inputs = [
          {
            label: "1",
            id: 1,
            text: "",
            completed: false
          }
        ];
      }
    },
    pushInput() {
      this.inputs.push({
        id: this.inputs.length + 1,
        label: this.inputs.length + 1,
        text: "",
        completed: false
      });
    },
    createNewId() {
      if (this.todos.length >= 0) {
        try {
          return this.todos[this.todos.length - 1].id + 1;
        } catch {
          return 1;
        }
      } else {
        return 0;
      }
    },
    deleteInput(id) {
      this.inputs = this.inputs.filter(input => input.id !== id);
    }
  }
};
</script>

<style scoped>
label {
  font-size: 20px;
  color: rgb(49, 47, 37);
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2);
}
.main {
  display: flex;
  align-items: center;
  width: 700px;
  height: 500px;
  margin: 0 auto;
  padding-top: 120px;
  font-size: 20px;
  background-image: url("../assets/note.png");
  background-position: -20px -80px;
  background-size: 800px;
  background-repeat: no-repeat;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.combo {
  margin-left: 20px;
}

.add {
  display: flex;
  width: 300px;
  justify-content: center;
}

input {
  width: 270px;
  height: 20px;
  background-color: rgb(248, 242, 207);
  border: 1px dashed rgba(93, 94, 84, 0.966);
  margin: 0px 3px 15px 8px;
}
.point {
  font-size: 13px;
}

input:nth-child(2):hover {
  background-color: rgb(229, 223, 188);
  border: 1px dashed rgba(57, 58, 53, 0.966);
  border-radius: 5px;
  cursor: pointer;
}

.notename {
  margin: 5px 0px 10px 12px;
  height: 25px;
  border: 2px solid rgba(150, 153, 138, 0.966);
  border-radius: 5px;
}

.button-1 {
  width: 120px;
  height: 30px;
  font-size: 10px;
  border-radius: 20px;
  background-color: rgb(250, 210, 32);
  box-shadow: 7px 7px 4px 0px rgb(109, 99, 81);
  border: 1px solid rgb(32, 24, 2);
  color: rgb(7, 3, 0);
  font-weight: bold;
}
.button-1:active,
button:focus {
  outline: none;
}

.button-2 {
  width: 20px;
  height: 20px;
  background-image: url("../assets/delete.png");
  background-position: 30% 40%;
  background-size: 17px 15px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: rgb(248, 215, 28);
  background-repeat: no-repeat;
}
.button-2:hover {
  box-shadow: 3px 3px 4px 0px rgb(109, 99, 81);
  transform: scale(1.1);
  cursor: pointer;
}
.button-3 {
  width: 190px;
  height: 50px;
  font-size: 14px;
  border-radius: 20px;
  background-color: rgb(214, 40, 10);
  box-shadow: 7px 7px 4px 0px rgb(109, 99, 81);
  border: 1px solid rgb(32, 24, 2);
  color: rgb(7, 3, 0);
  font-weight: bold;
  margin: 40px;
}

.button-1:hover,
.button-3:hover {
  box-shadow: 7px 7px 6px 2px rgb(73, 66, 43);
  transform: scale(1.1);
  cursor: pointer;
}
</style>
