<template>
	<view class="">
		<view class="mask">
			<swiper @change="changeSwiper" class="my_swiper" :current="current" :circular="circular" :indicator-dots="indicatorDots"
			 :autoplay="autoplay" :duration="duration">
				<swiper-item>
					<view class="bg_img" :style="{ backgroundImage: 'url('+picList+')'}"></view>
				</swiper-item>
			</swiper>
		</view>
		<view style="font-size: 28upx;color: #0E90CE;position: absolute;bottom: 0;margin: 50upx 30upx;right: 0;z-index: 7;" @click="uploadClick">点击下载</view>
		<!-- <view class="page" v-if="picList.length>0">{{ current + 1 }} / {{ picList.length }}</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picList: '',
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				circular: true,
				current: 0,
				isShowSwiper: false
			};
		},
		onLoad() {
			this.picListInit();
		},
		methods: {
			clickPic(index) {
				this.current = index;
				this.isShowSwiper = true;
			},
			async picListInit() {
				this.current = uni.getStorageSync("currentImgIndex");
				this.picList = uni.getStorageSync("imagePiclist");
				console.log(this.picList)
			},
			changeSwiper(e) {
				this.current = e.target.current;
			},
			//图片转换
			dataParse: function(e) {
				if (e !== '') {
					var a = JSON.parse(e)
					return a[0]
				} else {
					return e
				}
			},

			uploadClick: function() {
				uni.showLoading({
					title: '下载中...',
					mask: true
				})
				uni.downloadFile({
					url: this.picList, // 这里是你接口地址 若要传参 直接 url拼接参数即可
					header: {
						'X-Authorization': uni.getStorageSync('session.login')['token']
					},
					methods: 'GET',
					success: (res) => {
						console.log(res, 'res')
						var tempFilePath = res.tempFilePath; // 这里拿到后端返回的图片路径
						uni.saveImageToPhotosAlbum({ // 然后调用这个方法
							filePath: tempFilePath,
							success: (res) => {
								uni.hideLoading();
								uni.showToast({
									title: '图片已保存'
								})
							}
						})
					},
					fail: () => {
						uni.hideLoading();
					}
				});

			},
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		position: fixed;
		z-index: 6;
		color: #fff;
		bottom: 20rpx;
		text-align: center;
		width: 100%;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
		z-index: 5;

		>.my_swiper {
			width: 100%;
			height: 60vh;

			.bg_img {
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center;
				width: 100%;
				height: 100%;
			}
		}
	}

	.pic_list {
		display: flex;
		flex-flow: row wrap;

		>view {
			flex: 0 0 33.3vw;
			height: 33.3vw;
			padding: 1vw;

			>image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
