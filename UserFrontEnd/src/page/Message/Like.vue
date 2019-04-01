<template>
	<div class="likeTmp">
		<div class="avatar">
			<img :src="info.like_from_user.avatar" alt="">
		</div>
		<div class="content">
			{{info.like_from_user.nickname}} 
			赞了你的
			<span v-if="info.article">文章 - <span class="redirect" @click="redirectToArticle(info.article_id)">{{info.article.title}}</span></span>
			<span v-else>图片 - <span class="redirect" @click="redirectToPaint(info.paint_id)">{{info.paint.title}}</span></span>
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
	methods: {
		redirectToArticle(articleId) {
			this.$router.push('/article/' + articleId)
		},
		redirectToPaint(paintId) {
			this.$router.push('/paint/' + paintId)			
		}
	}
}
</script>

<style lang="scss" scoped>
.likeTmp {
	padding: 25px;
	display: flex;
	align-items: center;

	.avatar, .avatar img {
		height: 30px;
		width: 30px;
	}
	.content {
		margin-left: 15px;

		.redirect {
			cursor: pointer;
		}
		.redirect:hover {
			color: tomato;
		}
	}

}
</style>