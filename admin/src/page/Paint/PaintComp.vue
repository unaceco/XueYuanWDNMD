<template>
	<div class="paintComp">
		<img :src="paint.paintUrl" alt="">

		<div class="info">
			<div>标题: {{paint.title}}</div>
			<div>作者: {{paint.user.nickname}}</div>
			<div>是否私密: {{paint.personal == 0 ? '不私密' : '私密'}}</div>
		</div>

		<div class="options">
			操作: <i class="el-icon-delete" @click="deletePaintById"></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		paint: Object
	},
	data () {
		return {
		};
	},
	methods: {
		deletePaintById() {
			this.$emit('deletePaintById', this.paint.paintId)
		}
	}
}
</script>

<style lang="scss" scoped>
.paintComp {
	display: flex;
	flex-direction: column;
	width: 150px;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	padding: 15px;
	margin: 10px;
		
	img {
		height: 150px;
		width: 150px;
	}

	.info {
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	.options {
		display: flex;
		align-items: center;

	}

}
</style>