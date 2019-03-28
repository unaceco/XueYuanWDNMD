<template>
	<div class="homePage">
		<!-- 走马灯 -->
		<div class="swipe">
			<el-carousel trigger="click">
				<el-carousel-item v-for="item in 4" :key="item">
					<h3>{{ item }}</h3>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- tabs -->
		<div class="tabsDiv">
			<!-- switch -->
			<div class="switchTabs">
				<div class="article" :class="isActive==0 ? 'isActive': ''" @click="isActive = 0">
					文章
				</div>
				<div class="painting" :class="isActive==1 ? 'isActive': ''"  @click="isActive = 1">
					绘画
				</div>
			</div>
			<!-- content -->
			<div class="tabsContent">
				<div class="articles" v-if="isActive==0">
					<div v-for="(item, index) in articleList" :key="index">
						<Article 
							:info="articleList[index]"
						/>
					</div>
				</div>
				<div class="paintings" v-if="isActive==1">
					<div v-for="(item, index) in paintList" :key="index">
						<Paint 
							:info="paintList[index]"
						/>
					</div>
				</div>

			</div>
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
			tabActive: 'first',
			isActive: 0,
			articleList: [],
			paintList: []
		};
	},
	async created () {
		await this.getAllArticles()
		await this.getAllPaints()
	},
	methods: {
		async getAllArticles() {
			const result = await this.$request('/api/article')
			this.articleList = result.data.data
		},
		async getAllPaints() {
			const result = await this.$request('/api/paint')
			this.paintList = result.data.data
		}
	}
}
</script>

<style lang="scss" scoped>
.homePage {
	margin: 0 auto;
	width: 800px;

	.swipe {
		height: 300px;

		.el-carousel {
			height: 300px;

			.el-carousel__item h3 {
				color: #475669;
				font-size: 14px;
				opacity: 0.75;
				line-height: 300px;
				margin: 0;
			}

			.el-carousel__item:nth-child(2n) {
				background-color: #99a9bf;
			}
			
			.el-carousel__item:nth-child(2n+1) {
				background-color: #d3dce6;
			}
		}

	}

	.tabsDiv {
		margin-top: 15px;

		.switchTabs {
			height: 60px;
			display: flex;
			justify-content: space-around;

			.article, .painting {
				line-height: 60px;
				text-align: center;
				height: 60px;
				width: 398px;
				border: 1px solid #e5e5e5;
				cursor: pointer;
			}
			.painting{
				border-left: none;
			}

			.isActive {
				border-bottom: none;
				color: rgb(255, 59, 59);
			}
		}

		.tabsContent {
			// height: 500px;
			// background-color: #99a9bf;
			border: 1px solid #e5e5e5;
			border-top: none;
			padding: 15px;
		}
	}

}
</style>