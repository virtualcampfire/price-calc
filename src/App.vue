<template>
  <div>
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './components/Home.vue';
import Item from './components/Item.vue';
import AddEntrie from './components/AddEntrie.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home,
    Item,
    AddEntrie,
  },
});
</script>
