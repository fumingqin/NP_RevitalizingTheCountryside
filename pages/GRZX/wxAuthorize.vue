<template>
	<view class="all">
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view class="box">
				<view class="boxClass1">
					<image src='../../static/GRZX/wxAuthorize1.png' class="imgClass"></image>
					<text class="fontClass">授权微信</text>
				</view>
				<view class="bt"></view>
				<view class="boxClass2">
					<image src='../../static/GRZX/wxAuthorize2.png' class="imgClass" style="margin-left: 9px;"></image>
					<text class="fontClass">授权手机号</text>
				</view>
				<view class="bt"></view>
				<view class="boxClass3">
					<image src='../../static/GRZX/wxAuthorize3.png' class="imgClass"></image>
					<text class="fontClass">登录成功</text>
				</view>
			</view>
			<view v-if="!bindState">
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权微信
				</button>
			</view>	
			<view v-if="bindState">
				<button open-type="getPhoneNumber" type='primary' class='bottom' @getphonenumber="getPhoneNumber">绑定手机号</button> 
			</view>
			<view>
				<button type='warn' class='returnClass' @click="returnClick">返回首页</button> 
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
export default{
	data(){
		return{
			SessionKey: '',
			OpenId: '',
			nickName: null,
			avatarUrl: null,
			bindState:false,
			sessionKey:'',
			openId_xcx:'',
			userInfo:[],
			type:'',
		}
	},
	onLoad(options){
		this.type=options.type;
		var isCanUse=uni.getStorageSync('isCanUse');
		if(isCanUse){
			this.wxGetUserInfo();
		}
	},
	methods:{
		wxGetUserInfo() {
			uni.showLoading({
				title:'登录中...'
			})
			let that = this;
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					console.log(infoRes,'49')
					that.userInfo=infoRes.userInfo;
					uni.setStorageSync('isCanUse', true);//记录是否第一次授权  false:表示不是第一次授权
					uni.login({
						success(res2){
							console.log(res2,'res2')
							that.getOpenID(res2.code)
						}
					})			
				},
				fail(res) {
					uni.showToast({
						title:'登录授权失败',
						icon:'none',
					})
				}
			});
		},
		getOpenID:function(code){
			var that = this;
			console.log("访问地址",that.$GrzxInter.Interface.GetUserInfoByOpenId.value)
			console.log("应用名称",that.$GrzxInter.systemConfig.appName)
			console.log("应用类型",that.$GrzxInter.systemConfig.openidtype)
			uni.request({
				url:that.$GrzxInter.Interface.GetOpenId_xcx.value,
				method: that.$GrzxInter.Interface.GetOpenId_xcx.method,
				data:{
					code:code,
					systemname:that.$GrzxInter.systemConfig.appName,//应用名称
					openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
				},
				success(logRes){
					console.log(logRes,'logRes')
					if(logRes.data.status){
						uni.setStorageSync('scenicSpotOpenId',logRes.data.data.openid)
						var openid=logRes.data.data.openid;
						that.sessionKey=logRes.data.data.session_key;
						that.openId_xcx=logRes.data.data.openid;
						uni.request({
							url: that.$GrzxInter.Interface.GetUserInfoByOpenId.value,
							data:{
								openid:openid,
								systemname:that.$GrzxInter.systemConfig.appName,//应用名称
								openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
							},
							method:that.$GrzxInter.Interface.GetUserInfoByOpenId.method,
							success(res){
								setTimeout(function(){
									uni.hideLoading();
								},1000);
								console.log(res,"提示什么？");
								if(!res.data.status || res.data.data.PhoneNumber=="" || res.data.data.PhoneNumber==null){
									if(that.type=="index"){
										uni.showToast({
											title:'授权成功！',
											icon:'success',
										})
										uni.navigateBack();
									}else{
										that.bindState=true;
									}
								}else{
									var data = res.data.data;
									var user = new Object();
									user = {
										address : data.Address,
										autograph : data.Autograph,
										birthday : data.Birthday,
										gender : data.Gender,
										openId_app : data.OpenId_app,
										openId_ios : data.OpenId_ios,
										openId_qq : data.OpenId_qq,
										openId_wx : data.OpenId_wx,
										openId_xcx : data.OpenId_xcx,
										phoneNumber : data.PhoneNumber,
										portrait : data.Portrait,
										userId : data.UserId,
										nickname : data.Nickname,
									};
									uni.setStorageSync('userInfo', user);
									uni.showToast({
										title:'登录成功！',
										icon:'success',
									})
									setTimeout(function(){
										uni.navigateBack();
									},500);
								}	
							}
						})
					}else{
						uni.showToast({
							title: logRes.data.msg,
							icon:'none',
						});
					}
					
				},
				fail(res) {
					console.log('请求错误',res)
				}
			})
		},
		
		//获取appid
		getPhoneNumber(e) {
			uni.request({
				url: this.$GrzxInter.Interface.Get_AppSetting.value +
				'?systemname='+this.$GrzxInter.systemConfig.appName,//应用名称,
				method: this.$GrzxInter.Interface.Get_AppSetting.method,
				success: res => {
					if(res.data.status){
						var WXBizDataCrypt = require('@/common/WXBizDataCrypt')
						var encryptedData =e.detail.encryptedData;
						var iv = e.detail.iv;
						var pc = new WXBizDataCrypt(res.data.data.Appid, this.sessionKey)
						var data = pc.decryptData(encryptedData , iv)
						console.log("获取微信手机号",data.purePhoneNumber);
						this.bindPhoneNumber(data.purePhoneNumber);
					}
				},
				fail: () => {
					uni.showToast({
						title: '获取appid失败',
						icon:'none',
					});
				},
			});
		},
		
		//绑定手机号
		bindPhoneNumber(PhoneNumber) {  
			var that=this;
			uni.request({
				url:that.$GrzxInter.Interface.login.value,
				data:{
					phoneNumber:PhoneNumber,
					systemname:that.$GrzxInter.systemConfig.appName,//应用名称
					openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
				},
				method:that.$GrzxInter.Interface.login.method,
				success(res1){
					console.log('res1', res1)
					if(!res1.data.status){
						uni.showToast({
							title:'绑定手机号失败，请重试！',
							icon:'none'
						})
					}else{
						console.log("访问地址",that.$GrzxInter.Interface.changeInfo.value)
						console.log("电话",res1.data.data.userId)
						console.log("应用名称",that.$GrzxInter.systemConfig.appName)
						console.log("应用类型",that.$GrzxInter.systemConfig.openidtype)
						uni.request({
							url:that.$GrzxInter.Interface.changeInfo.value,
							data:{
								userId:res1.data.data.UserId,
								phoneNumber:PhoneNumber,
								nickname:that.userInfo.nickName,
								address:that.userInfo.province+that.userInfo.city,
								openId_wx:res1.data.data.OpenId_wx,
								gender:that.userInfo.gender,
								openId:that.openId_xcx,
								birthday:res1.data.data.Birthday,
								autograph:res1.data.data.Autograph,
								systemname:that.$GrzxInter.systemConfig.appName,//应用名称
								openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
							},
							method:that.$GrzxInter.Interface.changeInfo.method,
							success(res2){
								console.log('修改用户信息', res2)
								uni.request({
									url:that.$GrzxInter.Interface.changeInfoPortrait.value,
									data:{
										userId:res1.data.data.UserId,
										portrait:that.userInfo.avatarUrl,
									},
									method:that.$GrzxInter.Interface.changeInfoPortrait.method,
									success(res3) {
										console.log('修改头像',res3);
										if(res3.data.status){
											uni.showToast({
												title:'绑定成功！',
												icon:'success',
											})
											let data = res3.data.data;
											uni.setStorageSync('userInfo', data);
											setTimeout(function(){
												uni.navigateBack();
											},500);
										}
									}
								})
							}
						})
					}
				},
				fail() {
					uni.showToast({
						title:'获取手机号失败！',
						icon:'none',
					})
				}
			})
		},
		
		
		returnClick(){
			this.$GrzxInter.navToHome();//返回首页
		}
	}	
}
</script>

<style lang="scss">
	.all{
		width: 100%;
	}	
	.header{
		margin: 200rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}
	
	.header image {
		width: 150rpx;
		height: 130rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 150rpx 50rpx 0rpx 50rpx;
		font-size: 35rpx;
	}
	.returnClass{
		border-radius: 80rpx;
		margin: 100rpx 50rpx 0rpx 50rpx;
		font-size: 35rpx;
	}
	.box{
		width: 100%;
		// height: 100upx;
		// border: 1upx solid red;
		display: flex;
		flex-direction: row;
		margin-top: 350upx;
	}
	.boxClass1{
		width: 120upx;
		margin-left: 10%;
		margin-right: 2%;
		display: flex;
		flex-direction: column;
	}
	.boxClass2{
		width: 150upx;
		// margin-left: 2%;
		display: flex;
		flex-direction: column;
	}
	.boxClass3{
		width: 120upx;
		margin-left: 2%;
		display: flex;
		flex-direction: column;
	}
	.imgClass{
		width: 115upx;
		height: 110upx;
	}
	.fontClass{
		font-size: 28upx;
		text-align: center;
		width: 100%;
		margin-top: 10upx;
	}
	.bt{
		margin-top: 60upx;
		border-top: 4upx solid #E5E5E5;
		width: 14%;
	}
</style>
