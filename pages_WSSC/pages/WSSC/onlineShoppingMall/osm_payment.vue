<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">38.88</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon jdticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#22C704" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<!-- <view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				payType: 1,
				orderInfo: '',
				userInfo:'',
			};
		},
		computed: {
		
		},
		onLoad(options) {
			this.userData();
		},

		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						// console.log('获取个人信息', this.userInfo)
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title:'您暂未登录，已为您跳转登录页面',
							icon:'none',
							success: () => {
								uni.navigateTo({
									url : '../../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm:function() {
				uni.showLoading({
					title: '拉起支付中...'
				})
				var that=this;
				console.log(this.userInfo.userId)
				console.log(this.userInfo.userName)
				console.log(this.userInfo.phoneNumber)
				uni.request({
					url: this.$wssc.KyInterface.placeOrder.Url,
					method: this.$wssc.KyInterface.placeOrder.method,
					data:{
						userId:this.userInfo.userId,
						productId:9,
						quantity:1,
						totalAmount:0.01,
						nickName:this.userInfo.userName,
						phoneNumber:this.userInfo.phoneNumber
					},
					success: (res) => {
						if (res.data.status == true) {
							uni.hideLoading()
							this.orderInfo=res.data.data;
							console.log('支付拉取成功', res)
							console.log('1111', res.data.data)
							console.log('1', res.data.data.AppId)
							console.log('2', res.data.data.Noncestr)
							console.log('3', res.data.data.PartnerId)
							console.log('4', res.data.data.PrepayId)
							console.log('5', res.data.data.Timestamp)
							console.log('6', res.data.data.Sign)
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: {
									appid:res.data.data.AppId,
									noncestr:res.data.data.Noncestr,
									package: 'Sign=WXPay',
									partnerid:res.data.data.PartnerId,
									prepayid:res.data.data.PrepayId,
									timestamp:res.data.data.Timestamp,
									sign:res.data.data.Sign,
								},
								success: function(res) {
									console.log(res)
									if(res.errMsg == 'requestPayment:ok'){
										uni.request({
											url: that.$wssc.KyInterface.checkOrderState.Url,
											method: that.$wssc.KyInterface.checkOrderState.method,
											data: {
												orderNumber: that.orderInfo.BillNO
											},
											success: function(res) {
												console.log(res)
												if (res.data.status == true) {
													uni.redirectTo({
														url: 'osm_orderList'
													})
												} else {
													uni.showToast({
														title: '购买失败',
														icon: 'none',
														duration: 3000
													})
												}
											},
											fail: function() {
												uni.showToast({
													title: '购买失败',
													icon: 'none',
													duration: 3000
												})
											}
										})
									}
								},
												
								fail: function(e) {
									console.log(e)
									if (e.errMsg == 'requestPayment:fail canceled') {
										uni.showToast({
											title: '您放弃了支付',
											icon: 'none',
											duration: 3000
										})
									} else if (e.errMsg == 'requestPayment:fail errors') {
										uni.showToast({
											title: '支付失败，请重试',
											icon: 'none',
											duration: 3000
										})
									} else {
										uni.showToast({
											title: '网络异常，请检查网络后重试',
											icon: 'none',
											duration: 3000
										})
									}
												
								}
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '支付异常',
							icon: 'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.app {
		width: 100%;
	}
	
	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;
	
		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}
	
	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: 32upx;
			color: #303133;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24upx;
			color: #909399;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: 32upx;
		color: #fff;
		background: #22C704;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(34, 199, 4, 0.4);
	}
	
</style>
