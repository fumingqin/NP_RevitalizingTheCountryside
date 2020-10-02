<template>
	<view class="se_view">
		<view v-if="applyName=='南平综合出行'" class="sv_view">
			<image class="sv_image" :src="imageIndex.imageUrl" lazy-load="true"></image>
		</view>

		<view class="sv_view2">
			<view class="sv_title">出行</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index1) in ItemArr" :key="index1">
					<view @click="natTo(item)">
						<image :class="item.style" :src="item.IsUse?item.ImageURL1:item.ImageURL2" lazy-load="true"></image>
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="sv_view2">
			<view class="sv_title">旅游</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index) in ItemArr2" :key="index">
					<view @click="natTo(item.clickURL)">
						<image :class="item.style" :src="item.IsUse?item.ImageURL1:item.ImageURL2" lazy-load="true"></image>
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				applyName:'',
				imageIndex: [{
					imageUrl: '',
				}], //首页图片
				ItemArr: [{
						IsUse: true,
						clickURL: "/pages_ZXGP/pages/ZXGP/TraditionSpecial/Home/ctkyIndex",
						ImageURL1: "../../static/home/serve/cpdinggou.png",//亮
						ImageURL2: "../../static/home/serve/hcpdinggou.png",//暗
						ItemTitle: "车票订购",
						style:"sv_print",
					},
					{
						IsUse: true,
						clickURL: "/pages_BUS/pages/Bus/BusQuery",
						ImageURL1: "../../static/home/serve/gjchaxun.png",//亮
						ImageURL2: "../../static/home/serve/hgjchaxun.png",//暗
						ItemTitle: "公交查询",
						style:"sv_print",
					},
					{
						IsUse: true,
						clickURL: "/pages_ZXGP/pages/ZXGP/SpecialBus/Home/zxgpHomePage",
						ImageURL1: "../../static/home/serve/xqzhuanxian.png",//亮
						ImageURL2: "../../static/home/serve/hxqzhuanxian.png",//暗
						ItemTitle: "武夷新区",
						style:"sv_print",
					},
					{
						IsUse: false,
						clickURL:"",
						ImageURL1: "../../static/home/serve/bcfuwu.png",//亮
						ImageURL2: "../../static/home/serve/hbcfuwu.png",//暗
						ItemTitle: "客运查询",
						style:"sv_print",
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL1: "../../static/home/serve/wlyueche.png",//亮
						ImageURL2: "../../static/home/serve/hwlyueche.png",//暗
						ItemTitle: "网络约车",
						style:"sv_print",
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL1: "../../static/home/serve/xjkuaidi.png",//亮
						ImageURL2: "../../static/home/serve/hxjkuaidi.png",//暗
						ItemTitle: "小件快递",
						style:"sv_print",
					},
					{
						IsUse: false,
						clickURL: "",
						ImageURL1: "../../static/home/serve/jcyuyue.png",//亮
						ImageURL2: "../../static/home/serve/hjcyuyue.png",//暗
						ItemTitle: "检测预约",
						style:"sv_print",
					},
				],
				ItemArr2: [{
						IsUse: false,
						clickURL:"",
						ImageURL1: "../../static/home/serve/jqgoupiao.png",//亮
						ImageURL2: "../../static/home/serve/hjqgoupiao.png",//暗
						ItemTitle: "景区购票",
						style:"sv_print3",
					}
				]
			}
		},
		onLoad: function() {
			this.applyName=this.$oSit.Interface.system.applyName;
			console.log(this.applyName)
			uni.request({
				url: $lyfw.Interface.qg_GetImage.value,
				method: $lyfw.Interface.qg_GetImage.method,
				data: {
					model: 6,
					type: '服务banner',
					systemtype: 'XCX',//APP,XCX,H5
					companyid: '南平综合出行',//公司名
				},
				success: (res) => {
					console.log(res)
					this.imageIndex = res.data.data

				},
			})
		},
		methods: {
			natTo: function(item) {
				if (!item.IsUse) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: item.clickURL,
					});
				}

			},
			natTo2: function(url) {
				// #ifdef H5
				uni.showToast({
					title: '网络约车仅支持小程序或APP!',
					icon: 'none'
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url
				})
				// #endif

			},
			natTo3: function(url) {
				uni.showToast({
					title: '正在开发中，尽情期待..',
					icon: 'none'
				})

			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	.se_view {
		width: 100%;
		height: 100%;

		.sv_view {
			width: 698upx;
			height: 320upx;
			border-radius: 20upx;
			display: flex;
			margin-left: 26upx;
			margin-top: 43upx;

			.sv_image {
				width: 100%;
				height: 100%;
			}

		}

		.sv_title {
			font-size: 36upx;
			font-weight: bold;
			padding-top: 41upx;
			padding-left: 32upx;
		}

		.sv_view2 {
			width: 698upx;
			background: #FFFFFF;
			margin-left: 26upx;
			margin-top: 43upx;
			padding-bottom: 56upx;
			border-radius: 20upx;

			.sv_view3 {
				width: 20%;
				text-align: center;
				margin-top: 45upx;
				.sv_print {
					width: 60upx;
					height: 60upx;
				}

				.sv_print3 {
					height: 60upx;
					width:52upx;
				}

				.sv_print2 {
					width: 79upx;
					height: 56upx;
				}

				.sv_text {
					font-size: 24upx;
					font-weight: 400;
					padding-top: 24upx;
					display: block;
				}
			}
		}
	}
</style>
