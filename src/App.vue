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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  });
}
</script>
