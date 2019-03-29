<template>
	<div class="comment">
		<!-- base info -->
		<div class="baseInfo">
			<div class="avatar">
				<img :src="userInfo.avatar" alt="">
			</div>
			<div class="info">
				<div class="name">{{userInfo.nickname}}</div>
				<div>{{info.created_at}}</div>
			</div>
		</div>
		<!-- comment content -->
		<div class="content">
			{{info.content}}
		</div>

		<!-- reply -->
		<div class="reply" @click="replyVisible = true">
			<i class="el-icon-edit"></i>
			回复
		</div>

		<el-dialog title="收货地址" :visible.sync="replyVisible">
			<el-input placeholder="请输入内容" v-model="writeComments" class="input-with-select">
				<el-button slot="append" @click="writeComment">发送</el-button>
			</el-input>
		</el-dialog>

	</div>
</template>

<script>
export default {
	props: {
		info: Object,
		type: Number
	},
	data () {
		return {
			userInfo: {},
			writeComments: '',
			replyVisible: false,
		};
	},
	async created () {
		this.userInfo = await this.getUserInfo(this.info.from_user_id)
	},
	methods: {
		async getUserInfo(id) {
			const result = await this.$request.post('/api/user/findById', {
				id
			})
			if (result.data.success) {
				return result.data.data
			}
		},
		async writeComment() {
			this.replyVisible = false
			if (this.writeComments == '') {
				this.$message.error('不能为空')
				return
			}
			const result = await this.$request.post('/api/comments/write', {
				content: `@${this.userInfo.nickname}: ${this.writeComments}`, 
				type: this.type,
				info_id: this.type == 1 ? this.info.article_id : this.info.paint_id,
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.from_user_id,
			})

			if (result.data.success) {
				this.$emit('updateComment')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.comment {
	margin-top: 10px;
	padding-bottom: 15px;
	border-bottom: 1px solid #e5e5e5;

	.baseInfo {
		display: flex;

		.avatar, .avatar img {
			height: 50px;
			width: 50px;
		}

		.info {
			margin-left: 15px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 12px;

			.name {
				font-size: 17px;
			}
		}
	}

	.content {
		margin-top: 15px;
		word-wrap:break-word ;
	}
	
	.reply {
		font-size: 15px;
		margin-top: 15px;
	}

}
</style>