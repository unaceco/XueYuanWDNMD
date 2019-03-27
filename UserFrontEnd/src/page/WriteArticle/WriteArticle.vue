<template>
	<div class="editorModel">
		<el-container>
			<el-header>
				<div class="header">
					<span class="optName">写文章</span>
					<el-checkbox v-model="isPersonal">私密</el-checkbox>
					<span class="otherOpt">
					<el-dropdown>
						<span class="el-dropdown-link">· · ·</span>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/">
								<el-dropdown-item>回到广场</el-dropdown-item>
							</router-link>
						</el-dropdown-menu>
					</el-dropdown>
					</span>
					<span class="optPublish"><el-button @click="publishArticle" type="text">发布</el-button></span>
				</div>
			</el-header>
			<el-main>
				<div class="writeCotent">
					<div class="articleTitle">
						<el-input placeholder="请输入标题" v-model="title" clearable ></el-input>
					</div>
					<vue-editor v-model="content" @imageAdded="handleImageAdded" ></vue-editor>
				</div>
				<div class="showContent">
					<div class="showTitle" v-html="title"></div>
					<!-- <div class="showContent" v-html="content"></div> -->
					<div id="quill-container" class="ql-container ql-snow">
						<div class="contentBlock ql-editor" data-gramm="false" contenteditable="false" v-html="content">
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import {
		VueEditor
	} from 'vue2-editor'

	export default {
		components: {
			VueEditor
		},
		data() {
			return {
				content: '',
				title: '',
				notWrite: false,
				isPersonal: false,
				personal: 0,
				user_id: '',
			};
		},
		created () {
			this.user_id = JSON.parse(sessionStorage.getItem('userInfo')).id
		},
		methods: {
			async publishArticle() {
				if (this.title == '' || this.content == '') {
					this.$message.error("标题或内容不能为空")
				}else {
					const result = await this.$request.post('/api/article/push',{
						title:  this.title,
						content: this.content,
						user_id: this.user_id,
						personal: this.isPersonal ? 1 : 0
					})
					if (result.data.success) {
						this.$message.success(result.data.msg)
						this.$router.push('/')
					}
				}
			},
			handleImageAdded() {
				// var formData = new FormData();
				// formData.append('image', file)
				// axios({
				// 		url: 'https://fakeapi.yoursite.com/images',
				// 		method: 'POST',
				// 		data: formData
				// 	})
				// 	.then((result) => {
				// 		let url = result.data.url // Get url from response
				// 		Editor.insertEmbed(cursorLocation, 'image', url);
				// 		resetUploader();
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.editorModel {
		background-color: #fff;
		width: 100%;
		height: 100%;
		.el-container {
			width: 100%;
			height: 100%;
			.el-header {
				line-height: 59px;
				height: 59px;
				width: 90%;
				margin-left: auto;
				margin-right: auto;
				border-bottom: 1px solid rgba(0, 0, 0, .08);
				span {
					font-size: 20px;
					font-weight: 600;
				}
				.optName {
					float: left;
					margin-right: 25px;
				}
				.saveContent {
					float: left;
					margin-left: 15px;
					color: #8590a6;
					font-size: 18px;
				}
				.otherOpt {
					float: right;
					margin-right: 15px;
					cursor: pointer;
				}
				.optPublish {
					float: right;
					margin-right: 30px;
					.el-button {
						font-size: 20px;
						font-weight: 600;
					}
				}
			}
			.el-main {
				width: 90%;
				margin-left: auto;
				margin-right: auto;
				.writeCotent {
					float: left;
					width: 49%;
					.articleTitle {
						.el-input {
							margin-bottom: 15px;
							width: 100%;
							font-size: 30px;
							font-weight: 600;
						}
					}
					.quillWrapper {
						height: 70%;
					}
				}
				.showContent {
					float: left;
					width: 49%;
					margin-left: 1%;
					.showTitle {
						border: 1px solid #dcdfe6;
						border-radius: 4px;
						font-size: 30px;
						font-weight: 600;
						height: 38px;
						line-height: 38px;
						margin-bottom: 15px;
						padding: 0 15px;
					}
					.contentBlock {
						width: 100%;
						min-height: 281px;
						padding: 12px 15px;
						line-height: 1.42;
					}
				}
			}
		}
	}
</style>