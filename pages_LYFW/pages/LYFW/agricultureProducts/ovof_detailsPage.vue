<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="rotationChart" :height="422" indicator-pos="bottomRight" name="ImageURL">
			<u-loading slot="loading"></u-loading>
			<view slot="error" style="font-size: 24rpx;">加载失败</view>
		</u-swiper>
		
		<view class="ovof_dp_background">
			<view class="ovof_dp_bg_background">
				<view class="ovof_dp_bg_title">{{title}}</view>
				<view class="ovof_dp_bg_time">
					<text class="time">{{time}}</text>
					<text class="browse">浏览量:</text>
					<u-count-to font-size="30rpx" color="#888" :start-val="0" :end-val="browse"></u-count-to>
				</view>
				<view class="grClass">
					<image class="txImage" src="../../../static/LYFW/agricultureProducts/touxiang.png" mode="aspectFill"></image>
					<view class="grView">
						<view class="name">{{name}}</view>
						<text class="number">{{post}}</text>
					</view>
				</view>
			</view>
			
			<view class="u-content">
				
				<!-- 顶部滑动 -->
				<view class="screen">
					<view class="screenView">
						<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
							项目介绍
						</view>
						<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
							相关文件
						</view>
					</view>
				</view>
				
				<u-read-more v-if="type==0" :toggle="toggle" :show-height="showHeight">
					<u-parse :html="content" :tag-style="style" :lazy-load="true" :show-with-animation="true"></u-parse>
				</u-read-more>
				
				<u-read-more v-if="type==1" :toggle="toggle" :show-height="showHeight">
					<u-parse :html="content" :tag-style="style" :lazy-load="true" :show-with-animation="true"></u-parse>
				</u-read-more>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: ['', ''], //轮播图
				title:'农田基础建设项目',
				time:'2020-02-10',
				browse:'122',
				showHeight:600,
				toggle: false,
				name:'张三丰',
				post:'市级职责人员',
				type: 0,
				// 字符串的形式
				style: {
					p: 'letter-spacing: 4rpx;text-align: justify;line-height: 48rpx;font-size:30rpx;text-justify: inter-ideograph; text-indent: 2em;padding-bottom: 20rpx;padding-top: 20rpx;',
					span: 'font-size: 30rpx'
				},
				content:'<p>露从今夜白，月是故乡明,露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明</p><img src="https://cdn.uviewui.com/uview/swiper/2.jpg" /><p>露从今夜白，月是故乡明,露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明</p><img src="https://cdn.uviewui.com/uview/swiper/2.jpg" /><p>露从今夜白，月是故乡明,露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明</p><img src="https://cdn.uviewui.com/uview/swiper/2.jpg" /><p>露从今夜白，月是故乡明,露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明露从今夜白，月是故乡明</p><img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />'
			}
		},
		
		onLoad:function() {
			this.loadData();
		},
		
		methods: {
			//加载数据
			loadData: function() {
				uni.request({
					url: this.$home.KyInterface.GetRotationChart.Url,
					method: this.$home.KyInterface.GetRotationChart.method,
					success: (res) => {
						console.log('轮播区', res)
						this.rotationChart = res.data.data.filter(item => {
							return item.Type == '首页轮播图';
						})
						// console.log(this.rotationChart)
					},
					fail: function() {
						uni.showToast({
							title: '首页轮播图网络加载异常',
							icon: 'none'
						})
					}
				})
			},
			
			
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				}
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}
	
	.ovof_dp_background{
		position: absolute;
		z-index: 999;
		top: 376upx;
	}
	
	.ovof_dp_bg_background{
		padding: 30upx;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		width: 100%;
		background: #FFFFFF;
	}
	
	.ovof_dp_bg_title{
		color: #333333;
		font-size: 40upx;
		font-weight: bold;
		padding-top: 20rpx;
	}
	
	.ovof_dp_bg_time{
		display: flex;
		margin-top: 20upx;
		
		.time{
			font-size: 30upx;
			color: #888;
		}
		
		.browse{
			padding-left: 20upx;
			font-size: 30upx;
			color: #888;
		}
	}
	
	.u-content{
		margin-top: 20upx;
		background: #FFFFFF;
		padding-left: 15upx;
		padding-right: 15upx;
	}
	
	.grClass {
		position: relative;
		display: flex;
		margin-top: 40upx;
		
		// padding-right: 40upx;
		.txImage {
			border-radius: 50%;
			width: 88upx;
			height: 88upx;
		}
	
		.grView {
			margin-left: 25upx;
			.name {
				display: flex;
				font-size: 32upx;
				color: #333333;
	
				.ladelView {
					border-radius: 5px;
					margin-left: 11upx;
					font-size: 20upx;
					color: #FFFFFF;
					text-align: center;
					width: 80upx;
					height: 35upx;
					line-height: 32upx;
					margin-top: 5upx;
				}
			}
	
			.number {
				display: block;
				font-size: 28upx;
				color: #aba9aa;
				padding-top: 10upx;
			}
		}
	
		.address {
			position: absolute;
			font-size: 32upx;
			color: #333333;
			right: 0;
			top: 16upx;
		}
	}
	
	
	//筛选样式
	.screen {
		height: 87upx;
		position: sticky;
		top: 0;
		z-index: 1;

		.screenView {
			left: 0;
			display: flex;
			width: 50%;
			height: 87upx;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #888;
				position: relative;



				&.current {
					color: #70c778;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 104upx;
						height: 0;
						border-bottom: 4upx solid #70c778;
					}
				}
			}
		}
	}
</style>
