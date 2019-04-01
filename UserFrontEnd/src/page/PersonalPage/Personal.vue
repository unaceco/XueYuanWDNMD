<template>
	<div class="personal">
		<!-- header user info -->
		<div class="headerInfo">
			<!-- avatar -->
			<div class="avatarImg">
				<img class="avatar" src="https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/13nhnzsl3m.png" alt="">
			</div>
			<!-- info -->
			<div class="info">
				<div class="userName">
					name
				</div>
				<div class="relationship">
					<span>关注  {{lookCount}}</span>
					<span>粉丝  {{followCount}}</span>
				</div>
			</div>
		</div>
		<!-- main -->
		<div class="main">
			<!-- tabs -->
			<el-tabs v-model="tabsActiveName">
				<el-tab-pane label="我的文章" name="first">
					<div class="tabArticle">
						<div v-for="(item, index) in articleList" :key="index">
							<Article 
								:info="articleList[index]"
								v-on:reloadData="reloadData"
							/>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的画板" name="second">
					<div class="tabPaint">
						<div v-for="(item, index) in paintList" :key="index">
							<Paint 
								:info="paintList[index]"
								v-on:reloadData="reloadData"
							/>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的喜欢" name="third">
					<div>
						<el-tabs type="card">
							<el-tab-pane label="文章">
								<div class="tabArticle">
									<div v-for="(item, index) in loveArticleList" :key="index">
										<Article 
											:info="loveArticleList[index]"
											v-on:reloadData="reloadData"
										/>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="图片">
								<div class="tabPaint">
									<div v-for="(item, index) in lovePaintList" :key="index">
										<Paint 
											:info="lovePaintList[index]"
											v-on:reloadData="reloadData"
										/>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的收藏" name="fourth">
					<div>
						<el-tabs type="card">
							<el-tab-pane label="文章">
								<div class="tabArticle">
									<div v-for="(item, index) in collectArticleList" :key="index">
										<Article 
											:info="collectArticleList[index]"
											v-on:reloadData="reloadData"
										/>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="图片">
								<div class="tabPaint">
									<div v-for="(item, index) in collectPaintList" :key="index">
										<Paint 
											:info="collectPaintList[index]"
											v-on:reloadData="reloadData"
										/>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-tab-pane>
			</el-tabs>

		</div>


	</div>
</template>

<script>
import Article from '@/components/ArticleComp'
import Paint from '@/components/PaintComp'

export default {
	components: {
		Article,
		Paint
	},
	data () {
		return {
			tabsActiveName: 'first',
			articleList: [],
			paintList: [],
			loveArticleList: [],
			lovePaintList: [],
			collectArticleList: [],
			collectPaintList: [],
			followCount: 0,
			lookCount: 0,
		};
	},
	async created () {
		await this.reloadData()
	},
	methods: {
		async reloadData() {
			this.articleList = []
			this.paintList = [],
			this.loveArticleList = []
			this.lovePaintList = []
			this.collectArticleList = []
			this.collectPaintList = []
			await this.getAllArticles()
			await this.getAllPaints()
			await this.getAllMyLove()
			await this.getAllMyCollect()
			await this.getMyFollow()
		},
		async getAllArticles() {
			const result = await this.$request.post('/api/article/userId', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id
			})

			if (result.data.success) {
				this.articleList = result.data.data
			}
		},
		async getAllPaints() {
			const result = await this.$request.post('/api/paint/userId', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id				
			})

			if (result.data.success) {
				this.paintList = result.data.data
			}
		},
		async getAllMyLove() {
			const result = await this.$request.post('/api/like/myLove', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id				
			})

			if (result.data.success) {
				result.data.data.forEach(x => {
					if (x.article) {
						this.loveArticleList.push(x.article)
					}else if (x.paint) {
						this.lovePaintList.push(x.paint)
					}
				});
			}
		},
		async getAllMyCollect() {
			const result = await this.$request.post('/api/follow/myCollect', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id								
			})

			if (result.data.success) {
				result.data.data.forEach(x => {
					if (x.article) {
						this.collectArticleList.push(x.article)
					}else if (x.paint) {
						this.collectPaintList.push(x.paint)
					}
				});
			}
		},
		async getMyFollow() {
			const result = await this.$request.post('/api/follow/count', {
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id								
			})
			if (result.data.success) {
				this.followCount = result.data.data.followToMe
				this.lookCount = result.data.data.followFromMe
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.personal {
	background-color: aliceblue;
	height: 1000px;
	margin: 0 auto;
	width: 800px;

	.headerInfo {
		margin-top: 100px;
		display: flex;

		.avatarImg {
			height: 100px;
			width: 100px;

			.avatar {
				height: 100px;
				width: 100px;
				border-radius: 50px;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 25px;

			.userName {
				font-size: 25px;
			}

			.relationship {
				span {
					margin-right: 15px;
				}
				.el-button {
					margin-left: 50px;
				}
			}
		}
	}


	.main {
		margin-top: 25px;

		.tabArticle {

		}

		.tabPaint {
			display: flex;
			flex-wrap: wrap;
		}
	}

}
</style>