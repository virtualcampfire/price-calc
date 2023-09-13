<template>
  <div>
    Hallo das ist ein Rechner
    <AddEntrie></AddEntrie>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddEntrie from './AddEntrie.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AddEntrie
  },
  mounted(){
    
  }
});
</script>

