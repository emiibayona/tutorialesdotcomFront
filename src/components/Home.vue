<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ListTutorials />
  </div>
</template>

<script>
import ListTutorials from "./listTutorials/ListTutorials.vue";
export default {
  name: "Home",
  components: {
    ListTutorials,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      data: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.secret-modal {
  display: flex;
}


</style>
