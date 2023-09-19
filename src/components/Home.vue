<template>
  <div>
    <div class="container">
      <input type="button" class="nav-button" value="Neuer Grundbeitrag" @click="showNewBeitrag = !showNewBeitrag, showNewEntrie = false">
      <input type="button" class="nav-button" value="Beitrag hinzufügen" @click="showNewEntrie = !showNewEntrie, showNewBeitrag = false">
    </div>
    <div class="container" v-if="showNewBeitrag">
      <input class="input" placeholder="Nutzbarer Betrag" id="nutzbarerBetrag">
      <input class="saveButton" type="button" value="Speichern" @click="changeNutzbarerBetrag">
    </div>
    <div class="container" v-if="showNewEntrie">
      <AddEntrie @update-entries="updateEntries"/>
    </div>
    <div>
    </div>
    <div class="container">
      <div class="items">
        <div v-if="cookieValue !== null" v-for="item in cookieValue">
          <Item @delete-item="deleteItem" @change-check="changeCheck" :item="item"/>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="statistic">
        <div class="container">
          <div class="statistic-prop">Gesamtkosten: {{ sum }}</div>
          <div class="statistic-prop">Überschuss: {{ ueberschuss }}</div>
        </div>
        <div class="container">
          <div class="statistic-prop">Checked: {{ sumCheck }}</div>
          <div class="statistic-prop">Grundbeitrag: {{ nutzbarerBetrag }}</div>
        </div>
      </div>
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
      nutzbarerBetrag: 0, 
      ueberschuss: 0,
      showNewEntrie: false,
      showNewBeitrag: false,
    };
  },
  mounted() {
    this.updateEntries();
  },
  methods: {
    updateEntries() {
      this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
      this.checkEntriesIfDayOfTheMonthIsLowerThanToday();
      this.getSum();
      this.getSumChecked();
      this.sortEntriesByDate();
      this.nutzbarerBetrag = JSON.parse(localStorage.getItem('nutzbarerBetrag') || 'null');
      this.getGesamtUeberschuss()
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
      this.cookieValue?.forEach((element) => {
        if (element === item) {
          element.check = !check;
          localStorage.setItem('myCookie', JSON.stringify(this.cookieValue));
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
    changeNutzbarerBetrag(){
      let betrag = document.getElementById('nutzbarerBetrag') as HTMLInputElement;
      this.nutzbarerBetrag = Number(betrag.value)
      localStorage.setItem('nutzbarerBetrag', JSON.stringify(this.nutzbarerBetrag));
      this.updateEntries();
    },
    getGesamtUeberschuss(){
      this.ueberschuss = this.nutzbarerBetrag - this.sum;
    }
  }
});
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-button{
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
.input{
      border-radius: 10px;
      border-style: solid;
      border-color: rgba(34 149 255);
      background-color: rgba(34 149 255);
      color: white;
      font-size: 10px;
      font-weight: bold;
      padding: 10px;
      margin: 10px;
      width: 80%;
    }
  .input::placeholder {
    color: white;
  }
  .saveButton{
    border-radius: 10px;
    border-style: solid;
    border-color: rgba(34 149 255);
    background-color: rgba(34 149 255);
    color: white;
    font-size: 10px;
    font-weight: bold;
    width: 80%;
    padding: 10px;
    margin: 10px;
  }
.statistic{
  width: 100%;
  text-align: center;
}
.statistic-prop{
  margin: 10px;
  border-radius: 10px;
  border-style: solid;
  border-color: rgba(34 149 255);
  background-color: rgba(34 149 255);
  color: white;
  padding: 10px;
  font-size: 10px;
  font-weight: bold;
  width: 50%;
}
.items{
  height: calc(100vh - 200px);
  max-height: calc(100vh - 250px);
  overflow: scroll;
  overflow-x: hidden;
  max-width: 800px;
}
</style>  

