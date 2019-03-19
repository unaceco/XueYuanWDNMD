<template>
	<div class="article">
		<!-- basic info -->
		<div class="basicInfo">
			<h2>xxxx</h2>
			<div class="content">
				contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
			</div>
			<div class="options">
				<span>作者</span>
				<span><i class="el-icon-star-on"></i>点赞</span>
				<span><i class="el-icon-edit-outline"></i>评论</span>
			</div>
		</div>
		<!-- right img -->
		<div class="basicImg">
			<img src="../../assets/logo.png" alt="">
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
.article {
	border-bottom: 1px solid #e5e5e5;
	height: 200px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.basicInfo {
		width: 500px;
		display: flex;
		flex-direction: column;
		padding: 15px;

		h2 {
			font-size: 25px;
			margin-bottom: 15px;
		}

		.content {
			margin-bottom: 15px;
			word-wrap:break-word;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 5;      /* 可以显示的行数，超出部分用...表示*/
			-webkit-box-orient: vertical;
		}

		.options {
			font-size: 14px;
			span {
				margin-right: 15px;
			}
		}

	}

	.basicImg {
		width: 200px;
		height: 150px;
		background-color: aliceblue;

		img {
			width: 200px;
			height: 150px;
		}
	}

}
</style>