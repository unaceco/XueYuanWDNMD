<template>
  <div id="home" v-loading="loading">
    <div class="app-header">
      <div class="title">后台管理系统</div>
      <div class="welcome">欢迎你,
        <el-dropdown @command="logout">
          <span class="el-dropdown-link">
              {{userData.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="app-content">
      <div class="app-nav">
        <app-nav></app-nav>
      </div>
      <div class="app-wrap">
        <!-- 此处放置el-tabs代码 -->
        <div class="template-tabs">
          <el-tabs v-model="activeIndex" type="border-card" closable @tab-click="tabClick" v-if="options.length" @tab-remove="tabRemove">
            <el-tab-pane :key="item.name" v-for="(item, index) in options" :label="item.name" :name="item.route">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content-wrap">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './../store'
  import AppNav from './common/AppNav';
  export default {
    name: 'home',
    components: {
      AppNav
    },
    data() {
      return {
        userData: {},
        loading: false,
      }
    },
    mounted() {
      this.userData = JSON.parse(sessionStorage.getItem('user'))
    },
    methods: {
      async logout() {
        this.loading = true
        const result = await this.$request('/api/user/logout', 'GET', {})
        if (result.success) {
          sessionStorage.clear()
          this.$router.push({
            path: '/login'
          });
        }
        this.loading = false
        this.$store.commit('resetState')
      },
      // tab切换时，动态的切换路由
      tabClick(tab) {
        let path = this.activeIndex;
        // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
        if (this.activeIndex === '/userinfo') {
          path = this.activeIndex + '/' + this.$store.state.userInfo.id;
        }
        if (this.activeIndex === '/liveGroupInfo') {
          path = this.activeIndex + '/' + this.$store.state.liveGroupInfo.liveGroupId;
        }
        this.$router.push({
          path: path
        });
      },
      tabRemove(targetName) {
        // 首页不可删除
        if (targetName == '/index') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
            this.$router.push({
              path: this.activeIndex
            });
          } else {
            this.$router.push({
              path: '/index'
            });
          }
        }
      }
    },
    computed: {
      options() {
        return this.$store.state.options;
      },
      activeIndex: {
        get() {
          return this.$store.state.activeIndex;
        },
        set(val) {
          this.$store.commit('set_active_index', val);
        }
      }
    },
    watch: {
      '$route' (to) {
        let flag = false;
        for (let option of this.options) {
          if (option.name === to.name) {
            flag = true;
            this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {
            route: '/' + to.path.split('/')[1],
            name: to.name
          });
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
        }
      }
    }
  }
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: flex;
    flex-flow: column;
    overflow: hidden;
    .app-header {
      color: #fff;
      flex: 0 0 60px;
      background-color: #545c64;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      .title {
        font-size: 24px;
        float: left;
      }
      .welcome {
        float: right;
        .el-dropdown-link {
          font-size: 18px;
          color: #fff;
        }
      }
    }
    .app-content {
      flex: 1;
      display: flex;
      flex-flow: row;
      .app-nav {
        flex: 0 0 200px;
        background: #eff2f7;
      }
      .app-wrap {
        flex: 1;
        padding: 10px 20px;
        overflow: auto;
        min-width: 950px;
        .content-wrap {
          min-height: 75%;
          border: 1px solid #d1dbe5;
          border-top: none;
          padding: 0 20px;
          min-height: 75%;
          padding-bottom: 80px;
        }
      }
    }
  }
</style>
