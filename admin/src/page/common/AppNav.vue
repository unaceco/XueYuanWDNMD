<!-- 左侧菜单导航栏组件 -->
<template>
  <div class="app-nav-wrap">
    <el-menu 
      :default-active="$route.path" 
      class="el-menu-vertical-demo" 
      router
      background-color="#eff2f7"
    >
      <el-menu-item class="menu-item" v-for="menu in menus" :index="menu.route" :key="menu.route">
        <i :class="menu.icon" /> {{menu.name}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import store from './../../store/index'
  export default {
    data() {
      return {
        menus: [{
            icon: 'el-icon-location',
            route: '/index',
            name: '首页'
          },
          {
            icon: 'el-icon-menu',
            route: '/usermanage',
            name: '用户管理',
          },
          {
            icon: 'el-icon-info',
            route: '/personal',
            name: '个人中心'
          }
        ],
      }
    },
    created() {},
    mounted() {
      // 刷新时以当前路由做为tab加入tabs
      if (this.$route.path !== '/index' && this.$route.path.indexOf('userInfo') == -1 && this.$route.path.indexOf('liveGroupInfo') == -1) {
        this.$store.commit('add_tabs', {
          route: '/index',
          name: '首页'
        })
        this.$store.commit('add_tabs', {
          route: this.$route.path,
          name: this.$route.name
        })
        this.$store.commit('set_active_index', this.$route.path)
      } else {
        this.$store.commit('add_tabs', {
          route: '/index',
          name: '首页'
        })
        this.$store.commit('set_active_index', '/index')
        this.$router.push('/index')
      }
    },
    computed: {
      options() {
        return this.$store.state.options
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;

  i {
    margin-right: 10px;
  }
}
</style>
