<template>
  <div>
    Hallo das ist ein Rechner
    <AddEntrie @update-entries="updateEntries"/>
    <div v-if="cookieValue !== null" v-for="item in cookieValue">
      <Item @delete-item="deleteItem" @change-check="changeCheck" :item="item"/>
    </div>
    <div>
      Gesamtausgaben: {{sum}}
      <br>
      Gesamtausgaben abgerechnet: {{sumCheck}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddEntrie from './AddEntrie.vue';
import Entry from '../Models/Entry';
import Item from './Item.vue';


export default defineComponent({
  name: 'Home',
  components: {
    AddEntrie,
    Item,
  },
  data() {
    return {
      cookieValue: Array<Entry>(),
      sum: 0,
      sumCheck: 0,
    };
  },
  mounted() {
    this.updateEntries();
  },
  methods: {
    updateEntries() {
      this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
      this.getSum();
      this.getSumChecked();
      this.checkEntriesIfDayOfTheMonthIsLowerThanToday();
      this.sortEntriesByDate();
    },
    deleteItem(item: Entry) {
      const index = this.cookieValue?.indexOf(item);
      if (index !== undefined && index !== null) {
        this.cookieValue?.splice(index, 1);
        localStorage.setItem('myCookie', JSON.stringify(this.cookieValue));
      }
      this.updateEntries();
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
      this.updateEntries();
    },
    getSum() {
      this.sum = 0;
      this.cookieValue?.forEach((element) => {
        this.sum += element.price;
      });
    },
    getSumChecked() {
      this.sumCheck = 0;
      this.cookieValue?.forEach((element) => {
        if (element.check) {
          this.sumCheck += element.price;
        }
      });
    },
    checkEntriesIfDayOfTheMonthIsLowerThanToday() {
      const today = new Date();
      const dayOfTheMonth = today.getDate();
      this.cookieValue?.forEach((element) => {
        if (element.date < dayOfTheMonth) {
          element.check = true;
        }
      });
    },
    sortEntriesByDate() {
      this.cookieValue?.sort((a, b) => a.date - b.date);
    },
  }
});
</script>

