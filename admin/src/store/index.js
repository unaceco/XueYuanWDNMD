import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    options: [],
    activeIndex: '/user',
    userInfo: {},
    liveGroupInfo: {},
  },
  mutations: {
    resetState(state) {
      this.state.options = []
      this.state.activeIndex = '/user'
      this.state.userInfo = {}
      this.state.liveGroupInfo = {}
    },
    // 添加tabs
    add_tabs(state, data) {
      if (data.route !== '/login') {
        this.state.options.push(data)
      }
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index;
    },
    // 设置用户详情信息
    save_detail_userInfo(state, info) {
      this.state.userInfo = info;
    },
    // 设置文章详情信息
    save_detail_articleInfo(state, info) {
      this.state.articleInfo = info;
    }
  }
});

export default store;