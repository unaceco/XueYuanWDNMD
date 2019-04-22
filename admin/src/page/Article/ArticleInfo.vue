<template>
	<div>
			<h3>{{article.title}}</h3>
			<div id="quill-container" class="ql-container ql-snow">
				<div class="contentBlock ql-editor" data-gramm="false" contenteditable="false" v-html="article.content">
				</div>
			</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			article: {},
			articleId: '',
		};
	},
	async created () {
		this.getId()
		await this.getArticleInfo()
	},
	methods: {
		getId() {
			this.articleId = this.$route.params.articleid
		},
		async getArticleInfo() {
			const result = await this.$request('/api/article/articleId', 'POST', {
				articleId: this.articleId
			})
			if (result.success) {
				this.article = result.data
			}
		}
	}
}
</script>

<style lang="scss" scoped>
h3 {
	text-align: center;
}

</style>