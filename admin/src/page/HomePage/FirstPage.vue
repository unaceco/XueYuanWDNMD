<template>
  <div id="homepage_chart" v-loading="loading">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
  </div>
</template>

<script>
  import LineChart from './components/LineChart'
  import moment from 'moment'

  export default {
    components: {
      LineChart
    },
    data() {
      return {
        lineChartData: {
          userData: [],
          articleData: [],
          paintData: [],
          timeData: []
        },
        loading: false,
        userList: [],
        articleList: [],
        paintList: []
      };
    },
    async created() {
      await this.getUserCount()
      await this.getArticleCount()
      await this.getPaintCount()

      for (let i = 6; i >= 0; i--) {
        this.lineChartData.timeData.push(moment().subtract('days', i).format('YYYY-MM-DD'))
      }

      let userCount = 0
      let articleCount = 0
      let paintCount = 0

      this.lineChartData.timeData.map(x => {
        // user
        userCount = 0
        this.userList.map(y => {
          if (moment(y.created_at).isBefore(x)) {
            userCount ++
          }
        })
        this.lineChartData.userData.push(userCount)

        // article
        articleCount = 0
        this.articleList.map(ar => {
          if (moment(ar.created_at).isBefore(x)) {
            articleCount ++
          }
        })
        this.lineChartData.articleData.push(articleCount)

        // paint
        paintCount = 0
        this.paintList.map(pa => {
          if (moment(pa.created_at).isBefore(x)) {
            paintCount ++
          }
        })
        this.lineChartData.paintData.push(paintCount)

      })


      

    },
    methods: {
      async getUserCount() {
        const result = await this.$request('/api/admin/userList')
        this.userList = result.data
      },
      async getArticleCount() {
        const result = await this.$request('/api/admin/getAdminArticleList')
        this.articleList = result.data
      },
      async getPaintCount() {
        const result = await this.$request('/api/admin/paint')
        this.paintList = result.data
      }
    }
  }

</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  .el-date-picker, .el-switch {
    margin: 0 15px;
  }
}
</style>


