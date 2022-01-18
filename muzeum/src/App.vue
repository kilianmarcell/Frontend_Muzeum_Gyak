<template>
<div>
  <h1><u>Statue</u></h1>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Person</th>
        <th>Height</th>
        <th>Price</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="statue in statues" :key="statue.id">
        <td>{{ statue.id }}</td>
        <td>{{ statue.person }}</td>
        <td>{{ statue.height }}</td>
        <td>{{ statue.price }}</td>
        <td>{{ statue.created_at }}</td>
        <td>{{ statue.updated_at }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      statues: []
    }
  },
  methods: {
    async loadData() {
      let response = await fetch("http://127.0.0.1:8000/api/statues")
      //let data = await response.json()
      this.statues = await response.json()
    }
  },
  mounted() {
    this.loadData()
  }
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
