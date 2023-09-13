<template>
  <Home/>
  <div v-if="cookieValue !== null" v-for="item in cookieValue">
    <Item :item="item"></Item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './components/Home.vue';

import Item from './components/Item.vue';

import Entry from './Models/Entry';

interface cookie {
    cookieValue: null | Entry[];
}


export default defineComponent({
  name: 'App',
  components: {
    Home,
    Item
  },
  data(): cookie{
        return {
            cookieValue: null,
        };
    },
  mounted() {
        this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
    },
});
</script>
