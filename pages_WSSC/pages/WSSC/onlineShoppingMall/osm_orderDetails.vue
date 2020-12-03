<template>
	<view>
		<view class="top">
			<view class="topTitle">
				<text class="text">请检查订单</text>
			</view>
			<view class="topTitle2">
				<image class="image" src="../../../../static/WSSC/xiangzi.png" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="content">
			<!-- 店名 -->
			<!-- <view class="shopName">
				<u-icon name="home" size="28"></u-icon>
				<text class="text">不知道什么店名</text>
			</view> -->
			
			<!-- 商品详情 -->
			<view class="commodity">
				<view>
					<image class="image" :src="details.image" mode="aspectFill"></image>
				</view>
				<view style="position: relative;width: 100%;">
					<view class="text">{{details.title}}</view>
					<view class="label">
						<view class="text" style="display: flex;" v-for="(item,index) in label" :key="index">
							<text class="circle"></text>
							{{item}}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 商品参数 -->
			<view class="parameter">
				<text class="Specifications">规格：{{details.saleUnit}}/{{details.price2}}元</text>
				<view class="priceNumber">
					<text class="price">￥{{details.price2}}</text>
					<text class="number">X{{details.number}}</text>
				</view>
				
				<view class="priceNumber">
					<text class="price"></text>
					<text class="number" style="color: #E3424B;font-weight: bold;">总计：{{details.price}}元</text>
				</view>
			</view>
		</view>
		
		<!-- 提交订单栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
			</view>
			<view class="right">
				<view class="button">
					<text class="buy btn u-line-1" @click="buyNowJump">确认付款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:'',
				label: ['诚信商家', '假一赔十', '包邮', ],
			}
		},
		
		onLoad() {
			this.userData();
		},
		
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						this.detailsData();
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
			
			detailsData:function(){
				uni.getStorage({
					key: 'detailsData',
					success: (res) => {
						console.log(res)
						this.details=res.data;
					},
					fail: () => {
						uni.showToast({
							title:'未读取到缓存',
							icon:'none',
						})
					}
				})
			},
			
			buyNowJump:function(){
				uni.navigateTo({
					url : 'osm_payment'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
	}
	
	.top{
		position: relative;
		display: flex;
		width: 100%;
		height: 200upx;
		background: #22C704;
		
		.topTitle{
			width: 50%;
			text-align: left;
			padding-left: 40upx;
			padding-top: 78upx;
			
			.text{
				font-size: 38upx;
				font-weight: bold;
				color: #FFFFFF;
				
			}
		}
		
		.topTitle2{
			width: 50%;
			text-align: right;
			padding-right: 40upx;
			padding-top: 24upx;
			
			.image{
				width: 128upx;
				height: 150upx;
			}
		}
	}
	
	.content{
		padding: 20upx;
		background: #FFFFFF;
		
		.shopName{
			
			.text{
				font-weight: bold;
				padding-left: 10upx;
			}
		}
		
		.commodity{
			display: flex;
			padding-top: 20upx;
			
			.image{
				width: 180upx;
				height: 180upx;
			}
			
			.text{
				width: 102%;
				padding-left: 20upx;
			}
			
			.label {
				display: flex;
				position: absolute;
				bottom: 0;
				width: 100%;
			
				.text {
					font-size: 28upx;
					color: #333333;
					
					.circle {
						width: 8upx;
						height: 8upx;
						background: #22C704;
						border-radius: 50%;
						margin-top: 18upx;
						margin-right: 10upx;
					}
				}
			}
		}
		
		.parameter{
			margin-top: 20upx;
			background: #f8f8f8;
			padding: 20upx;
			
			.Specifications{
				font-size: 28upx;
			}
			
			.priceNumber{
				position: relative;
				display: flex;
				width: 100%;
				padding-top: 20upx;
				
				.price{
					width: 50%;
					text-align: left;
					font-size: 28upx;
					font-weight: bold;
				}
				
				.number{
					width: 50%;
					text-align: right;
					font-size: 28upx;
				}
			}
		}
	}
	
	//提交订单栏
	.navigation {
		display: flex;
		position: fixed;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		width: 100%;
		bottom:0;
		.left {
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 30rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			position: relative;
			width: 100%;
			
			.button{
				width: 100%;
				text-align: right;
				margin-right: 20upx;
				
				.btn {
					line-height: 66upx;
					padding: 14upx 30upx;
					border-radius: 36upx;
					color: #ffffff;
				}
				.buy {
					background-color: #ed3f14;
				}
			}
		}
	}
</style>
