<template>
  <div id="app">
    <Paintings/>
    <Statues/>
  </div>
</template>
<script>
import Paintings from './components/Paintings.vue';
import Statues from './components/Statues.vue';

export default {
  name: 'App',
  components: {
    Paintings,
    Statues
},
  data() {
    return {
      }
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table {
  margin: auto;
  border: 1px solid black;
}

th {
  padding: 40px 20px 30px 20px;
}

td {
  padding: 20px 20px 20px 20px;
}

</style>