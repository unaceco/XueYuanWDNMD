<style scoped>
  .search-place {
    height:50px;
}
.el-input {
    float: left;
    width: 30%;
}
.selectRole {
    float: right;
}
.searchBtn {
    margin-left: 30px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
    font-size: 12px;
}
.options{
    margin: 10px;
}
.uploadExcel input[type=file]
{
    display: none;
}
.blockPage {
    text-align: center;
    margin-top: 20px;
    margin-bottom: -50px;
}
.op-tag {
  margin-left: 10px;
}
.main {
	display:  flex;
	flex-wrap: wrap;
}
</style>
<!-- 用户管理组件 -->
<template>
  <div class="user-wrap">
    <div class="search-place">
      <el-input placeholder="请输入要搜索绘画名" v-model="inputSearch" clearable></el-input>
      <el-button class="searchBtn" @click="searchPaintByTitle()">搜索</el-button>
      <el-button type="success" @click="resetAll" class="searchBtn">重置</el-button>
    </div>
		<div class="main">
			<div v-for="(item, index) in paintList" :key="index">
				<paint-comp 
					:paint="item"
					v-on:deletePaintById="deletePaintById"
				/>
			</div>
		</div>

  </div>
</template>

<script>
import PaintComp from './PaintComp'
  export default {
		components: {
			PaintComp
		},
    data() {
      return {
				inputSearch: '',
				paintList: []
      };
    },
    async created() {
      await this.getAllPaint()
    },
    mounted() {},
    methods: {
      // 重置
      async resetAll() {
        this.inputSearch = ''
        this.dataListStatus = 0
        await this.getAllPaint()
			},
			async searchPaintByTitle() {
				const result = await this.$request('/api/admin/getPaintByTitle', 'POST', {
					title: this.inputSearch
				})
				if (result.success) {
					this.paintList = result.data
				}
			},
			async getAllPaint() {
				const result = await this.$request('/api/admin/paint', 'GET')
				if (result.success) {
					this.paintList = result.data
				}
			},
			async deletePaintById(paintId) {
				const result = await this.$request('/api/admin/deletepaint', 'DELETE', {
					paintId
				})
				if (result.success) {
					this.$message.success(result.msg)
					await this.getAllPaint()
				}else {
					this.$message.error(result.msg)
				}
			}
    }
  };
</script>