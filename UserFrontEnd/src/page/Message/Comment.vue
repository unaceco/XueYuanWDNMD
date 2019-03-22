<template>
	<div class="comment">
		<div class="avatar">
			<img src="https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/13nhnzsl3m.png" alt="">
		</div>
		<div class="name">
			name 评论：
		</div>
		<div class="content">
			xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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
.comment {
	display: flex;
	margin: 15px 0;

	div {
		margin-right: 15px;
	}

	.avatar, .avatar img {
		height: 50px;
		width: 50px;
	}
	.name {
		line-height: 50px;
	}

	.content {
		width: 500px;
		line-height: 25px;
		background-color: #e5e5e5;
		word-wrap:break-word ;
	}

}
</style>