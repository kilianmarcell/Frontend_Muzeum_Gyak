<template>
<div>
  <h1><u>Paintings</u></h1>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Year</th>
        <th>On_display</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="painting in paintings" :key="painting.id">
        <td>{{ painting.id }}</td>
        <td>{{ painting.title }}</td>
        <td>{{ painting.year }}</td>
        <td>{{ painting.on_display }}</td>
        <td>{{ painting.created_at }}</td>
        <td>{{ painting.updated_at }}</td>
        <td><button @click="deletePainting(painting.id)">X</button></td>
        <td><button @click="editPainting(painting.id)">Edit</button></td>
      </tr>
      <tr>
        <td><input type="hidden" v-model="painting.id"></td>
        <td><input type="text" v-model="painting.title"></td>
        <td><input type="number" v-model="painting.year"></td>
        <td><input type="checkbox" v-model="painting.on_display"></td>
        <td><button v-if="add_new" @click="savePainting">Save</button></td>
        <td><button v-if="add_new" @click="cancelPainting">Cancel</button></td>
        <td><button @click="newPainting" :disabled="saving" v-if="!add_new">Add</button></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>

export default {
  name: 'Paintings',

  data() {
    return {
      paintings: [],
      add_new: false,
      saving: false,

      painting: {
        person: '',
        height: null,
        price: null
      }
    }
  },

  methods: {
    async loadData() {
      let response = await fetch("http://127.0.0.1:8000/api/paintings")
      this.paintings = await response.json()
    },

    async newPainting() {
      this.saving = 'disabled'
      let response = await fetch('http://127.0.0.1:8000/api/paintings', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.painting)
      })
      console.log(response)
      await this.loadData()
      this.saving = false
      this.resetForm()
    },

    async deletePainting(id) {
      await fetch(`http://127.0.0.1:8000/api/paintings/${id}`, {
        method: 'DELETE'
      })
      await this.loadData()
    },
    
    async editPainting(id) {
      this.add_new = true
      let response = await fetch(`http://127.0.0.1:8000/api/paintings/${id}`)
      let data = await response.json()
      this.painting = {...data}
    },

    async savePainting() {
      this.saving = 'disabled'
      await fetch(`http://127.0.0.1:8000/api/paintings/${this.painting.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(this.painting)
      })
      await this.loadData()
      this.saving = false
      this.resetForm()
    },

    cancelPainting() {
      this.resetForm()
    },

    resetForm() {
      this.painting = {
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