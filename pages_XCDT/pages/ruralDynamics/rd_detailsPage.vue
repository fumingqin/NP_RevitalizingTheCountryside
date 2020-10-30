<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="groupTitle.image" :height="422" indicator-pos="bottomRight">
			<u-loading slot="loading"></u-loading>
			<view slot="error" style="font-size: 24rpx;">加载失败</view>
		</u-swiper>
		
		<view class="ovof_dp_background">
			<view style="width: 750upx;"></view>
			<view class="ovof_dp_bg_background">
				<view class="ovof_dp_bg_title">{{groupTitle.title}}</view>
				<view class="ovof_dp_bg_time">
					<text class="time">{{groupTitle.update_time}}</text>
					<text class="browse">浏览量:</text>
					<u-count-to font-size="30rpx" color="#888" :start-val="0" :end-val="groupTitle.view"></u-count-to>
				</view>
				<view class="grClass">
					<image v-if="groupTitle.avatar!==''" class="txImage" :src="groupTitle.avatar" mode="aspectFill"></image>
					<image v-if="groupTitle.avatar==''" class="txImage" src="../../../static/GRZX/missing-face.png" mode="aspectFill"></image>
					<view class="grView">
						<view class="name">{{groupTitle.nick_name}}</view>
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
					<u-parse :html="groupTitle.content" :tag-style="style" :lazy-load="true" :show-with-animation="true"></u-parse>
				</u-read-more>
				
				<u-read-more v-if="type==1" :toggle="toggle" :show-height="showHeight">
					<u-parse :html="groupTitle.content" :tag-style="style" :lazy-load="true" :show-with-animation="true"></u-parse>
				</u-read-more>
				
				<!-- <view>
					<video id="myVideo" :src="groupTitle." enable-danmu danmu-btn controls></video>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: [], //轮播图
				groupTitle:[],
				title:'农田基础建设项目',
				time:'2020-02-10',
				browse:'122',
				showHeight:600,
				toggle: false,
				post:'市级职责人员',
				type: 0,
				id:'',
				// 字符串的形式
				style: {
					p: 'letter-spacing: 4rpx;text-align: justify;line-height: 48rpx;font-size:30rpx;text-justify: inter-ideograph; text-indent: 2em;padding-bottom: 20rpx;padding-top: 20rpx;',
					span: 'font-size: 30rpx'
				},
			}
		},
		
		onLoad:function(param) {
			uni.showLoading({
				title: '加载详情中...',
			})
			this.id = param.id;
			console.log(this.id)
			this.loadData();
		},
		
		methods: {
			//加载数据
			loadData: function() {
				uni.request({
					url:this.$xcdt.KyInterface.addViews.Url,
					method:this.$xcdt.KyInterface.addViews.method,
					data:{
						id : this.id
					},
					success: (res) => {
						console.log('浏览量+1', res)
					},
					fail: function() {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
					}
				})
				
				uni.request({
					url:this.$xcdt.KyInterface.getDynamicDetailByID.Url,
					method:this.$xcdt.KyInterface.getDynamicDetailByID.method,
					data:{
						id : this.id
					},
					success: (res) => {
						console.log('详情', res)
						if(res.data.status == true){
							this.groupTitle=res.data.data;
							// console.log('列表数据',this.groupTitle)
							uni.stopPullDownRefresh();
							uni.hideLoading();
						}else{
							uni.stopPullDownRefresh();
							uni.hideLoading();
							uni.showToast({
								title: '暂无列表信息',
								icon: 'none'
							})
						}
						// console.log('111111111',this.rotationChart)
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
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
		width: 100%;
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
		background: #FFFFFF;

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
