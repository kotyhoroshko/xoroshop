<template>
  <router-view></router-view>
</template>

<script>
export default {
  emits:['add-new-design'],
  data () {
    return {
      designsBase:[]
    }
  },
  provide(){
    return {
      designsBase: this.designsBase
    }
  },
  methods: {
    addNewDesign(design){
      this.designsBase.push(design)
    }
  }
}
</script>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;;
    font-family: 'Roboto';
    font-weight: 400;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
</style>
