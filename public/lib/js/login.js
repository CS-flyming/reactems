var apiUrl = 'http://192.168.1.103:8080/'
$(function() {
	var app = new Vue({
		el: '#app',
		data: {
			labelPosition: 'right',
			formLabelAlign: {
				name: '',
				password: '',
				randCode: ''
			},
			rules: {
				name: [{
					required: true,
					message: '请输入账号',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '请输入密码',
					trigger: 'blur'
				}],
				randCode: [{
					required: true,
					message: '请输入验证码',
					trigger: 'blur'
				}]
			}
		},
		methods: {
			onSubmit: function() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						this.ajaxSubmit()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			ajaxSubmit: function() {
				$.ajax({
					url: apiUrl + 'login.do?checkuser',
					data: {
						name: this.formLabelAlign.name,
						password: 'e10adc3949ba59abbe56e057f20f883e'
					},
					success: function(e) {
						if (e.status) {
							$.cookie('usertoken', e.token)
							window.location.href = '/'
						} else {

						}
					}
				})
			}
		}
	})
})