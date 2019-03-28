<template>
	<div class="articleInfo">
		<span> 图片详情  id: {{$route.params.paintId}}</span>

		<div class="header">
			<div class="userInfo">
				<div class="avatar">
					<img :src="info.user.avatar" alt="">
				</div>
				<div>
					{{info.user.nickname}}
				</div>
				<div class="options">
					<el-button type="primary" size="mini" icon="el-icon-circle-plus-outline">关注</el-button>
				</div>
			</div>
		</div>

		<!-- content -->
		<div class="content">
			<img :src="info.paintUrl" alt="">
		</div>

		<!-- options -->
		<div class="uOptions">
			<el-button type="primary" icon="el-icon-bell">喜欢</el-button>
			<el-button type="primary" icon="el-icon-tickets">收藏</el-button>
		</div>

		<!-- write comments -->
		<div class="writeComments">
			<div class="myAvatar">
				<img src="https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/13nhnzsl3m.png" alt="">
			</div>
			<el-input
				type="textarea"
				:rows="2"
				placeholder="请输入内容"
				v-model="writeComments">
			</el-input>
		</div>

		<!-- count -->
		<div class="count">
			<div class="like">
				<i class="el-icon-bell"></i>
				喜欢
			</div>
			<div class="comments">
				<i class="el-icon-edit"></i>
				评论
			</div>
		</div>

		<!-- 分割线 -->
		<div class="line"></div>

		<!-- comments list -->
		<div class="commentList">
			<div v-for="i in 4" :key="i">
				<commnet />
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
					avatart: ''
				}
			}
		};
	},
	async created () {
		await this.getInfoById()
	},
	methods: {
		async getInfoById() {
			const result = await this.$request.post('/api/article/paintId', {
				paintId: this.$route.params.paintId
			})
			this.info = result.data.data
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