<template>
	<view>
		<!-- 顶部背景 -->
		<view class="ob_background">
			<image src="../../../static/LYFW/scenicSpotTickets/addOrder/orderBackground.png" mode="aspectFill"></image>
		</view>

		<view class="cover-container">
			<image class="okImage" mode="aspectFill" src="../../../static/LYFW/scenicSpotTickets/successfulPayment/ok.png"></image>
			<text class="title">购票成功</text>
			<text class="content">无选择操作，将在10秒后自动返回首页</text>
			<view class="buttonView">
				<view class="orderButton" @click="godetail(0)">查看订单</view>
				<view class="homeButton" @click="godetail(1)">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onReady() {
			this.backHome();
		},
		methods: {
			//路由统一事件
			//页面跳转定时器
			backHome(){
				setTimeout(() => {
					uni.getStorage({
						key:'ticketsGodetailIndex',
						success:function(){
							uni.removeStorage({
								key:'ticketsGodetailIndex'
							})
						},
						fail:function(){
							uni.switchTab({
								url: '../../../../pages/Home/zy_zhcx'
							});
						}
					})
				}, 10000)
				
			},
			
			//路由统一事件
			godetail: function(e) {
				if(e==0){ 
					uni.setStorage({
						key:'ticketsGodetailIndex',
						data:0,
						success:function(){
							uni.switchTab({
								url: '../../../../pages/order/newOrderList'	
							});
						}
					})
					
				}else if(e==1){
					uni.setStorage({
						key:'ticketsGodetailIndex',
						data:1,
						success:function(){
							uni.switchTab({
								url: '../../../../pages/home/h_xczx_home'
							});
						}
					})
					
				}
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40upx;
	}

	//背景图样式
	.ob_background {
		position: absolute;
		width: 100%;
		height: 320upx;

		image {
			width: 100%;
			height: 100%;
		}
	}
	
	
	
	//整体容器样式
	.cover-container {
		position: absolute;
		margin: 0 24upx;
		margin-top: 180upx;
		margin-bottom: 52upx;
		width: 702upx;
		height: 85%;
		background: #FFFFFF;
		box-shadow: 0px 0.2px 0px #aaa;
		border-radius: 16upx;
		text-align: center;

		.okImage {
			width: 136upx;
			height: 116upx;
			margin-top: 35%;
		}

		.title {
			margin: 30upx 0;
			display: block;
			font-size: 48upx;
			font-weight: bold;
		}

		.content {
			display: block;
			font-size: 28upx;
			color: #888;
		}

		.buttonView {
			margin: 0 50upx;
			margin-top: 120upx;
			display: flex;
			text-align: center;
			line-height: 100upx;

			.orderButton {
				width: 280upx;
				height: 104upx;
				font-size: 34upx;
				background: #3EABFC;
				border-radius: 16upx;
				color: #fff;
			}

			.homeButton {
				margin-left: 40upx;
				width: 280upx;
				height: 104upx;
				font-size: 34upx;
				border-radius: 16upx;
				color: #3EABFC;
				border: 1px solid #3EABFC;
			}
		}

	}
	
	/* #ifdef MP-WEIXIN */
	//整体容器样式 -微信版
	.cover-container {
		margin-top: 64upx;
	}
	/* #endif */
</style>
