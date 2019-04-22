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
      <el-input placeholder="请输入要搜索用户名或昵称" v-model="inputSearch" clearable></el-input>
      <el-button class="searchBtn" @click="searchUser()">搜索</el-button>
      <el-button type="success" @click="resetAll" class="searchBtn">重置</el-button>
      <el-select v-model="selectSearch" placeholder="身份筛选" filterable :clearable="true" @change="getSearchRole" class="selectRole">
        <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
      </el-select>
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
          <el-tag class="op-tag" type="success" v-if="loginId == scope.row.id">自己</el-tag>
          <el-button type="text" v-if="loginId !== scope.row.id" @click="clickChangeRole(scope.row), dialogFormVisible = true" class="options">修改权限</el-button>
          <el-button type="text" v-if="loginId !== scope.row.id" @click="delUserInfo(scope.row)">删除</el-button>

          <el-dialog title="权限管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="权限选择" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择权限" @change="getChangeRole">
                  <el-option v-for="item in changeRoleoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeRole()">确 定</el-button>
            </div>
          </el-dialog>
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
        selectSearch: '',
        options: [{
          value: -1,
          label: '封禁用户',
        }, {
          value: 1,
          label: '普通用户',
        }, {
          value: 2,
          label: '管理员',
        }],
        changeRoleoptions: [{
          value: -1,
          label: '封禁用户',
        }, {
          value: 1,
          label: '普通用户',
        }, {
          value: 2,
          label: '管理员',
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          role: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        newRow: {},
        formLabelWidth: '120px',
        tableData: [],
        tableColumns: [{
            label: 'id',
            prop: 'id'
          },
          {
            label: '用户名',
            prop: 'useraccount'
          },
          {
            label: '姓名',
            prop: 'nickname'
          },
          {
            label: '身份',
            prop: 'rolename'
          }
        ],
        delIndex: '',
        delRows: '',
        searchRole: '',
        selectRole: '', // 修改权限时,选择的 role
        loading: true,
        count: 0,
        currentPageSave: 0,
        dataListStatus: 0, // 0 默认全部list, 1 按权限分类list，2 昵称搜索 list
        loginId: 0,
      };
    },
    async created() {
      await this.getAllUser()
      this.loginId = JSON.parse(sessionStorage.user).id
    },
    mounted() {},
    methods: {
      // 重置
      async resetAll() {
        this.inputSearch = ''
        this.dataListStatus = 0
        await this.getAllUser()
      },
      // role -> rolename
      changeRole2Name(result) {
        for (const key of result.data) {
          switch (key.role) {
            case -1:
              key.rolename = '封禁用户'              
              break;
            case 1:
              key.rolename = '普通用户'              
              break;
            case 2:
              key.rolename = '管理员'              
              break;
            default:
              break;
          }
        }
      },
      // 获取所有用户信息
      async getAllUser(page = 1) {
        this.dataListStatus = 0
        this.tableData = []
        const result = await this.$request('/api/admin/userList?offset=' + (page - 1))
        if (result.success) {
          this.changeRole2Name(result)
          this.count = result.count
          this.tableData = result.data
          this.loading = false
        }
      },
      // 跳转到用户详情页
      getUserInfo(row) {
        this.$store.commit('save_detail_userInfo', row)
        this.$router.push({
          path: `userinfo/${row.id}`
        })
      },
      // 获取所选权限
      async getSearchRole(value) {
        this.searchRole = value

        this.searchRole ? await this.getSearchRoleData() : await this.getAllUser()
      },
      // 根据所选权限获取用户信息
      async getSearchRoleData(page = 1) {
        this.dataListStatus = 1
        this.tableData = []
        this.loading = true
        const result = await this.$request(`/api/admin/userByRole?offset=${page - 1}`, 'POST', {
          userRole: this.searchRole
        })
        if (result.success) {
          this.changeRole2Name(result)
          this.count = result.count
          this.tableData = result.data
          this.loading = false
        }
      },
      // 点击获取当前行信息
      clickChangeRole(row) {
        this.newRow = row
      },
      // 获取选择的权限
      getChangeRole(value) {
        this.selectRole = value;
      },
      // 修改权限
      async changeRole() {
        if (this.form.region == '') {
          this.$message.error('修改失败,所选内容不能为空')
        }else {
          this.dialogFormVisible = false;
          const result = await this.$request('/api/admin/changeUserRole', 'PUT', {
            userID: this.newRow.id,
            role: this.selectRole
          })
          if (result.success) {
            this.$message.success('修改成功')
            switch (this.selectRole) {
               case -1:
                this.newRow.rolename = '封禁用户'              
                break;
              case 1:
                this.newRow.rolename = '普通用户'              
                break;
              case 2:
                this.newRow.rolename = '管理员'              
                break;
              default:
                break;
            }
          }

        }
      },
      // 昵称或手机号 模糊搜索
      async searchUser(val = 1) { 
        if (this.inputSearch == '') {
          this.$message.error('请输入要搜索的用户名')
          return;
        }
        this.dataListStatus = 2
        let options = {}
        this.tableData = []
        this.loading = true     

        const result = await this.$request(`/api/admin/userByNickname?offset=${val - 1}`, 'POST', {
          nickname: this.inputSearch,
          useraccount: this.inputSearch
        })
        if (result.success) {
          this.$message.success('搜索成功')
          this.changeRole2Name(result)    
          this.count = result.count
          this.tableData = result.data
          this.loading = false      
        }
      },
      // 删除某一用户
      async delUserInfo(row) {
        const result = await this.$request('/api/admin/deleteUserById', 'DELETE', {
          userId: row.id
        })
        if (result.success) {
          await this.getAllUser()
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
            await this.getAllUser(val)
            break;
          case 1:
            await this.getSearchRoleData(val)
            break;
          case 2:
            await this.searchUser(val)
            break;
          default:
            break;
        }
      },
    }
  };
</script>