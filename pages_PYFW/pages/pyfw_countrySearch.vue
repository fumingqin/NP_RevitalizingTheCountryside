<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="topSerchView">
			<view class="SearchBar" elevation='5px' >
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view>
		
		<!-- 搜索列表 -->
		<!-- <view class="stationList" :style="{ 'height':scrollHeight }" v-if="isShowList">
			<block v-for="(item,index) in keywordList" :key="index">
				<view class="listItem" @click="itemClick(index)">
					<rich-text :nodes="item.htmlStr"></rich-text>
				</view>
			</block>
		</view> -->
		
		
		<!-- <view class="list_box">
			<view class="main">
				<swiper class="swiper" :style="{ 'height':scrollHeight }" vertical="true" duration="300">
					<swiper-item>
						<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
							<view class="item">
								<view class="goods" v-for="(item,index) in mainArray" :key="index" @click="detailStationTap(item)">
									<view>
										<view>{{item.LineName}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view> -->
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//-------------------------监听输入-------------------------
			onInput(event){
				console.log('监听输入',event)
				// var keyword = event.detail ? event.detail.value : event;
				// if (!keyword) {
				// 	this.keywordList = [];
				// 	this.isShowList = false;
				// 	this.isShowAllList = true;
				// 	return;
				// }
				// this.isShowList = true;
				// this.isShowAllList = false;
				//以下示例截取淘宝的关键字，请替换成你的接口
				// uni.showLoading();
				// uni.request({
				// 	url:$KyInterface.KyInterface.GetLineNameByKey.Url,
				// 	method:$KyInterface.KyInterface.GetLineNameByKey.method,
				// 	data:{
				// 		AppSystemName:this.type,
				// 		key:keyword
				// 	},
				// 	success: (res) => {
				// 		uni.hideLoading();
				// 		console.log('模糊搜索',res);
				// 		this.keywordList = [];
				// 		this.keywordList = this.drawCorrelativeKeyword(res.data.data, keyword);	
				// 	},
				// 	fail(res) {
				// 		uni.hideLoading();
				// 	}
				// });
				
			},
		}
	}
</script>

<style lang="scss">
	.topSerchView {
		background-color: #DBDBDB;
		padding-top: 20rpx;
		padding-bottom: 20rpx;

		.SearchBar {
			background-color: #FFFFFF;
			margin-right: 20rpx;
			margin-left: 20rpx;
			box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
			flex-direction: row;
			border-radius: 9px;
			padding: 20rpx;
			align-items: center;
			justify-content: space-between;
		}

		//地址搜索输入
		.addressInput {
			color: #999999;
			font-size: 30rpx;
			font-weight: 300;
		}
	}

	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 100rpx;

		.listItem {
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}
	
	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;
	
		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			text-align: center;
	
			.item {
				padding-left: 20rpx;
				position: relative;
				padding: 8upx 0;
	
				&:not(:first-child) {
					margin-top: 1px;
	
					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}
	
				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
					padding: 8upx 0;
				}
			}
		}
	
		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;
	
			.swiper {
				height: 500px;
			}
	
	
			.item {
				padding-bottom: 10rpx;
			}
		}
	
		.goods {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;
			border-bottom: 1rpx solid #eeeeee;
			line-height: 100upx;
			padding-left: 20upx;
		}
	}
</style>
