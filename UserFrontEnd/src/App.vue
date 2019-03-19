<template>
  <div id="app">
		<Header />
    <div class="main">
      <router-view/>
    </div>
    <div class="footer">
      WDNMD
    </div>
  </div>
</template>

<script>
import Header from '../src/components/Header'

export default {
  name: 'App',
  components: {
		Header
	},
}
</script>

<style lang="scss" scoped>
#app {
  padding-bottom: 15px;
	.main{
		margin-top: 65px;
  }
  .footer {
    text-align: center;
    line-height: 50px;
  }
}
</style>

