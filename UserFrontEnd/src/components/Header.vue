<template>
	<div class="header">
		<div class="main">
			<!-- logo -->
			<div class="logo">
				<img class="logoImg" src="../assets/logo.png" alt="">
			</div>
			<!-- menu -->
			<div class="menuDiv">
				<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
					<el-menu-item index="/"><i class="el-icon-document"></i>广场</el-menu-item>
					<el-menu-item index="/message"><i class="el-icon-message"></i>消息</el-menu-item>
				</el-menu>
			</div>
			<!-- search -->
			<div class="searchDiv">
				<el-input v-model="search" placeholder="请输入内容"  suffix-icon="el-icon-search"></el-input>
			</div>
			<!-- 登录 注册 -->
			<div class="signDiv" v-if="!userInfo">
				<div class="login" @click="loginDialog = true">
					登录
				</div>
				<div class="regist">
					注册
				</div>
			</div>
			<!-- 已登录 -->
			<div class="signDiv" v-else>
				<img @click="redirectPersonalPage" class="avatar" src="https://admin-manage.oss-cn-hangzhou.aliyuncs.com/img/13nhnzsl3m.png" alt="">
			</div>
			<!-- options -->
			<div class="optionsDiv">
				<div class="paint">
					绘画
				</div>
				<div class="write">
					写文章
				</div>
			</div>
		</div>

		<!-- login dialog -->
		<el-dialog title="登录" :visible.sync="loginDialog" :append-to-body="true">
			<el-form :model="loginForm">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="loginForm.account" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="loginForm.password" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="loginDialog = false">取 消</el-button>
				<el-button type="primary" @click="login">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
export default {
	data () {
		return {
			search: '',
			loginDialog: false,
			loginForm: {
				account: '',
				password: ''
			},
			formLabelWidth: '80px',
			userInfo: null
		};
	},
	methods: {
		login() {
			this.userInfo = 'xxx'
			this.loginDialog = false
		},
		redirectPersonalPage() {
			this.$router.push('/personal')
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	background-color: #fff;
	height: 60px;
	width: 100%;
	box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;


	.main {
		width: 1000px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 20px;
		margin: 0 auto;

		.logo {
			height: 50px;
			width: 50px;
			.logoImg {
				height: 50px;
				width: 50px;
			}
		}
		
		.signDiv {
			display: flex;

			.login, .regist {
				cursor: pointer;
				font-size: 14px;
				text-align: center;
				line-height: 30px;
				height: 30px;
				width: 60px;
				border-radius: 15px;
				border: 1px solid rgb(255, 59, 59);
				color: rgb(255, 59, 59);
				margin-left: 15px;
			}

			.avatar {
				height: 50px;
				width: 50px;
				border-radius: 25px;
				cursor: pointer;
			}
			.avatar:hover {
				border: 1px solid #000;
			}
		}

		.optionsDiv {
			display: flex;

			.paint, .write {
				cursor: pointer;
				font-size: 14px;
				text-align: center;
				line-height: 30px;
				height: 30px;
				width: 60px;
				border-radius: 15px;
				background-color: rgb(255, 59, 59);
				color: #fff;
				margin-left: 15px;
			}
		}
	}
}
</style>