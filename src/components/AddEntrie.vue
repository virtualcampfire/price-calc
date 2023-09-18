<template>
    <div>
      <input placeholder="Bezeichnung" id="name" class="input">
      <input class="input" type="number" placeholder="Betrag" id="price">
      <input class="input" type="number" placeholder="Monatstag" id="date">
      <input class="saveButton" type="button" value="Hinzufügen" @click="addEntry">
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Entry from '../Models/Entry';
  
  interface cookie {
    cookieValue: null | Entry[];
  }
  
  export default defineComponent({
    name: 'AddEntrie',
    data(): cookie {
      return {
        cookieValue: null,
      };
    },
    mounted() {
      this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
    },
    methods: {
      addEntry() {
        const name = document.getElementById('name') as HTMLInputElement;
        const price = document.getElementById('price') as HTMLInputElement;
        const date = document.getElementById('date') as HTMLInputElement;
        const entry = new Entry(name.value, Number(price.value), Number(date.value), false);
  
        if (this.cookieValue === null) {
          localStorage.setItem('myCookie', JSON.stringify([entry]));
        } else {
          this.cookieValue.push(entry);
          localStorage.setItem('myCookie', JSON.stringify(this.cookieValue));
        }
        this.$emit('update-entries');
      },
    },
  });
  </script>

  <style scoped>
    .input{
  margin: 10px;
  border-radius: 10px;
  border-style: solid;
  border-color: rgba(34 149 255);
  background-color: rgba(34 149 255);
  color: white;
  padding: 10px;
  font-size: 10px;
  font-weight: bold;
}
.input::placeholder {
  color: white;
}
.saveButton{
  margin: 10px;
  border-radius: 10px;
  border-style: solid;
  border-color: rgba(34 149 255);
  background-color: rgba(34 149 255);
  color: white;
  padding: 10px;
  font-size: 10px;
  font-weight: bold;
}
</style>
  