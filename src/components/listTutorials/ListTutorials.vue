<template>
  <div class="main">
    <CreateEdit
      :tuto="selectedTuto"
      :edit="isEdit"
      v-bind:showModal="showModal"
      v-on:on-close-modal="onCloseModal()"
      v-on:add-new-tutorial="addNewTutorial($event)"
      v-on:update-tutorial="updateTutorial($event)"
    />

    <Button @click="openModalCreate(showModal)" class="btn-add-tuto"
      >Add new tutorial</Button
    >

    <div class="search-bar-container">
      <div class="search-bar">
        <input v-model="searchWord" class="search-bar-input" />
      </div>
      <div class="button-container-search">
        <button @click="onSearch()" class="btn-search-bar">
          <font-awesome-icon icon="search" />
        </button>
        <button @click="onCleanSearch()" class="btn-search-bar">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>

    <div>
      <div v-if="searchedWord" class="searched-word">
        <span> Search: </span>
        {{ searchedWord }}
      </div>
    </div>

    <!--  -->
    <div class="gallery-container">
      
      <h3 v-if="tutorials.length === 0 && !searchedWord">
        Tutorials are empty, you are the choosen one, be the first to add one !!!
      </h3>
      <div class="tutorial-card" v-for="item in tutorials" :key="item.id">
        <div v-if="showForm">
          <span>Title: </span><input v-model="item.title" />
        </div>
        <div v-else><span>Title: </span>{{ item.title }}</div>
        <div><span>Description: </span>{{ item.description }}</div>
        <div>
          <span>Status: </span>{{ item.status ? "Published" : "Unpublished" }}
        </div>
        <div class="button-container">
          <button
            class="button-actions"
            v-on:click="openModalCreateEdit(item, showModal)"
          >
            <font-awesome-icon icon="edit" />
          </button>

          <button class="button-actions" v-on:click="switchStatus(item)">
            <font-awesome-icon v-if="!item.status" icon="handshake" />
            <font-awesome-icon v-else icon="handshake-slash" />
          </button>
          <button class="button-actions" v-on:click="deleteTutorial(item)">
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateEdit from "../modals/CreateEdit.vue";
export default {
  name: "ListTutorials",
  components: { CreateEdit },
  data() {
    return {
      tutorials: [],
      showModal: false,
      showModalEdit: false,
      selectedTuto: null,
      searchWord: null,
      searchedWord: null,
      filteredTuto: [],
      showForm: false,
      isEdit: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      axios
        .get("http://localhost:3000/api/tuto/tutoriales/")
        .then((response) => {
          this.tutorials = response.data.data;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    fetchDataFiltered: function (title) {
      axios
        .get("http://localhost:3000/api/tuto/tutoriales/?title=" + title)
        .then((response) => {
          console.log(response.data.data);
          this.tutorials = response.data.data;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    openModalCreateEdit(item) {
      this.showModal = true;
      this.isEdit = true;
      this.selectedTuto = { ...item };
    },
    openModalCreate() {
      this.showModal = true;
      this.selectedTuto = {};
    },
    onCloseModal: function () {
      this.showModal = false;
      this.fetchData();
      this.isEdit = false;
    },
    addNewTutorial: function (newTutorial) {
      axios
        .post("http://localhost:3000/api/tuto/tutoriales/", newTutorial)
        .then((res) => {
          console.log(res);
          this.onCloseModal();
        });
    },
    async updateTutorial(item) {
      console.log(item.id + " Im switched");
      axios
        .put("http://localhost:3000/api/tuto/tutoriales/", item)
        .then((res) => {
          console.log(res);
          this.onCloseModal();
        })
        .catch((res) => console.log(res));
    },
    switchStatus: function (item) {
      item.status = !item.status;
      this.updateTutorial(item).then((res) => {
        console.log(res);
      });
    },
    deleteTutorial: function (item) {
      var res = confirm("Are you sure delete tutorial: " + item.title);
      if (res == true) {
        console.log(item.id + " Im being deleted...");
        axios
          .delete("http://localhost:3000/api/tuto/tutoriales/?id=" + item.id)
          .then(() => {
            this.fetchData();
          });
      }
    },
    onSearch: function () {
      if (this.searchWord) {
        this.searchedWord = this.searchWord;
        this.fetchDataFiltered(this.searchWord);
        this.searchWord = null;
      }
    },
    onCleanSearch: function () {
      this.filteredTuto = [];
      this.fetchData();
      this.searchedWord = null;
    },
    namedStatus: function (state) {
      if (state) return "Published";
      return "Unpublished";
    },
    showFormulario: function (item) {
      this.showForm = true;
      console.log(item);
    },
  },
};
</script>

<style scoped>
h3 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-style: italic;
}
span {
  font-weight: bold;
}
.secret-modal {
  display: flex;
}

.tutorial-card {
  margin: 10px 20px 10px 10px;
  padding: 10px 0px 10px 0px;
  width: 300px;
  border-radius: 10px;

  /* border: solid 1px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.tutorial-card:nth-child(2n) {
  background: #2ecc71;
  color: white;
}

.gallery-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.button-actions {
  margin: 5px 2px;
  border: none;
  border-radius: 5px;
}

.btn-add-tuto {
  margin: 20px;
  padding: 10px;
  border: none;
  background-color: #17b85a;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 200px;
  align-self: center;
}

.btn-add-tuto:hover {
  color: #17b85a;
  background-color: white;
  /* border:solid -1px #17b85a; */
}

.search-bar-container {
  display: flex;
  flex-direction: row;
  align-self: center;

  width: 70%;
  margin: 0;
  height: 40px;
  margin-bottom: 30px;
}
.search-bar {
  display: flex;
  width: 100%;
  border-radius: 5px;
  /* border: solid 1px black; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.button-container-search {
  display: flex;
  flex-direction: row;
  width: 100px;
  margin-left: 10px;
}

.btn-search-bar {
  width: 40px;
  height: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-right: 5px;
}

.search-bar-input {
  width: 100%;
  border: none;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.searched-word span {
  font-style: italic;
  font-weight: bold;
  margin-bottom: 20px;
}
.searched-word {
  font-size: 18px;
}
</style>