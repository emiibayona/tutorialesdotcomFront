<template>
  <div v-if="showModal" class="modal-mask">
    <div class="form-container-pro">
      <b-form @submit.stop.prevent>
        <h1>Your tutorial ...</h1>
        <div class="form-div">
          <label>
            <span class="span-label">Title</span>
            <input
              class="formStyle"
              type="text"
              :placeholder="tuto.title"
              required
              v-model="tuto.title"
            />
          </label>

          <label>
            <span class="span-label">Description</span>
            <input
              class="formStyle"
              type="text"
              :placeholder="tuto.description"
              required
              v-model="tuto.description"
            />
          </label>
        </div>
        <button class="formButton" @click="addNewTutorial()">Save</button>

        <button class="formButton" @click="onCloseModal()">Back</button>
        <br />
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateEdit",
  props: {
    tuto: {},
    edit: Boolean,
    showModal: Boolean,
  },
  data() {
    return {
      message: null,
    };
  },
  methods: {
    addNewTutorial: function () {
      const tutorial = {
        title: this.tuto.title,
        description: this.tuto.description,
        status: true,
      };
      if (this.edit) {
        this.$emit("update-tutorial", this.tuto);
      } else {
        this.$emit("add-new-tutorial", tutorial);
      }
      this.cleanForm();
    },
    onCloseModal: function () {
      this.$emit("on-close-modal");
      this.cleanForm();
    },
    isEdit: function () {
      return this.tuto.title !== "" && this.tuto.description !== "";
    },
    preloadTutorial() {
      this.tutorial.title = this.tuto?.title || "";
      this.tutorial.description = this.tuto?.description || "";
    },
    cleanForm() {
      this.tutorial = {};
    },
  },
  created() {
    this.tutorial.title = this.tuto?.title || "";
    this.tutorial.description = this.tuto?.description || "";
    console.log("created " + this.tutorial.title);
  },
  mounted() {
    this.preloadTutorial();
    console.log("mounted " + this.tutorial.title);
  },
  destroyed() {
    this.tutorial.title = "";
    this.tutorial.description = "";
  },
  computed: {
    validation() {
      return this.tuto.title !== "" && this.tuto.description !== "";
    },
  },
};
</script>

<style scoped>
.modal-mask {
  display: flex;

  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  /* display: table; */
  overflow-y: hidden;
  overflow-x: hidden;
  transition: opacity 2s ease;
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border: solid 2px red;
  background-color: rgb(231, 231, 231);
  font-size: 14px;

  width: 500px;
  padding: 10px;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-input {
  width: 300px;
  justify-content: flex-start;
}
.buttons-container {
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
}
.button-cancel {
  width: 300px;
  height: 20px;
  margin-bottom: 10px;
  align-self: center;
}

body {
  background-color: #2ecc71;
  font-family: source-sans-pro, sans-serif;
}

h1 {
  margin-left: auto;
  margin-top: 50px;
  text-align: center;
  font-weight: 100;
  font-size: 2.8em;
  color: #10331e;
}

.form-div {
  width: 500px;
  /* margin: auto; */
  align-content: center;
  align-self: center;
  justify-content: center;
}

.formStyle {
  background-color: #2ecc71;
  padding-top: 30px;
  padding-left: 20px;
  padding-bottom: 10px;
  width: 400px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #ecf0f1;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  /* border: solid 1px black; */
}

.formButton {
  float: right;
  background-color: #ffffff;
  /* display: inline-block; */
  color: #2ecc71;
  font-size: 20px;
  font-weight: 500;
  padding: 6px 24px;
  margin-top: 15px;
  margin-right: 60px;
  text-decoration: none;
  border-radius: 3px;
  border: 0px;
}

.formButton:hover {
  background-color: #27ae60;
  color: #ffffff;
}

.formButton:active {
  position: relative;
  top: 3px;
}

.form-container-pro {
  align-self: center;
  margin: auto;
  /* margin-left: 40%; */
  border-radius: 10px;
  /* border: solid 1px black; */
  background-color: #2ecc71;
  padding-bottom: 30px;
}

/*To remove the outline that appears on clicking the input textbox*/
input:focus {
  outline: none;
}

/* To format the placeholder text color */
::-webkit-input-placeholder {
  color: #ecf0f1;
}

:-moz-placeholder {
  /* Firefox 18- */
  color: #ecf0f1;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: #ecf0f1;
}

:-ms-input-placeholder {
  color: #ecf0f1;
}

.error-text {
  font-weight: bold;
}

.span-label {
  position: absolute;
  font-weight: bold;
  font-style: italic;
  opacity: 0.6;
}
</style>