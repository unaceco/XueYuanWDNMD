<template>
	<div class="comment">
		<!-- base info -->
		<div class="baseInfo">
			<div class="avatar">
				<img src="https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/13nhnzsl3m.png" alt="">
			</div>
			<div class="info">
				<div class="name">name</div>
				<div>time</div>
			</div>
		</div>
		<!-- comment content -->
		<div class="content">
			xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		</div>

		<!-- reply -->
		<div class="reply">
			<i class="el-icon-edit"></i>
			回复
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
	margin-top: 10px;
	padding-bottom: 15px;
	border-bottom: 1px solid #e5e5e5;

	.baseInfo {
		display: flex;

		.avatar, .avatar img {
			height: 50px;
			width: 50px;
		}

		.info {
			margin-left: 15px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 12px;

			.name {
				font-size: 17px;
			}
		}
	}

	.content {
		margin-top: 15px;
		word-wrap:break-word ;
	}
	
	.reply {
		font-size: 15px;
		margin-top: 15px;
	}

}
</style>