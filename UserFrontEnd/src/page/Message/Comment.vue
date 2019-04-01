<template>
	<div class="comment">
		<div class="avatar">
			<img :src="info.from_user.avatar" alt="">
		</div>
		<div class="name">
			{{info.from_user.nickname}} 评论了<span v-if="info.article">文章 - <span class="redirect" @click="redirectToArticle(info.article_id)">{{info.article ? info.article.title : ''}}</span></span>
			<span v-else>图片 - <span class="redirect" @click="redirectToPaint(info.paint_id)">{{info.paint ? info.paint.title : ''}}</span></span>
		</div>
		<div class="content">
			{{info.content}}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		info: {
			type: Object,
			default: {}
		}
	},
	data () {
		return {
		};
	},
	computed: {

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
.comment {
	display: flex;
	margin: 15px 0;
	align-items: center;

	div {
		margin-right: 15px;
	}

	.avatar, .avatar img {
		height: 50px;
		width: 50px;
	}
	.name {
		line-height: 50px;
		// width: 120px;
		font-size: 15px;

		.redirect {
			cursor: pointer;
		}
		.redirect:hover {
			color: tomato;
		}
	}

	.content {
		width: 500px;
		// line-height: 25px;
		word-wrap:break-word ;

	}

}
</style>