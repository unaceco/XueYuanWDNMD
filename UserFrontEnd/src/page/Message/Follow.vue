<template>
	<div class="follow">
		<div class="avatar">
			<img :src="info.follow_from_user.avatar" alt="">
		</div>
		<div class="name">
			{{info.follow_from_user.nickname}}
		</div>
		<el-button v-if="isFollow" size="mini" type="primary" plain  @click="changeFollowStatus">已关注</el-button>
		<el-button v-else size="mini" type="primary" plain @click="changeFollowStatus">关注</el-button>
	</div>
</template>

<script>
export default {
	props: {
		info: Object
	},
	data () {
		return {
			followInfo: {}
		};
	},
	computed: {
		isFollow() {
			return this.followInfo
		}
	},
	methods: {
		async getFollowStatus() {
			const result = await this.$request.post('/api/follow/find', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.follow_from_user.id, 
			})
			if (result.data.success) {
				this.followInfo = result.data.data
			}
		},
		async changeFollowStatus() {
			const result = await this.$request.post('/api/follow/change', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.follow_from_user.id, 
			})
			if (result.data.success) {
				this.$message.success(result.data.msg)
				await this.getFollowStatus()
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.follow {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border: 1px solid #e5e5e5;
	width: 200px;
	margin: 15px;

	.avatar, .avatar img {
		height: 30px;
		width: 30px;
	}

	.name {
		width: 100px;
		font-size: 14px;
	}

}
</style>