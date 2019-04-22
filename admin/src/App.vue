<template>
  <div id='app'>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
    }
  }
</script>

<style lang="css" scoped>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    min-width: 1200px;
    min-height: 768px;
  }
  #app {
    height: 100%;
  }
</style>