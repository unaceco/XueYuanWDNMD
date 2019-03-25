<template>
	<div class="message">
		<div class="tabs">
			<el-tabs tab-position="left" >
				<el-tab-pane>
					<span slot="label"><i class="el-icon-edit-outline"></i> 评论</span>
					<div class="header">
						收到的评论
					</div>
					<div v-for="i in 4" :key="i">
						<comment />
					</div>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"><i class="el-icon-star-off"></i> 赞</span>
					<div class="header">
						收到的赞
						<div v-for="i in 4" :key="i">
							<Like />
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"><i class="el-icon-view"></i> 关注</span>
					关注
					<div class="followDiv" >
						<Follow v-for="i in 10" :key="i" />
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
		};
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