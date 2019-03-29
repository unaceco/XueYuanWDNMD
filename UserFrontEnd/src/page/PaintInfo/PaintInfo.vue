<template>
	<div class="articleInfo">
		<div class="header">
			<div class="userInfo">
				<div class="avatar">
					<img :src="info.user.avatar" alt="">
				</div>
				<div>
					{{info.user.nickname}}
				</div>
				<div class="options">
					<el-button v-if="isFollow" @click="changeFollowStatus" type="primary" size="mini" >已关注</el-button>
					<el-button v-else @click="changeFollowStatus" type="primary" size="mini" icon="el-icon-circle-plus-outline">关注</el-button>
				</div>
			</div>
		</div>

		<!-- content -->
		<div class="content">
			<img :src="info.paintUrl" alt="">
		</div>

		<!-- options -->
		<div class="uOptions">
			<el-button  v-if="isLiked" @click="changeLikeStatus" type="primary" icon="el-icon-star-on">已喜欢{{info.likes.length}}</el-button>
			<el-button v-else @click="changeLikeStatus" type="primary" icon="el-icon-star-off">喜欢{{info.likes.length}}</el-button>
			<el-button v-if="isCollect" @click="changeCollectStatus" type="primary" icon="el-icon-tickets">已收藏</el-button>
			<el-button v-else @click="changeCollectStatus" type="primary" icon="el-icon-tickets">收藏</el-button>
		</div>

		<!-- write comments -->
		<div class="writeComments">
			<div class="myAvatar">
				<img src="https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/13nhnzsl3m.png" alt="">
			</div>
			<el-input placeholder="请输入内容" v-model="writeComments" class="input-with-select">
				<el-button slot="append" @click="writeComment">发送</el-button>
			</el-input>
		</div>

		<!-- 分割线 -->
		<div class="line"></div>

		<!-- comments list -->
		<div class="commentList">
			<div v-for="(item, index) in commentsList" :key="index">
				<commnet 
					:info="commentsList[index]"
					:type="2"
					v-on:updateComment="updateComment"
				/>
			</div>
		</div>

	</div>
</template>

<script>
import Commnet from '@/components/Comment'

export default {
	components: {
		Commnet,
	},
	data () {
		return {
			writeComments: '',
			info: {
				user: {
					avatar: ''
				},
				likes: [],
				collects: [],
			},
			followInfo: {},
			commentsList: [],
		};
	},
	computed: {
		isLiked() {
			const isLikedStatus = this.info.likes.filter(x => x.from_user_id == JSON.parse(sessionStorage.getItem('userInfo')).id)
			if (isLikedStatus.length == 0) {
				return false
			}else {
				return true
			}
		},
		isCollect() {
			const isCollectStatus = this.info.collects.filter(x => x.from_user_id == JSON.parse(sessionStorage.getItem('userInfo')).id)
			if (isCollectStatus.length == 0) {
				return false
			}else {
				return true
			}
		},
		isFollow() {
			return this.followInfo
		}
	},
	async created () {
		await this.getInfoById()
		await this.getFollowStatus()
		await this.getAllComments()
	},
	methods: {
		async getInfoById() {
			const result = await this.$request.post('/api/article/paintId', {
				paintId: this.$route.params.paintId
			})
			this.info = result.data.data
		},
		async changeLikeStatus() {
			const result = await this.$request.post('/api/like', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id, 
				type: 2, 
				info_id: this.info.paintId
			})
			if (result.data.success) {
				await this.getInfoById()
			}
		},
		async changeCollectStatus() {
			const result = await this.$request.post('/api/collect', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id, 
				type: 2, 
				info_id: this.info.paintId
			})
			if (result.data.success) {
				await this.getInfoById()
			}
		},
		async getFollowStatus() {
			const result = await this.$request.post('/api/follow/find', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id, 
			})
			if (result.data.success) {
				this.followInfo = result.data.data
			}
		},
		async changeFollowStatus() {
			const result = await this.$request.post('/api/follow/change', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id, 
			})
			if (result.data.success) {
				this.$message.success(result.data.msg)
				await this.getFollowStatus()
			}
		},
		async getAllComments() {
			const result = await this.$request.post('/api/comments/all', {
				type: 2,
				info_id: this.info.paintId
			})
			if (result.data.success) {
				this.commentsList = result.data.data
			}
		},
		async writeComment() {
			if (this.writeComments == '') {
				this.$message.error('不能为空')
				return
			}
			const result = await this.$request.post('/api/comments/write', {
				content: this.writeComments, 
				type: 2,
				info_id: this.info.paintId,
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id,
			})

			if (result.data.success) {
				await this.getAllComments()
			}
		},
		async updateComment() {
			await this.getAllComments()
		}
	}
}
</script>

<style lang="scss" scoped>
.articleInfo {
	margin: 0 auto;
	width: 750px;
	padding: 25px;
	border: 1px solid #e5e5e5;
	
	.header {
		h2 {
			font-size: 30px;
		}
		.userInfo {
			margin: 15px 0;
			display: flex;
			align-items: center;

			.avatar, .avatar img {
				height: 50px;
				width: 50px;
			}

			div {
				margin-right: 15px;
			}

		}
	}

	.content {
		line-height: 25px;
		text-align: center;

		img {
			height: 500px;
			width: 500px;
		}
	}

	.uOptions {
		display: flex;
		justify-content: space-around;
	}

	.writeComments {
		margin-top: 15px;
		display: flex;

		.myAvatar, .myAvatar img {
			height: 50px;
			width: 50px;
		}
	}

	.count {
		margin-top: 30px;
		display: flex;

		.like {
			margin-right: 15px;
		}
		.comments {

		}
	}

	.line {
		margin: 20px 0;
		height: 1px;
		background-color: #e5e5e5;
	}

}
</style>

