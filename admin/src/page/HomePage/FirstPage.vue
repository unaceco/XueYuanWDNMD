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
          visitData: [1,2,3,4,5],
          liveData: [6,7,8,9,0],
          timeData: ['1-1', '1-2', '1-3', '1-4', '1-5']
        },
        loading: false,
      };
    },
    async created() {

    },
    methods: {
      
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


