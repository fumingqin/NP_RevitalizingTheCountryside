<template>
	<view class="content">
		<!-- 顶部提示 -->
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="itemClass mm">
			<text class="fontClass">手机号码</text>
			<text class="fontClass mb">{{phone}}</text>
		</view>
		<view class="itemClass">
			<text class="fontClass">验证码</text>
			<view class="boxClass">
				<input type="number" v-model="captchaCode" maxlength="4" placeholder="请输入验证码" class="inputClass1"/>
				<view class="getcode" @click="getCodeClick">
					{{textCode}}
				</view>
			</view>
		</view>
		<view class="itemClass bb">
			<text class="fontClass">校验码</text>
			<input v-model="checkcode" placeholder="请输入校验码" class="inputClass2"/>
		</view>
		
		<text class="btnClass btn_background" @click="submit">完成</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone:'',				//隐藏手机号
				userInfo:'',			//用户信息
				captchaCode:'',			//验证码
				checkcode:'',			//校验码
				state: true, 			//是否允许点击
				textCode: "获取验证码",  //获取验证码
				
				testPhone:'11145879222', //测试手机号
				testCode:'8879',//测试验证码
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.loadUserInfo();
		},
		methods:{
			//---------------------------返回---------------------------
			back(){
				uni.navigateBack();
			},
			
			//---------------------------加载用户信息---------------------------
			loadUserInfo(){
				this.userInfo = uni.getStorageSync('userInfo') || '';
				if(this.userInfo != null && this.userInfo != ""){
					this.phone = this.userInfo.phoneNumber.substring(0,3)+"****"+this.userInfo.phoneNumber.substring(7,11)
				}else{
					uni.showToast({
						title: '请先登录',
						icon:'none'
					});	
				}
			},

			//---------------------------提交修改---------------------------
			submit(){
				// this.changeDuty();
				if(this.userInfo.phoneNumber == this.testPhone && this.testCode == this.captchaCode){
					this.changeDuty();
				}else{
					uni.getStorage({
						key : 'Code',
						success:res=>{
							console.log(res);
							if(this.captchaCode =="" || this.captchaCode == null){
								uni.showToast({
									title: "请输入验证码",
									icon: "none"
								})
							}else if(this.checkcode =="" || this.checkcode == null){
								uni.showToast({
									title: "请输入校验码",
									icon: "none"
								})
							}
							else if(this.captchaCode == res.data.code){
								this.changeDuty();
							}else{
								uni.showToast({
									title: "验证码输入错误",
									icon: "none"
								})
							}
						},
						fail: err =>{
							uni.showToast({
								title: "验证码已过期",
								icon: "none"
							})
						}
					})
				}
			},
			
			//---------------------------修改职责---------------------------
			changeDuty(){
				uni.showLoading({
					title:'修改中...',
					mask:true,
				})
				uni.request({
					url: this.$GrzxInter.Interface.changeDuty.value,
					method: this.$GrzxInter.Interface.changeDuty.method,
					data: {
						phoneNumber : this.userInfo.phoneNumber,
						checkCode : this.checkcode,
					},
					success: res => {
						console.log(res);
						if(res.data.status){
							// uni.showToast({
							// 	title: '修改成功',
							// });
							this.$refs.uTips.show({
								title: '修改成功',
								type: 'primary',
								duration: '1500'
							})
							uni.removeStorageSync('Code');
							setTimeout(function(){
								uni.navigateBack();
							},1000)
						}else{
							this.$refs.uTips.show({
								title: '修改失败',
								type: 'primary',
								duration: '1500'
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络连接失败',
							icon:'none'
						});
					},
					complete: () => {
						setTimeout(function(){
							uni.hideLoading();
						},800)
					}
				});
			},
			
			//-------------------------------------获取验证码----------------------------------
			getCodeClick() {
				var timer = null, //定时器
					second = 60; //倒计时的时间
				if (this.textCode == "获取验证码" && this.state) {
					this.state = false;
					this.getCode(timer, second, this.userInfo.phoneNumber);
				}
			},
			
			//-------------------------------------获取验证码的请求----------------------------
			getCode(timer, second, phoneNumber) {
				var that = this;
				timer = setInterval(function() {
					second--;
					if (second <= 0) {
						that.textCode = "获取验证码";
						clearInterval(timer);
						second = 60;
						that.state = true;
					} else {
						that.textCode = second + "秒后重发";
					}
				}, 1000)
				uni.request({
					url: that.$GrzxInter.Interface.getLoginCode.value,
					data: {
						phoneNumber: phoneNumber,
					},
					method: that.$GrzxInter.Interface.getLoginCode.method,
					success: (res) => {
						console.log(res, "340");
						console.log(res.data.data);
						if (res.data.status == false) { //发送验证码次数上限
							that.state = true;
							that.textCode = "获取验证码";
							clearInterval(timer);
							uni.showToast({
								title: "验证码获取失败!",
								icon: "none"
							})
						} else { //成功发送验证码
							uni.setStorage({
								key: 'Code',
								data: {
									code: res.data.data,
									phone: phoneNumber,
								}
							})
							uni.showToast({
								title: "验证码已发送，仅在5分钟内有效!",
								icon: "none"
							})
							setTimeout(function() {
								uni.removeStorage({
									key: 'Code',
								})
							}, 300000);
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.content{
		display: flex;
		flex-direction: column;
	}
	.mm{
		margin-top: 2upx;
	}
	.itemClass{
		display: flex;
		flex-direction: column;
		border-top:1upx solid #EAEAEA;
		background-color: #ffffff;
		font-size: 32upx;
		.fontClass{
			margin: 30upx 5% 0 5%;
		}
		.mb{
			margin-bottom: 30upx;
		}
		.boxClass{
			display: flex;
			flex-direction: row;
			margin: 30upx 5% 30upx 5%;
		}
		.inputClass1{
			
		}
		.getcode{
			margin-left: 20%;
		}
		.inputClass2{
			margin: 30upx 5%  30upx 5%;
		}
	}
	.bb{
		border-bottom:1upx solid #EAEAEA;
	}
	
	.btnClass{
		position: fixed;
		bottom: 20upx;
		left: 5%;
		width: 90%;
		padding: 20upx 0;
		color: #FFFFFF;
		text-align: center;
		border-radius: 15upx;
		font-size: 34upx;
	}	
</style>
