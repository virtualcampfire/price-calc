<template>
    <div class="entry" v-if="item">
        <div class="entry-prop">{{ item.name }}</div>
        <div class="entry-prop">{{ item.price }}</div>
        <div class="entry-prop">{{ item.date }}</div>
        <div class="entry-prop"><input type="checkbox" :checked="item.check" @change="changeCheck(item.check)"></div>
        <div class="entry-prop"><input type="button" value="Entfernen" @click="deleteEntry()"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Entry from '../Models/Entry';


    interface cookie {
        cookieValue: null | Entry[];
    }
  
  export default defineComponent({
    name: 'Item',
    props: {
        item: Object
    },
    data(): cookie{
        return {
            cookieValue: null,
        };
    },
    mounted() {
        this.cookieValue = JSON.parse(localStorage.getItem('myCookie') || 'null');
    },
    methods: {
        addEntrie() {
            const name = document.getElementById('name') as HTMLInputElement;
            const price = document.getElementById('price') as HTMLInputElement;
            const date = document.getElementById('date') as HTMLInputElement;
            const entry = new Entry(name.value, Number(price.value), Number(date.value), true)
            if(this.cookieValue === null){
                localStorage.setItem('myCookie', JSON.stringify([entry]));
            }
            else{
                this.cookieValue.push(entry);
                localStorage.setItem('myCookie', JSON.stringify(this.cookieValue));
            }
        },
        deleteEntry(){
            this.$emit('delete-item', this.item);
        },
        changeCheck(check: boolean){
            this.$emit('change-check', check, this.item);
            console.log(check);
        }
    },
  });
  </script>

    <style scoped>
        .entry{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .entry-prop{
            width: 200px;
        }
    </style>
