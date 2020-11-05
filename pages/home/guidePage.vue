<template>
	<view>
		<swiper class="swiper" :style="{'height':imageHeight}">
			<swiper-item class="swiperItem" v-for="(item,index) in imageIndex" :key="index">
				<text style="position: absolute; top: 116upx; right: 40upx; color: #fff; font-size: 30upx;z-index: 99;" @click="natTo">跳过</text>
				<image class="image" :src="item.imageUrl" mode="aspectFill"></image>
				<view style="position: absolute; bottom: 60px; width: 100%; text-align: center;" :hidden="index !== 2">
					<text style="padding: 20upx 48upx; color: #466019; border: 1px solid #466019; border-radius: 52upx;" @click="natTo">开启乡村生活</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				imageHeight: '1334upx', //手机屏幕高度
				imageIndex: [
					{imageUrl:'../../static/home/guidePage/1.png'},
					{imageUrl:'../../static/home/guidePage/2.png'},
					{imageUrl:'../../static/home/guidePage/3.png'}
				],
			}
		},
		onLoad: function() {
			// uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
			uni.getSystemInfo({
				success: (res) => {
					this.imageHeight = res.windowHeight + 'px'
					// console.log(this.imageHeight)
				}
			})
		},
		onBackPress:function(){
			return true;
		},
		methods: {
			//跳转路由
			natTo: function() {
				uni.setStorage({
					key:'guidePageData',
					data:true,
					success: () => {
						uni.switchTab({
							url: 'h_xczx_home'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		.swiperItem {
			width: 100%;
			height: 100%;

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
