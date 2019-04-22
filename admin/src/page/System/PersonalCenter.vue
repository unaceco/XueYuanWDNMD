<template>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="name" label="姓名" width="180">
		</el-table-column>
		<el-table-column prop="identity" label="权限" width="180">
		</el-table-column>
		<el-table-column prop="date" label="入职时间">
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: sessionStorage.user_name,
					role: sessionStorage.user_role,
					identity: ''
				}]
			};
		},
		created() {
			this.roleToWord()
		},
		methods: {
			roleToWord() {
				if (this.tableData[0].role == 3) {
					this.tableData[0].identity = '系统管理员'
				} else if (this.tableData[0].role == 2) {
					this.tableData[0].identity = '图书管理员'
				}
			}
		}
	}
</script>

<style lang="css" scoped>

</style>