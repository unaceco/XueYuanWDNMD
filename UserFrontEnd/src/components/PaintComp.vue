<template>
	<div class="paint">
		<div class="paintImg">
			<img @click="redirect" src="https://free.modao.cc/uploads4/images/3049/30499514/v2_pm6q76.jpg" alt="">
			<div class="lock">
				<img src="../assets/personal.png" alt="">
			</div>
		</div>
		<div class="options">
				<span>作者</span>
				<span><i class="el-icon-star-on"></i>点赞</span>
				<span><i class="el-icon-edit-outline"></i>评论</span>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
		};
	},
	methods: {
		redirect() {
			this.$router.push('/paint/2')
		}
	}
}
</script>

<style lang="scss" scoped>
.paint {
	height: 230px;
	width: 200px;
	margin: 30px;

	.paintImg {
		height: 200px;
		width: 200px;
		img {
			height: 200px;
			width: 200px;
		}
		img:hover {
			cursor: pointer;
		}

		.lock {
			height: 20px;
			width: 20px;
			position: relative;
			top: -202px;
			z-index: 100;
			background-color: #fff;

			img {
				height: 20px;
				width: 20px;
			}
		}
	}

	.options {
		margin-left: 5px;
		line-height: 30px;
		height: 30px;
		font-size: 14px;
		span {
			margin-right: 15px;
		}
	}
}
</style>