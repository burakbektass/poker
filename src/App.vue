<template>
  <div class="container">
      <Header/>
      <Sidebar/>
      <GameArea/>

  </div>
</template>

<script>
  import GameArea from './components/GameArea.vue';
  import Header from './components/Header.vue';
  import Sidebar from './components/Sidebar.vue';
  export default {
    data(){
      return {
        cards:null
      }
    },
    components: {
      GameArea,
      Header,
      Sidebar
    },
  }
</script>

<style>
.container{
  display: block;
  align-items: center;
}
</style>
