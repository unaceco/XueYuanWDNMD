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
</style>
<!-- 用户管理组件 -->
<template>
  <div class="user-wrap">
    <div class="search-place">
      <el-input placeholder="请输入要搜索文章名" v-model="inputSearch" clearable></el-input>
      <el-button class="searchBtn" @click="searchArticle()">搜索</el-button>
      <el-button type="success" @click="resetAll" class="searchBtn">重置</el-button>
    </div>
    <el-table :data="tableData" id="out-table" v-loading="loading">
      <template v-for="column in tableColumns">
        <el-table-column :width="column.label == 'id' ? 80 : ''" align="center" :label="column.label" :prop="column.prop">
        </el-table-column>
      </template>
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <!-- 详细信息 - 修改权限 -->
          <el-button type="text" @click="getUserInfo(scope.row)">详细信息</el-button>
          <el-button type="text" @click="delUserInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="blockPage">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    // -1为封禁用户,1为普通用户,2为管理员
    data() {
      return {
        inputSearch: '',
        newRow: {},
        tableData: [],
        tableColumns: [{
            label: 'id',
            prop: 'articleId'
          },
          {
            label: '作者',
            prop: 'user.nickname'
          },
          {
            label: '标题',
            prop: 'title'
					},
					{
						label: '是否私密',
            prop: 'personal'
					},
					{
						label: '创建时间',
            prop: 'created_at'
					}
        ],
        delIndex: '',
        delRows: '',
        loading: true,
        count: 0,
				currentPageSave: 0,
				dataListStatus: 0,
      };
    },
    async created() {
      await this.getAllArticle()
    },
    mounted() {},
    methods: {
      // 重置
      async resetAll() {
        this.inputSearch = ''
        this.dataListStatus = 0
        await this.getAllArticle()
      },
      // 获取所有文章信息
      async getAllArticle(page = 1) {
        this.dataListStatus = 0
        this.tableData = []
        const result = await this.$request('/api/admin/getAdminArticleList?offset=' + (page - 1))
        if (result.success) {
          this.count = result.count
          this.tableData = result.data
          this.loading = false
        }
      },
      // 跳转到文章详情页
      getUserInfo(row) {
        this.$store.commit('save_detail_articleInfo', row)
        this.$router.push({
          path: `articleinfo/${row.articleId}`
        })
      },

      // 点击获取当前行信息
      clickChangeRole(row) {
        this.newRow = row
      },
      // 模糊搜索
      async searchArticle(val = 1) { 
        if (this.inputSearch == '') {
          this.$message.error('请输入要搜索的文章名')
          return;
        }
        let options = {}
        this.tableData = []
        this.loading = true     
        this.dataListStatus = 1

        const result = await this.$request(`/api/admin/getArticleByTitle?offset=${val - 1}`, 'POST', {
          title: this.inputSearch,
        })
        if (result.success) {
          this.$message.success('搜索成功')
          this.count = result.count
          this.tableData = result.data
          this.loading = false      
        }
      },
      // 删除
      async delUserInfo(row) {
        const result = await this.$request('/api/admin/deleteArticleById', 'DELETE', {
          articleId: row.articleId
        })
        if (result.success) {
          this.$message.success('删除成功')
          await this.getAllArticle()
        }
      },
      // 分页
      async handleCurrentChange(val) {
        this.currentPageSave = val
        if (val == 0) {
          val += 1
        }
        switch (this.dataListStatus) {
          case 0:
            await this.getAllArticle(val)
            break;
          case 1:
            await this.searchArticle(val)
            break;
          default:
            break;
        }
      },
    }
  };
</script>