<template>
  <div id="app">
    <router-link to="/">Paintings</router-link>
    <router-link to="/statues">Statues</router-link>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
},
  data() {
    return {
      state: 'Paintings'
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