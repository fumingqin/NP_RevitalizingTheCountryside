<template>
	<view class="content">
		<!-- 顶部搜索框 -->
		<!-- <view class="topSerchView">
			<view class="SearchBar" elevation='5px'>
				<input class="addressInput" @input="onInput" placeholder="请输入关键字搜索" />
			</view>
		</view> -->
		<view class="topSerchClass">
			<u-search placeholder="请输入关键字" v-model="keyword" :show-action="false" @input="onInput" :clearabled="true"></u-search>
		</view>

		<!-- 搜索列表 -->
		<view class="stationList" :style="{ 'height':scrollHeight }" v-if="SearchStatus">
			<block v-for="(item,index) in VillageSearchList" :key="index">
				<view class="listItem" @click="Listclick(item)">
					<rich-text :nodes="item.village_name"></rich-text>
				</view>
			</block>
		</view>

		<!-- 原列表 -->
		<view class="stationList" :style="{ 'height':scrollHeight }" v-if="VillageStatus">
			<block v-for="(item,index) in VillageList" :key="index">
				<view class="listItem" @click="Listclick(item)">
					<rich-text :nodes="item.village_name"></rich-text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				VillageSearchList: [], //关键字查询的乡村
				VillageList: [], //乡村列表
				VillageStatus: true, //原列表显示状态
				SearchStatus: false, //搜索框显示状态
				
				scrollHeight:1000,
				userId:0,
				keyword:"",
			}
		},
		onLoad(pam) {
			this.userId = pam.id;
			uni.showModal({
				title:'温馨提示',
				content: '首次登录需要选择村庄，否则可能导致部分功能无法正常使用',
				success: (e)=>{
					if(e.confirm){
					}
				}
			});
		},
		onShow(){
			uni.request({
				url: this.$GrzxInter.Interface.getVillageList.value,
				method: this.$GrzxInter.Interface.getVillageList.method,
				success: (res) => {
					uni.hideLoading();
					console.log('乡村列表', res);
					this.VillageList = res.data.data;
				},
				fail(res) {
					uni.hideLoading();
				}
			})
		},
		methods: {
			onInput: function(e) {
				console.log('监听输入', e)
				
				this.VillageStatus = e != '' ? false : true;
				this.SearchStatus = e != '' ? true : false;

				uni.showLoading();
				uni.request({
					url: this.$GrzxInter.Interface.getVillageListByName.value,
					method: this.$GrzxInter.Interface.getVillageListByName.method,
					data: {
						keyName: e
					},
					success: (res) => {
						uni.hideLoading();
						console.log('模糊搜索', res);
						this.VillageSearchList = res.data.data;
					},
					fail(res) {
						uni.hideLoading();
					}
				});
			},

			Listclick: function(e) {
				uni.request({
					url: this.$GrzxInter.Interface.updateRuralId.value,
					method: this.$GrzxInter.Interface.updateRuralId.method,
					data: {
						userId : this.userId,
						ruralId: e.id,
					},
					success: (res) => {
						if(res.data.status){
							uni.setStorageSync('userInfo', res.data.data);
							uni.removeStorageSync('captchaCode');
							uni.switchTab({
								url:'/pages/home/h_xczx_home',
							})
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none'
							});
						}
					},
					fail(res) {
						uni.showToast({
							title: '网络连接失败',
							icon:'none'
						});
					}
				});
				
			},
			
			clear(){
				this.keyword = "";
			},
		}
	}
</script>

<style lang="scss">
	.topSerchView {
		background-color: #DBDBDB;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		width: 750upx;

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
	
	.topSerchClass{
		width: 90%;
		margin: 15upx 5%;
	}
	
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 800rpx;
	
		.listItem {
			margin:0 5%;
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
