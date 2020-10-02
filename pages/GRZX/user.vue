<template>
	<view>
		<!-- #ifdef APP-PLUS -->
			<image src="../../static/GRZX/set.png" class="setClass" @click="navTo('set')"></image>
		<!-- #endif -->
		
		<view class="container u-skeleton" @click="checkLogin">
			<view class="userinfo">
				<block>
					<!--u-skeleton-circle 绘制圆形-->
					<image class="userinfo-avatar u-skeleton-circle" :src="port ||'/static/GRZX/missing-face.png'"></image>
					<!--u-skeleton-fillet 绘制圆角矩形-->
					<view class="boxClass">
						<text class="u-skeleton-fillet fontStyle1">{{nickname}}</text>
						<text v-if="nickname != '游客'" class="u-skeleton-fillet fontStyle2">普通用户</text>
					</view>
				</block>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		
		<view class="myBox">
			<view class="boxClass">
				<view class="collection" @click="orderClick(3)" hover-class="btn_Click">
					<image src="../../static/GRZX/tubiao_pay1.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">待支付</text>
				</view>
				<view class="order" @click="orderClick(2)" hover-class="btn_Click">
					<image src="../../static/GRZX/tubiao_pay2.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">进行中</text>
				</view>
				<view class="history" @click="orderClick(1)" hover-class="btn_Click">
					<image src="../../static/GRZX/tubiao_pay3.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">已完成</text>
				</view>
			</view>
		</view>
		<!-- 广告 -->
		<image :src="advert" class="advertClass" lazy-load="true"></image>
		
		<view class="serviceBox">
			<view v-for="(item,index) in serviceList" :key="index">
				<view class="itemClass bt" v-if="item.IsUse" hover-class="btn_Click" @click="operateClick(item.ItemTitle)">
					<image :src="item.ImageURL" :class="item.style"></image>
					<text class="fontStyle">{{item.ItemTitle}}</text>
					<button open-type="contact" class="contactClass" v-if="item.ItemTitle=='在线客服'"></button>
					<image src="../../static/GRZX/btnRight.png" class="imgClass"></image>
				</view>
			</view>
		</view>
		
		<!-- 添加紧急联系人弹窗 -->
		<view :hidden="userFeedbackHidden" class="popup_content">
			<view class="popup_title">添加</view>
			<view class="popup_textarea_item">
				<input class="inputClass" v-model="contantPhone" placeholder="输入紧急联系人的手机号码" type="number" maxlength="11" :focus='focusType' />
				<view>
					<button class="popup_button" @click="submit">确定</button>
				</view>
			</view>
		</view>
		<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv"></view>
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
				applyName:'',   //应用名称
				
				QQ: '', 		//qq客服
				nickname: '', 	//昵称
				port: '', 		//头像
				// advert: 'https://appdl.xmjdt.cn:18443/UpLoadImages/广告/advert.png', 	//广告
				advert:'',
				userFeedbackHidden: true,  //是否隐藏弹框
				focusType: false, 		   //是否获取input焦点
				
				userInfo: [], 		//用户信息
				contantPhone: '',	//紧急联系人电话
				userId: '', 		//用户id
				phoneNumber: '', 	//客服电话
				RealNameStatus: '', 	//是否实名--已实名、未实名、认证中
				
				serviceList:[], 	//服务功能模块
				
				loading: true, // 是否显示骨架屏组件
			}
		},
		onLoad() {	
			
			//加载广告图片
			this.loadImg();
			
			//加载服务功能模块
			this.loadServiceList();
		},
		onShow() {
			var that = this;
			this.loadData();
		},
		methods: {
			// ---------------------------加载图片----------------------------
			loadImg() {
				var that = this;
				that.$ChangeImage.GetImage("个人中心","广告").then(function(data) {
					console.log(data,"111");
					that.advert = data;
				});
			},
			
			// ---------------------------加载服务功能模块----------------------------
			loadServiceList(){
				this.serviceList=[{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_CKGL.png",
						ItemTitle: "乘客管理",
						style:"CKGLicon",
					},
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_WDTS.png",
						ItemTitle: "我的投诉",
						style:"WDTSicon",
					},
					//#ifdef H5
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_DHKF.png",
						ItemTitle: "电话客服",
						style:"DHKFicon",
					},
					//#endif
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_YJFK.png",
						ItemTitle: "意见反馈",
						style:"YJFKicon",
					},
					//#ifdef MP-WEIXIN
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_ZXKF.png",
						ItemTitle: "在线客服",
						style:"ZXKFicon",
					},
					//#endif
					//#ifdef APP-PLUS
					{
						IsUse: true,
						clickURL: "",
						ImageURL: "../../static/GRZX/ServiceIcon/tb_QQKF.png",
						ItemTitle: "QQ客服",
						style:"QQKFicon",
					},
					//#endif
					]
			},
			
			// ---------------------------加载数据----------------------------
			loadData() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(user) {
						// console.log(that.$GrzxInter.systemConfig.openidtype,"应用类型")
						var phone = user.data.phoneNumber;
						if (phone != "" && phone != null && user.data != "") {
							console.log("应用名称",that.$GrzxInter.systemConfig.appName);
							console.log("应用类型",that.$GrzxInter.systemConfig.openidtype);
							console.log("手机号",phone);
							uni.request({
								url: that.$GrzxInter.Interface.login.value,
								data: {
									phoneNumber: phone,
									systemname:that.$GrzxInter.systemConfig.appName,//应用名称
									openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
								},
								method: that.$GrzxInter.Interface.login.method,
								success(res) {
									console.log(res,'res')
									let data = res.data.data;
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
									that.userInfo = user;
									if (user.nickname == "" || user.nickname == null) {
										that.nickname="请输入昵称";
									} else {
										that.nickname = user.nickname;
									}
									var base64 = user.portrait;
									if (that.isBase64(base64)) {
										base64ToPath(base64)
										.then(path => {
											that.port = path;
										})
										.catch(error => {												
										})
									} else {
										that.port = base64;
									}
									that.userId = user.userId;
								},
								fail(err) {
									console.log(err);
								}
							})
						}
					},
					fail() {
						that.nickname = "游客";
						that.port = "";
					},
					complete: () => {
						setTimeout(function(){
							that.loading = false;
						},1500)
					}
				})
			},
			
			//-------------------------------------根据id获取实名信息----------------------------------
			checkIDRealName(id) {
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.GetUserByUserID.value,
					data: {
						userID: id,
					},
					method: that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						// console.log('获取实名信息成功',res)
						if (res.data.status == true) {
							switch (res.data.data.RealNameStatus){
								case 0:
									that.RealNameStatus = '未实名';
									break;
								case 1:
									that.RealNameStatus = '已实名';
									break;
								case 2:
									that.RealNameStatus = '未通过';
									break;
								case 3:
									that.RealNameStatus = '认证中';
									break;
								case 4:
									that.RealNameStatus = '资料待完善';
									break;
								default:
									return '';
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
						uni.setStorageSync('RealNameInfo', res.data.data)
					}
				})
			},
			
			// ---------------------------跳转订单的点击-----------------------
			orderClick(e) {
				uni.setStorageSync('currentNum', e)
				this.$GrzxInter.navToOrderList();
			},
			
			// --------------------------设置，通知，扫一扫--------------------
			navTo(e) {
				if (e == 'set') {
					uni.navigateTo({
						url: this.$GrzxInter.Route.set.url,
					})
				}
				if (e == 'myNews') {
					uni.navigateTo({
						url: this.$GrzxInter.Route.myNews.url,
					})
				}
				if (e == 'scan') {
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							void plus.runtime.openWeb(res.result, function() {
								//识别失败
							});
						}
					})
				}
			},
			
			// ---------------------------点击操作----------------------------
			operateClick(e){
				switch(e) {
					case '乘客管理':
						this.infoClick();
						break;
					case '站点拍照':
						this.pictureClick();
						break;
					case '我的投诉':
						this.complaintClick();
						break;
					case '紧急联系人':
						this.addContact();
						break;		
					case '实名认证':
						this.realName();
						break;
					case '更换手机号':
						this.replacePhoneNum();
						break;
					case '电话客服':
						this.phoneClick();
						break;
					case '意见反馈':
						this.feedbackClick();
						break;
					case 'QQ客服':
						this.QQClick();
						break;
					default:
						return '';
				}
			},
			
			// ---------------------------乘客管理----------------------------
			infoClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.infoList.url,
				})
			},
			
			//--------------------添加紧急联系人的电话号码--------------------
			addContact() {
				var that = this;
				that.contantPhone = "";
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						that.userFeedbackHidden = false;
						that.focusType = true;
						that.contantPhone = res.data.autograph;
					},
					fail() {
						uni.showToast({
							title: '请您先登录',
							icon: 'none',
						})
					}
				})
			},
			submit() {
				var that = this;
				console.log(that.contantPhone, "contantPhone")
				var reg = (/^1(3|4|5|6|7|8|9)\d{9}$/);
				if (that.contantPhone == "") {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
					})
				} else if (!that.judgeNum(that.contantPhone) || that.contantPhone.length != 11 || !reg.test(that.contantPhone)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
					})
					// #ifdef H5
					that.userFeedbackHidden = true;
					// #endif
				} else {
					uni.request({
						url: that.$GrzxInter.Interface.AddEmergencyContact.value,
						data: {
							UserId: that.userId,
							Autograph: that.contantPhone,
						},
						method: that.$GrzxInter.Interface.AddEmergencyContact.method,
						success(res) {
							if (res.data.data != "") {
								console.log(res.data.data, '296')
								uni.setStorageSync('userInfo', res.data.data)
							}
							uni.showToast({
								title: '保存成功',
								icon: 'success'
							})
							that.focusType = false;
							that.userFeedbackHidden = true;
						}
					})
				}
			},
			hideDiv() {
				this.focusType = false;
				this.userFeedbackHidden = true;
			},
			
			//------------------------------投诉---------------------------
			complaintClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.complaint.url,
				})
			},
			
			//------------------------------意见反馈-----------------------
			feedbackClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.feedback.url,
				})
			},
			
			//-----------------------------拍照返现------------------------
			pictureClick() {
				uni.navigateTo({
					url: '../../pages_GRZX/pages/GRZX/pictureList',
				})
			},
			
			//----------------------------是否登录--------------------------
			checkLogin() {
				var that = this;
				// ---------------APP,WX--------------
				//#ifndef H5
				var user = uni.getStorageSync('userInfo');
				console.log(user,"用户信息");
				if (user.userId == "" || user.userId == null) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
					})
					// #ifdef APP-PLUS
					setTimeout(function() {
						uni.navigateTo({
							url: that.$GrzxInter.Route.userLogin.url+'?urlData=1',
						})
					}, 500);
					// #endif
					//#ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pages/GRZX/wxAuthorize',
					})
					// #endif
				} else {
					uni.navigateTo({
						url: that.$GrzxInter.Route.personal.url,
					})
				}
				//#endif
				// ---------------H5--------------
				//#ifdef H5
				var user1 = uni.getStorageSync('userInfo')||'';
				console.log(user1, "1111")
				if (user1 == "" || user1 == null || user1.openId_wx == null || user1.openId_wx == "") {
					console.log(user1, "2222")
					uni.showToast({
						title: "请允许公众号授权登录，即将为你跳转至首页",
						icon: 'none'
					})
					setTimeout(function() {
						that.$GrzxInter.navToHome();//返回首页
					}, 500);
				} else {
					uni.navigateTo({
						url: that.$GrzxInter.Route.personal.url,
					})
				}
				//#endif
			},
			
			// ---------------------------收藏--------------------------
			collectionClick() {
				// uni.navigateTo({
				// 	url:'/pages/GRZX/collection'
				// }) 
				uni.showToast({
					title:'暂未开放，敬请期待...',
					icon:'none'
				})
			},
			
			// ---------------------------历史--------------------------
			historyClick() {
				// uni.navigateTo({
				// 	url:'/pages/GRZX/history'
				// }) 
				uni.showToast({
					title:'暂未开放，敬请期待...',
					icon:'none'
				})
			},
			
			// ---------------------------电话客服--------------------------
			phoneClick() {
				var that = this;
				// uni.makePhoneCall({
				// 	phoneNumber: that.phoneNumber, //仅为示例
				// });
				uni.request({
					url:that.$GrzxInter.Interface.SearchCustomerService.value,
					data:{
						region:'泉州',
					},
					method:that.$GrzxInter.Interface.SearchCustomerService.method,
					success(res){
						console.log(res)
						uni.makePhoneCall({
						    phoneNumber: res.data.data.phone, 
						});
					}
				})
			},
			
			// ---------------------------QQ客服--------------------------
			QQClick() {
				// #ifdef APP-PLUS
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.SearchCustomerService.value,
					data: {
						region: '泉州',
					},
					method: that.$GrzxInter.Interface.SearchCustomerService.method,
					success(res) {
						plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + res.data.data.qq + '&version=1&src_type=web ');
					}
				})
				//#endif
			},
			
			// ---------------------------实名认证--------------------------
			realName() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success(res) {
						// that.checkRealName();
					},
					fail() {
						uni.showToast({
							title: '请您先登录',
							icon: 'none',
						})
					}
				})
			},
			
			//-------------------------------------检查是否实名----------------------------------
			checkRealName() {
				var that = this;
				uni.request({
					url: that.$GrzxInter.Interface.GetUserByUserID.value,
					data: {
						userID: that.userId,
					},
					method: that.$GrzxInter.Interface.GetUserByUserID.method,
					success(res) {
						console.log(res)
						if (res.data.data == "" || res.data.data.UserName == "" || res.data.data.UserIDNumber == "") {
							//实名认证
							uni.navigateTo({
								url: that.$GrzxInter.Route.realName.url,
							})
						} else if (res.data.data.RealNameStatus !== 1) {
							//上传图片
							uni.navigateTo({
								url: that.$GrzxInter.Route.uploadPhoto.url,
							})
						} else {
							uni.showToast({
								title: '您已实名',
								icon: 'none',
							})
						}
					}
				})
			},
			
			// ---------------------------更换手机号--------------------------
			replacePhoneNum() {
				uni.showToast({
					title: '暂未开通，敬请期待',
					icon: 'none'
				})
				// uni.navigateTo({
				// 	url:this.$GrzxInter.Route.replacePhoneNum.url,
				// })
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

			//----------------------判断是否为数字-----------------------
			judgeNum: function(val) {
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if (regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			
		}

	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #e3e3e3;
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
		.boxClass{
			display: flex;
			flex-direction: column;
		}
		.fontStyle1{
			font-size: 40upx;
			color: #333333;
		}
		.fontStyle2{
			width: 130upx;
			height: 44upx;
			line-height: 44upx;
			text-align: center;
			font-size: 27upx;
			color: #FFFFFF;
			margin-top: 10upx;
			background-color: #333333;
			opacity: 0.3;
			border-radius: 8Upx;
		}
	
		.lists {
			margin: 10px 0;
		}
		
		.myBox {
			//包括我的收藏，我的订单，我的历史
			width: 93%;
			margin-left: 3.5%;
			margin-top: 10upx;
			// background-color: #FFFFFF;
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
			.boxClass{
				display: flex;
				flex-direction: row;
			}
		}
		
		.collection {
			//我的收藏
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
		
		.order {
			//我的订单
			width: 33.33%;
			height: 100%;
			display: flex;
			flex-direction: column;
			border-radius: 10upx;
		}
		
		.imgStyle2 {
			width: 61upx;
			height: 59upx;
			margin-top: 31upx;
			margin-left: 36.68%;
		}
		
		.history {
			//我的历史
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
		
		.advertClass {
			//广告
			width: 91.47%;
			height: 160upx;
			margin-top: 25upx;
			margin-left: 4.27%;
			border-radius: 12upx;
		}
		
		.serviceBox {
			width: 90%;
			margin-left: 5%;
			margin-top: 20upx;
			display: flex;
			flex-direction: column;
			.bt{
				border-bottom: 1upx solid #EAEAEA;
			}
			.itemClass{
				display: flex;
				flex-direction: row;
				height: 100upx;
				position: relative;
			}
			.CKGLicon{
				width: 40upx;
				height: 39upx;
				margin: 30upx 20upx;
			}
			.WDTSicon{
				width: 35upx;
				height: 40upx;
				margin: 30upx 20upx;
			}
			.DHKFicon{
				width: 35upx;
				height: 40upx;
				margin: 30upx 20upx;
			} 
			.YJFKicon{
				width: 35upx;
				height: 40upx;
				margin: 30upx 20upx;
			}
			.ZXKFicon{
				width: 35upx;
				height: 40upx;
				margin: 30upx 20upx;
			}
			.QQKFicon{
				width: 35upx;
				height: 40upx;
				margin: 30upx 20upx;
			}
			.fontStyle{
				color: #2C2D2D;
				font-size: 30upx;
				font-weight: 400;
				margin-top: 28upx;
			}
			.imgClass{
				width: 45upx;
				height: 45upx;
				position: absolute;
				top: 28upx;
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
