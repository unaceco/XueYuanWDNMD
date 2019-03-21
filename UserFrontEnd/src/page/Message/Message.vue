<template>
	<div class="message">
		<div class="tabs">
			<el-tabs tab-position="left" >
				<el-tab-pane>
					<span slot="label"><i class="el-icon-date"></i> 评论</span>
					评论
				</el-tab-pane>
				<el-tab-pane label="赞">配置管理</el-tab-pane>
				<el-tab-pane label="关注">角色管理</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
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
	}
}
</style>