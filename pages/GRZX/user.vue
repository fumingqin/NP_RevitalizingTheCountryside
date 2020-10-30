<template>
	<view>
		<view class="container u-skeleton" @click="checkLogin">
			<view class="userinfo">
				<block>
					<image class="userinfo-avatar u-skeleton-circle" :src="port ||'/static/GRZX/missing-face.png'"></image>
					<view class="boxClass1">
						<text class="u-skeleton-fillet fontStyle1">{{nickname}}</text>
						<text v-if="nickname != '立即登录'" class="u-skeleton-fillet fontStyle2" :class="duty=='普通用户'?'width':''">{{duty}}</text>
					</view>
				</block>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		
		<view class="myBox">
			<view class="boxClass2">
				<view class="itemclass1" @click="navTo(0)" hover-class="btn_Click">
					<image src="../../static/GRZX/icon/hyjl.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">会议记录</text>
				</view>
				<view class="itemclass2" @click="navTo(1)" hover-class="btn_Click">
					<image src="../../static/GRZX/icon/rygl.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">人员管理</text>
				</view>
				<view class="itemclass3" @click="navTo(2)" hover-class="btn_Click">
					<image src="../../static/GRZX/icon/wdbh.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">我的编号</text>
				</view>
			</view>
		</view>
		<!-- 广告 -->
		<image :src="advert" class="advertClass" lazy-load="true"></image>
		
		<view class="serviceBox">
			<view v-for="(item,index) in serviceList" :key="index" class="serviceBoxClass">
				<view class="itemClass" :class="index!=0?'bt':''" v-if="item.IsUse" hover-class="btn_Click" @click="operateClick(item.ItemTitle)">
					<image :src="item.ImageURL" :class="item.style"></image>
					<text class="fontStyle">{{item.ItemTitle}}</text>
					<button open-type="contact" class="contactClass" v-if="item.ItemTitle=='在线客服'"></button>
					<image src="../../static/GRZX/btnRight.png" class="imgClass"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/GRZX/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data() {
			return {
				duty:'',   //职责
				
				QQ: '32589407', 		//qq客服
				nickname: '', 	//昵称
				port: '', 		//头像
				advert:'../../static/GRZX/icon/advert.png',
				
				userInfo: [], 		//用户信息
				userId: '', 		//用户id
				
				serviceList:[], 	//服务功能模块
				
				loading: true, // 是否显示骨架屏组件
			}
		},
		onLoad() {	
			//加载服务功能模块
			this.loadServiceList();
		},
		onShow() {
			var that = this;
			this.loadData();
		},
		methods: {
			// ---------------------------加载服务功能模块----------------------------
			loadServiceList(){
				this.serviceList=[{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_CKGL.png",
						ItemTitle: "修改职责",
						style:"XGZZicon",
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/icon/kf.png",
						ItemTitle: "QQ客服",
						style:"DHKFicon",
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/icon/yjfk.png",
						ItemTitle: "意见反馈",
						style:"YJFKicon",
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/icon/set.png",
						ItemTitle: "设置",
						style:"SETicon",
					},]
			},
			
			// ---------------------------加载数据----------------------------
			loadData() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(user) {
						var phone = user.data.phoneNumber;
						if (phone != "" && phone != null && user.data != "") {
							uni.request({
								url: that.$GrzxInter.Interface.login.value,
								data: {
									phoneNumber: phone,
								},
								method: that.$GrzxInter.Interface.login.method,
								success(res) {
									console.log(res,'res')
									let data = res.data.data;
									uni.setStorageSync('userInfo', data);
									if (data.userName == "" || data.userName == null) {
										that.nickname="请输入昵称";
									} else {
										that.nickname = data.userName;
									}
									that.port = data.portrait;
									that.userId = data.userId;
									that.duty = data.duty;
								},
								fail(err) {
									console.log(err);
								}
							})
						}
					},
					fail() {
						that.nickname = "立即登录";
						that.port = "";
					},
					complete: () => {
						setTimeout(function(){
							that.loading = false;
						},1500)
					}
				})
			},
			
			//---------------------------跳转页面----------------------------
			navTo(e){
				switch(e) {
					case 0:
						uni.showToast({
							title: '正在开发中...',
							icon:'none'
						});
						break;
					case 1:
						uni.showToast({
							title: '正在开发中...',
							icon:'none'
						});
						break;
					case 2:
						uni.showToast({
							title: '正在开发中...',
							icon:'none'
						});
						break;
					default:
						return '';
				}
			},
			
			// ---------------------------点击操作----------------------------
			operateClick(e){
				switch(e) {
					case '修改职责':
						this.changeDuty();
						break;
					case 'QQ客服':
						this.QQClick();
						break;
					case '意见反馈':
						this.feedbackClick();
						break;
					case '设置':
						uni.navigateTo({
							url: this.$GrzxInter.Route.set.url,
						})
						break;
					default:
						return '';
				}
			},
			
			//------------------------------修改职责-----------------------
			changeDuty(){
				let user = uni.getStorageSync('userInfo');
				if(user.phoneNumber != "" && user.phoneNumber != null){
					uni.navigateTo({
						url:'/pages_GRZX/pages/GRZX/editDuty',
					})
				}else{
					uni.showToast({
						title: '请先登录',
						icon:'none'
					});
				}
			},
			
			//------------------------------意见反馈-----------------------
			feedbackClick() {
				let user = uni.getStorageSync('userInfo');
				if(user.phoneNumber != "" && user.phoneNumber != null){
					uni.navigateTo({
						url: this.$GrzxInter.Route.feedback.url,
					})
				}else{
					uni.showToast({
						title: '请先登录',
						icon:'none'
					});
				}
			},
			
			//----------------------------是否登录--------------------------
			checkLogin() {
				var that = this;
				var user = uni.getStorageSync('userInfo');
				console.log(user,"用户信息");
				if (user.userId == "" || user.userId == null) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
					})
					setTimeout(function() {
						uni.navigateTo({
							url: that.$GrzxInter.Route.userLogin.url,
						})
					}, 500);
				} else {
					uni.navigateTo({
						url: that.$GrzxInter.Route.personal.url,
					})
				}
			},
			
			// ---------------------------电话客服--------------------------
			phoneClick() {
				var that = this;
				uni.makePhoneCall({
					phoneNumber:'15888888888', //仅为示例
				});
			},
			
			// ---------------------------QQ客服--------------------------
			QQClick() {
				// #ifdef APP-PLUS
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.QQ + '&version=1&src_type=web ');
				//#endif
			},
			
			//----------------------判断是否为base64格式-------------------
			isBase64: function(str) {
				if (str === '' || str.trim() === '') {
					return false;
				}
				try {
					return btoa(atob(str)) == str;
				} catch (err) {
					return false;
				}
			},

		}

	}
</script>

<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
	.container {
			padding: 50rpx 60rpx 20rpx 60rpx;
		}
	
		.userinfo {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 95upx;
		}
	
		.userinfo-avatar {
			width: 128rpx;
			height: 128rpx;
			margin: 20rpx;
			border-radius: 50%;
		}
		.boxClass1{
			display: flex;
			flex-direction: column;
		}
		.fontStyle1{
			font-size: 40upx;
			color: #333333;
		}
		.fontStyle2{
			width: 170upx;
			height: 44upx;
			line-height: 44upx;
			text-align: center;
			font-size: 27upx;
			color: #FFFFFF;
			margin-top: 10upx;
			background-color: #333333;
			opacity: 0.3;
			border-radius: 8upx;
		}
		.width{
			width: 145upx;
		}
	
		.lists {
			margin: 10px 0;
		}
		
		.myBox {
			//包括我的收藏，我的订单，我的历史
			width: 93%;
			margin-left: 3.5%;
			margin-top: 10upx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			border-radius: 25upx;
			// box-shadow: 0px 7px 38px 8px rgba(97, 97, 97, 0.1);
			.myClass{
				font-size: 35upx;
				font-weight: bold;
				color: #000000;
				margin-top: 20upx;
				margin-left: 8%;
			}
			.boxClass2{
				display: flex;
				flex-direction: row;
			}
			.itemclass1 {
				width: 33.33%;
				height: 100%;
				display: flex;
				flex-direction: column;
				border-radius: 10upx;
			}
			
			.imgStyle1 {
				width: 61upx;
				height: 59upx;
				margin-top: 31upx;
				margin-left: 36.68%;
			}
			
			.itemclass2 {
				width: 33.33%;
				height: 100%;
				display: flex;
				flex-direction: column;
				border-radius: 10upx;
			}
			
			.imgStyle2 {
				width: 61upx;
				height: 62upx;
				margin-top: 28upx;
				margin-left: 36.68%;
			}
			
			.itemclass3 {
				width: 33.34%;
				height: 100%;
				display: flex;
				flex-direction: column;
				border-radius: 10upx;
			}
			
			.imgStyle3 {
				width: 61upx;
				height: 59upx;
				margin-top: 31upx;
				margin-left: 36.68%;
			}
			
			.myFont {
				//文字的样式
				color: #2C2D2D;
				height: 27upx;
				line-height: 27upx;
				font-size: 28upx;
				font-family: SourceHanSansSC-Regular;
				margin-top: 22upx;
				text-align: center;
				padding-bottom: 60upx;
			}
		}
		
		.advertClass {
			//广告
			width: 91.47%;
			height: 160upx;
			margin-top: 25upx;
			margin-left: 4.27%;
			border-radius: 12upx;
		}
		
		.serviceBox {
			width: 94%;
			margin-left: 3%;
			margin-top: 20upx;
			background-color: #FFFFFF;
			// box-shadow: 0px 7px 38px 8px rgba(97, 97, 97, 0.1);
			border-radius: 20upx;
			.bt{
				border-top: 1upx solid #EAEAEA;
			}
			.serviceBoxClass{
				display: flex;
				flex-direction: column;
				width: 94%;
				margin-left: 3%;
			}
			.itemClass{
				display: flex;
				flex-direction: row;
				height: 115upx;
				position: relative;
			}
			.XGZZicon{
				width: 40upx;
				height: 39upx;
				margin: 40upx 20upx;
			}
			.DHKFicon{
				width: 40upx;
				height: 40upx;
				margin: 37upx 20upx;
			} 
			.YJFKicon{
				width: 35upx;
				height: 42upx;
				margin: 37upx 20upx;
			}
			.SETicon{
				width: 38upx;
				height: 38upx;
				margin: 40upx 20upx;
			}
			.fontStyle{
				color: #2C2D2D;
				font-size: 30upx;
				font-weight: 400;
				line-height: 115upx;
			}
			.imgClass{
				width: 45upx;
				height: 45upx;
				position: absolute;
				top: 38upx;
				left: 93%;
			}
		}
		
		//弹窗
		.popup_overlay {
			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background-color: black;
			z-index: 1001;
			-moz-opacity: 0.8;
			opacity: .80;
			filter: alpha(opacity=88);
		}
		
		.popup_content {
			position: fixed;
			top: 50%;
			left: 50%;
			width: 520upx;
			height: 400upx;
			margin-left: -270upx;
			margin-top: -270upx;
			border: 10px solid white;
			background-color: white;
			z-index: 1002;
			overflow: auto;
			border-radius: 20upx;
		}
		
		.popup_title {
			padding-top: 20upx;
			width: 480upx;
			text-align: center;
			font-size: 32upx;
		}
		
		.popup_textarea_item {
			padding-top: 5upx;
			height: 240upx;
			width: 440upx;
			// background-color: #F1F1F1;
			margin-top: 30upx;
			margin-left: 20upx;
		}
		
		.popup_textarea {
			width: 410upx;
			font-size: 26upx;
			margin-left: 20upx;
		}
		
		.popup_button {
			color: white;
			background-color: #4399FC;
			border-radius: 20upx;
			margin-top: 83upx;
			margin-left: 5%;
		}
		
		.inputClass {
			height: 40upx;
			line-height: 40upx;
			font-size: 32upx;
			margin-top: 50upx;
			margin-left: 8%;
		}
		
		.contactClass {
			position: absolute;
			width: 100%;
			height: 100upx;
			opacity: 0;
		}
		
	.setClass {
		//设置按钮
		width: 47upx;
		height: 45upx;
		position: absolute;
		left: 5.67%;
		top: 85upx;
		z-index: 999999999;
	}
</style>
