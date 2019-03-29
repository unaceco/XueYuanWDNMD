<template>
	<div class="paint">
		<div class="paintImg">
			<img @click="redirect" :src="info.paintUrl" alt="">
			<div class="lock" v-if="info.personal == 1">
				<img src="../assets/personal.png" alt="">
			</div>
		</div>
		<div class="options">
			<span>作者: {{info.user.nickname}}</span>
			<div>
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
			this.$router.push('/paint/'+this.info.paintId)
		},
		async changeLikeStatus() {
			if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
				return false
			}
			const result = await this.$request.post('/api/like', {
				from_user_id: JSON.parse(sessionStorage.getItem('userInfo')).id, 
				to_user_id: this.info.user.id, 
				type: 2, 
				info_id: this.info.paintId
			})
			if (result.data.success) {
				this.$emit('reloadData')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.paint {
	height: 260px;
	width: 200px;
	margin: 25px;

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
		display: flex;
		flex-direction: column;
		margin-left: 5px;
		line-height: 30px;
		height: 30px;
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
</style>