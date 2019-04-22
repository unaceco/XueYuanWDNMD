<style lang="css" scoped>
	img {
	margin-top: 10px;
}
</style>
<template>
	<div id="userinfo">
		<el-table :data="userData" style="width: 100%">
			<el-table-column label="头像" width="100">
				<template slot-scope="scope">
					<img v-if="!userForm.avatar" v-avatar="userForm.nickname" width="40" height="40" />
					<img v-else :src="userForm.avatar" width="40" height="40" />
				</template>
			</el-table-column>
			<el-table-column prop="nickname" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="balance" label="余额">
			</el-table-column>
			<el-table-column prop="created_at" label="注册时间">
			</el-table-column>
			<el-table-column label="操作" prop="">
				<template slot-scope="scope">
					<el-button type="text" @click="dialogFormVisible = true">修改</el-button>
					<!-- 修改的弹框 -->
					<el-dialog title="用户信息" :visible.sync="dialogFormVisible">
						<el-form :model="userForm">
							<el-form-item label="头像" :label-width="formLabelWidth">
								<upload 
									v-on:getImgUrl="getImgUrl"
								/>
							</el-form-item>
							<el-form-item label="姓名" :label-width="formLabelWidth">
								<el-input v-model="userForm.nickname" auto-complete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button v-if="canUpdate" type="primary" @click="updateUserInfo">确 定</el-button>
							<el-button v-else disabled>确 定</el-button>
						</div>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
  import moment from 'moment'
	import Upload from '@/components/Upload'

	export default {
		components: {
			Upload
		},
		data() {
			return {
				userId: '',
				userData: [],
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: '100px',
				userForm: {},
				canUpdate: false, // 确定按钮是否可以点击
			};
		},
		async created() {
			this.canUpdate = false
			this.getId()
			await this.getUserInfo()
		},
		methods: {
			// 从url获取user id
			getId() {
				this.userId = this.$route.params.userid
			},
			// 获取当前用户信息
			async getUserInfo() {
				const result = await this.$request('/api/admin/userById', 'POST', {
					userId: this.userId
				})
				if (result.success) {
					result.data.created_at = moment(result.data.created_at).format('YYYY-MM-DD')
					this.userData.push(result.data)
					this.userForm = {
						avatar: result.data.avatar,
						nickname: result.data.nickname,
					}
				}
			},
			// 更新用户信息
			async updateUserInfo() {
				if (this.userForm.nickname == null) {
					this.$message.error('昵称不能为空')
					return
				} 
				this.dialogFormVisible = false
				const result = this.$request('/api/admin/updateUserById', 'PUT', {
					userId: this.userId,
					nickname: this.userForm.nickname,
					avatar: this.userForm.avatar
				})
			},
			// 获取头像url
			getImgUrl(imgUrl) {
				this.userForm.avatar = imgUrl
				this.canUpdate = true
			}
		},
	}
</script>