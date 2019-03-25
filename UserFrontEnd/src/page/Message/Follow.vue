<template>
	<div class="follow">
		<div class="avatar">
			<img src="../../assets/logo.png" alt="">
		</div>
		<el-button size="mini" type="primary" plain>关注</el-button>
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
.follow {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border: 1px solid #e5e5e5;
	width: 100px;
	margin: 15px;

	.avatar, .avatar img {
		height: 30px;
		width: 30px;
	}

}
</style>