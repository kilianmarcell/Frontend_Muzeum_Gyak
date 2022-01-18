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
        <td><button @click="deleteStatue(statue.id)">X</button></td>
        <td><button @click="editStatue(statue.id)">Edit</button></td>
      </tr>
      <tr>
        <td><input type="hidden" v-model="statue.id"></td>
        <td><input type="text" v-model="statue.person"></td>
        <td><input type="number" v-model="statue.height"></td>
        <td><input type="number" v-model="statue.price"></td>
        <td><button v-if="add_new" @click="saveStatue">Save</button></td>
        <td><button v-if="add_new" @click="cancelStatue">Cancel</button></td>
        <td><button @click="newStatue" :disabled="saving" v-if="!add_new">Add</button></td>
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
      statues: [],
      add_new: false,
      saving: false,

      statue: {
        person: '',
        height: null,
        price: null
      }
    }
  },

  methods: {
    async loadData() {
      let response = await fetch("http://127.0.0.1:8000/api/statues")
      this.statues = await response.json()
    },

    async newStatue() {
      this.saving = 'disabled'
      let response = await fetch('http://127.0.0.1:8000/api/statues', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.statue)
      })
      console.log(response)
      await this.loadData()
      this.saving = false
      this.resetForm()
    },

    async deleteStatue(id) {
      await fetch(`http://127.0.0.1:8000/api/statues/${id}`, {
        method: 'DELETE'
      })
      await this.loadData()
    },
    
    async editStatue(id) {
      this.add_new = true
      let response = await fetch(`http://127.0.0.1:8000/api/statues/${id}`)
      let data = await response.json()
      this.statue = {...data}
    },

    async saveStatue() {
      this.saving = 'disabled'
      await fetch(`http://127.0.0.1:8000/api/statues/${this.statue.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.statue)
      })
      await this.loadData()
      this.saving = false
      this.resetForm()
    },

    cancelStatue() {
      this.resetForm()
    },

    resetForm() {
      this.statue = {
        id: null,
        person: '',
        height: null,
        price: null
      },
      this.add_new = false
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
