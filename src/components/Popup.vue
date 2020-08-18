<template>
  <div class="wrapper">
    <div class="popup">
      <div class="header">
        <span>{{ popupTitle }}</span>
        <span>
          <i class="material-icons" @click="closePopup">close</i>
        </span>
      </div>
      <div class="content">
        <span class="Text">{{ popupText }}</span>
      </div>
      <div class="footer">
        <button class="cancel" @click="closePopup">Отмена</button>
        <button class="submit" @click="confirmPopup">Подтвердить</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popup",
  props: {
    popupTitle: String,
    popupText: String
  },
  data() {
    return {};
  },
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
    confirmPopup() {
      this.$emit("confirm-popup");
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.popup {
  padding: 16px;
  position: fixed;
  top: 60px;
  width: 400px;
  height: 140px;
  box-shadow: 0 0 15px 0;
  background-color: rgb(247, 247, 238);
  left: 38%;
}
.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cancel,
.submit {
  width: 95px;
  height: 35px;
  border-radius: 8px;
  box-shadow: 3px 3px 3px 2px rgb(182, 178, 166);
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
.submit,
.cancel {
  padding: 8px;
  background-color: darkgray;
}
.submit:hover,
.cancel:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 3px 3px 4px 1px cadetblue;
}

Text {
  padding: 16px;
  margin: 16px;
}
</style>
