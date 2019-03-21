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
					<span>关注  10</span>
					<span>粉丝  10</span>
					<el-button type="primary" plain>关注</el-button>
					<el-button type="primary" plain>取消关注</el-button>
				</div>
			</div>
		</div>
		<!-- main -->
		<div class="main">
			<!-- tabs -->
			<el-tabs v-model="tabsActiveName" @tab-click="handleClick">
				<el-tab-pane label="我的文章" name="first">
					<div class="tabArticle">
						<Article v-for="i in 4" />
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的画板" name="second">
					<div class="tabPaint">
						<Paint v-for="i in 4" />
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的喜欢" name="third">
					<div>
						<el-tabs type="card">
							<el-tab-pane label="文章">
								<div class="tabArticle">
									<Article v-for="i in 4" />
								</div>
							</el-tab-pane>
							<el-tab-pane label="图片">
								<div class="tabPaint">
									<Paint v-for="i in 4" />
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
									<Article v-for="i in 4" />
								</div>
							</el-tab-pane>
							<el-tab-pane label="图片">
								<div class="tabPaint">
									<Paint v-for="i in 4" />
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
			tabsActiveName: 'first'
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
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