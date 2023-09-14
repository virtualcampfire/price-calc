<template>
  <div>
    Hallo das ist ein Rechner
    <AddEntrie @update-entries="updateEntries"/>
    <div v-if="cookieValue !== null" v-for="item in cookieValue">
      <Item :item="item"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddEntrie from './AddEntrie.vue';
import Entry from '../Models/Entry';
import Item from './Item.vue';

interface cookie {
  cookieValue: null | Entry[];
}


export default defineComponent({
  name: 'Home',
  components: {
    AddEntrie,
    Item
  },
  data(): cookie {
    return {
      cookieValue: null,
    };
  },
  mounted() {
    this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
  },
  methods: {
    updateEntries() {
      console.log("Okay");
      this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
    },
  }
});
</script>

