<template>
	<div class="message">
		<div class="tabs">
			<el-tabs tab-position="left" >
				<el-tab-pane>
					<span slot="label"><i class="el-icon-edit-outline"></i> 评论</span>
					<div class="header">
						收到的评论
					</div>
					<div v-for="(item, index) in commentList" :key="index">
						<comment 
							:info="commentList[index]"
						/>
					</div>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"><i class="el-icon-star-off"></i> 赞</span>
					<div class="header">
						收到的赞
						<div v-for="(item, index) in likeList" :key="index">
							<Like 
								:info="likeList[index]"
							/>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"><i class="el-icon-view"></i> 关注</span>
					关注
					<div class="followDiv" >
						<div v-for="(item, index) in followList" :key="index">
							<Follow
								:info="followList[index]"
							/>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import Comment from './Comment'
import Like from './Like'
import Follow from './Follow'

export default {
	components: {
		Comment,
		Like,
		Follow
	},
	data () {
		return {
			commentList: [],
			likeList: [{
				like_from_user: {
					avatar: '',
					nickname: ''
				},
				article: {
					title: '',
				},
				paint: {
					title: '',
				},
			}],
			followList: [],
		};
	},
	async created () {
		await this.getComments()
		await this.getLikes()
		await this.getFollows()
	},
	methods: {
		async getComments() {
			const result = await this.$request.post('/api/message/comments', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
			})
			if (result.data.success) {
				this.commentList = result.data.data
			}
		},
		async getLikes() {
			const result = await this.$request.post('/api/message/likes', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
			})
			if (result.data.success) {
				this.likeList = result.data.data
			}
		},
		async getFollows() {
			const result = await this.$request.post('/api/message/follows', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
			})
			if (result.data.success) {
				this.followList = result.data.data
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.message {
	margin: 0 auto;
	width: 800px;
	height: 800px;
	margin-top: 100px;

	.tabs {

		.el-tabs__item {
			height: 80px;
		}

		.followDiv {
			display: flex;
			flex-wrap: wrap;
		}

	}

}
</style>