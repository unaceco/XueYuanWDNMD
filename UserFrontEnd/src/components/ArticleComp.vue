<template>
	<div class="article">
		<!-- basic info -->
		<div class="basicInfo">
			<div class="header">
				<h2 @click="redirect">{{info.title}}</h2>
				<img  v-if="info.personal == 1" class="personal" src="../assets/personal.png" alt="">
			</div>
			<div class="content" v-html="info.content">
			</div>
			<div class="options">
				<span>作者: {{info.user.nickname}}</span>
				<span v-if="isLiked" class="like" @click="changeLikeStatus"><i class="el-icon-star-on"></i>已喜欢{{info.likes.length}}</span>
				<span v-else class="like" @click="changeLikeStatus"><i class="el-icon-star-off"></i>喜欢{{info.likes.length}}</span>
				<span><i class="el-icon-edit-outline"></i>评论</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		info: Object
	},
	data () {
		return {
		};
	},
	created () {
	
	},
	computed: {
		isLiked() {
			if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
				return false
			}
			const isLikedStatus = this.info.likes.filter(x => x.from_user_id == JSON.parse(sessionStorage.getItem('userInfo')).id)
			if (isLikedStatus.length == 0) {
				return false
			}else {
				return true
			}
		}
	},
	methods: {
		redirect() {
			this.$router.push('/article/'+this.info.articleId)
		},
		async changeLikeStatus() {
			if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
				return false
			}
			const result = await this.$request.post('/api/like', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id, 
				type: 1, 
				info_id: this.info.articleId
			})
			if (result.data.success) {
				this.$emit('reloadData')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.article {
	border-bottom: 1px solid #e5e5e5;
	// height: 200px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.basicInfo {
		width: 740px;
		display: flex;
		flex-direction: column;
		padding: 15px;

		.header {
			display: flex;
			justify-content: space-between;
			h2 {
				font-size: 25px;
				margin-bottom: 15px;
			}
			h2:hover {
				cursor: pointer;
				color:cadetblue;
				border-bottom: 1px solid cadetblue;
			}
			.personal {
				height: 20px;
				width: 20px;
				margin-right: 15px;
			}

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
			font-size: 13px;
			span {
				margin-right: 15px;
			}
			.like {
				cursor: pointer;
			}
			.like:hover {
				color: aquamarine;
			}
		}

	}

}
</style>