<template>
  <div>
    Hallo das ist ein Rechner
    <AddEntrie @update-entries="updateEntries"/>
    <div v-if="cookieValue !== null" v-for="item in cookieValue">
      <Item @delete-item="deleteItem" @change-check="changeCheck" :item="item"/>
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
    deleteItem(item: Entry) {
      const index = this.cookieValue?.indexOf(item);
      if (index !== undefined && index !== null) {
        this.cookieValue?.splice(index, 1);
        localStorage.setItem('myCookie', JSON.stringify(this.cookieValue));
      }
    },
    changeCheck(check: boolean, item: Entry): void {
      console.log(check);
      console.log(item);

      this.cookieValue?.forEach((element) => {
        if (element === item) {
          element.check = !check;
          localStorage.setItem('myCookie', JSON.stringify(this.cookieValue));
          console.log(localStorage.getItem('myCookie'));
        }
      });
  }
  }
});
</script>

