<template>
	<div class="publishPaint">
		<div class="baseInfo">
			<el-input style="width: 30%" v-model="title" placeholder="请输入内容"></el-input>
			<el-button type="primary" @click="publish">发布</el-button>
			<el-checkbox v-model="isPersonal">私密</el-checkbox>
		</div>
		<div class="uploadImg">
			<Upload 
				v-on:getImgUrl="getImgUrl"
			/>
		</div>
	</div>
</template>

<script>
import Upload from '../../components/Upload'

export default {
	components: {
		Upload
	},
	data () {
		return {
			title: '',
			publishImg: '',
			isPersonal: false,
		};
	},
	methods: {
		// 获取上传到oss的图片链接
		getImgUrl(imgUrl) {
			this.publishImg = imgUrl
		},
		// publish
		async publish() {
			if (this.title == '' || this.paintUrl == '') {
				this.$message.error('不能为空')
				return 
			}
			const result = await this.$request.post('/api/paint/push', {
				title: this.title, 
				paintUrl: this.publishImg, 
				personal: this.isPersonal ? 1 : 0, 
				user_id: JSON.parse(sessionStorage.getItem('userInfo')).id
			})
			if (result.data.success) {
				this.$message.success('发表成功')
				this.$router.push('/')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.publishPaint {
	margin: 50px auto;
	width: 750px;
	padding: 25px;
	border: 1px solid #e5e5e5;

	.baseInfo {
		display: flex;
		align-items: center;

		.el-button, .el-checkbox {
			margin-left: 15px;
		}

	}

	.uploadImg {
		margin-top: 20px;
	}
}
</style>