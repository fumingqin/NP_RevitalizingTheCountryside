<template>
	<view class="se_view">
		<view class="sv_view">
			<image class="sv_image" :src="imageIndex" lazy-load="true"></image>
		</view>

		<view class="sv_view2">
			<view class="sv_title">服务区</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index) in ItemArr" :key="index">
					<view @click="natTo(item)">
						<image :class="item.style" :src="item.IsUse?item.ImageURL1:item.ImageURL2" lazy-load="true"></image>
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="sv_view2" v-if="level == 1 || level == 2">
			<view class="sv_title">村级管理</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index) in ItemArr2" :key="index">
					<view @click="natTo(item)">
						<image :class="item.style" :src="item.IsUse?item.ImageURL1:item.ImageURL2" lazy-load="true"></image>
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="sv_view2" v-if="level == 2">
			<view class="sv_title">县市级管理</view>
			<view style="display: flex; flex-wrap: wrap;padding: 0 14rpx;">
				<view class="sv_view3" v-for="(item,index) in ItemArr3" :key="index">
					<view @click="natTo(item)">
						<image :class="item.style" :src="item.IsUse?item.ImageURL1:item.ImageURL2" lazy-load="true"></image>
						<text class="sv_text">{{item.ItemTitle}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

	</view>
</template>

<script>
	import $lyfw from '@/common/LYFW/LyfwFmq.js' //旅游服务
	export default {
		data() {
			return {
				imageIndex: '', //首页图片
				level: 0, //0为普通用户，1为村级职责人员，2位县市级职责人员
				userInfo: '', //用户数据
				//普通用户管理区
				ItemArr: [{
					IsUse: true,
					clickURL: "cct_extensionPage",
					ImageURL1: "../../static/home/serve/cct.png", //亮
					ImageURL2: "../../static/home/serve/cct2.png", //暗
					ItemTitle: "村村通",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_LYFW/pages/LYFW/scenicSpotTickets/ticketsList",
					ImageURL1: "../../static/home/serve/cpdg.png", //亮
					ImageURL2: "../../static/home/serve/cpdg2.png", //暗
					ItemTitle: "景区售票",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_FBXM/pages/publishProject/pp_generalList",
					ImageURL1: "../../static/home/serve/xmjd.png", //亮
					ImageURL2: "../../static/home/serve/xmjd2.png", //暗
					ItemTitle: "项目监督",
					style: "sv_print",
				},
				{
					IsUse: true,
					// clickURL: "../../pages_WSSC/pages/WSSC/goodsList",
					clickURL: "../../pages_WSSC/pages/WSSC/onlineShoppingMall/osm_homePage",
					ImageURL1: "../../static/home/serve/sc.png", //亮
					ImageURL2: "../../static/home/serve/sc2.png", //暗
					ItemTitle: "网上商城",
					style: "sv_print",
				},
				{
					IsUse: true,
					clickURL: "../../pages_SMJJ/pages/shuimeiEconomy/se_generalList",
					ImageURL1: "../../static/home/serve/smjj.png", //亮
					ImageURL2: "../../static/home/serve/smjj2.png", //暗
					ItemTitle: "水美经济",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_STYH/pages/ecologicalBank/eb_generalList",
					ImageURL1: "../../static/home/serve/yh.png", //亮
					ImageURL2: "../../static/home/serve/yh2.png", //暗
					ItemTitle: "生态银行",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_PYFW/pages/pyfw_py_list",
					ImageURL1: "../../static/home/serve/tprw.png", //亮
					ImageURL2: "../../static/home/serve/tprw2.png", //暗
					ItemTitle: "特派任务",
					style: "sv_print",
				},
				// {
				// 	IsUse: true,
				// 	clickURL: "",
				// 	ImageURL1: "../../static/home/serve/ncp.png", //亮
				// 	ImageURL2: "../../static/home/serve/ncp2.png", //暗
				// 	ItemTitle: "农产品",
				// 	style: "sv_print",
				// },
				{
					IsUse: true,
					clickURL: "../../pages_JDKP/pages/jdkp_kpr_list",
					ImageURL1: "../../static/home/serve/kprw.png", //亮
					ImageURL2: "../../static/home/serve/kprw2.png", //暗
					ItemTitle: "考评任务",
					style: "sv_print",
				},
				// {
				// 	IsUse: true,
				// 	clickURL: "../GRZX/notice",
				// 	ImageURL1: "../../static/home/serve/xttz.png", //亮
				// 	ImageURL2: "../../static/home/serve/xttz2.png", //暗
				// 	ItemTitle: "系统通知",
				// 	style: "sv_print",
				// }
				],

				//村级管理区
				ItemArr2: [{
					IsUse: true,
					clickURL: "../../pages_PYFW/pages/pyfw_personalList",
					ImageURL1: "../../static/home/serve/kjtpy.png", //亮
					ImageURL2: "../../static/home/serve/kjtpy2.png", //暗
					ItemTitle: "特派服务",
					style: "sv_print",
				},
				{
					IsUse: true,
					clickURL: "../../pages_SPHY/pages/sphy_index",
					ImageURL1: "../../static/home/serve/sphy.png", //亮
					ImageURL2: "../../static/home/serve/sphy2.png", //暗
					ItemTitle: "视频会议",
					style: "sv_print",
				},
				{
					IsUse: true,
					// clickURL: "../../pages_WSSC/pages/WSSC/checkGoods",
					clickURL: "",
					ImageURL1: "../../static/home/serve/shsp.png", //亮
					ImageURL2: "../../static/home/serve/shsp2.png", //暗
					ItemTitle: "审核商品",
					style: "sv_print",
				// },{
				// 	IsUse: true,
				// 	clickURL: "../../pages_YCYD/pages/YCYD/myVillage",
				// 	ImageURL1: "../../static/home/serve/cdgl.png", //亮
				// 	ImageURL2: "../../static/home/serve/cdgl2.png", //暗
				// 	ItemTitle: "村档管理",
				// 	style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_XCDT/pages/ruralDynamics/rd_list",
					ImageURL1: "../../static/home/serve/dtgl.png", //亮
					ImageURL2: "../../static/home/serve/dtgl2.png", //暗
					ItemTitle: "动态管理",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_SMJJ/pages/shuimeiEconomy/se_list",
					ImageURL1: "../../static/home/serve/smgl.png", //亮
					ImageURL2: "../../static/home/serve/smgl2.png", //暗
					ItemTitle: "水美管理",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_STYH/pages/ecologicalBank/eb_list",
					ImageURL1: "../../static/home/serve/stgl.png", //亮
					ImageURL2: "../../static/home/serve/stgl2.png", //暗
					ItemTitle: "生态管理",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_JDKP/pages/jdkp_cj_list",
					ImageURL1: "../../static/home/serve/kpcx.png", //亮
					ImageURL2: "../../static/home/serve/kpcx2.png", //暗
					ItemTitle: "考评查询",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_FBXM/pages/publishProject/pp_list",
					ImageURL1: "../../static/home/serve/xmgl.png", //亮
					ImageURL2: "../../static/home/serve/xmgl2.png", //暗
					ItemTitle: "项目管理",
					style: "sv_print",
				}],

				//县市级管理区
				ItemArr3: [{
					IsUse: true,
					clickURL: "../../pages_PYFW/pages/pyfw_gl_list",
					ImageURL1: "../../static/home/serve/tpsp.png", //亮
					ImageURL2: "../../static/home/serve/tpsp2.png", //暗
					ItemTitle: "特派审批",
					style: "sv_print",
				},
				{
					IsUse: true,
					clickURL: "",
					clickURL: "../../pages_ZCFB/pages/ZCFB/myPolicyList",
					ImageURL1: "../../static/home/serve/fbzc.png", //亮
					ImageURL2: "../../static/home/serve/fbzc2.png", //暗
					ItemTitle: "发布政策",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "",
					clickURL: "../../pages_JDKP/pages/jdkp_xs_list",
					ImageURL1: "../../static/home/serve/fbkp.png", //亮
					ImageURL2: "../../static/home/serve/fbkp2.png", //暗
					ItemTitle: "发布考评",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_JDKP/pages/jdkp_cj_list",
					ImageURL1: "../../static/home/serve/kpcx.png", //亮
					ImageURL2: "../../static/home/serve/kpcx2.png", //暗
					ItemTitle: "考评查询",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_JDKP/pages/jdkp_appraisalList",
					ImageURL1: "../../static/home/vajra/jidukaohe.png", //亮
					ImageURL2: "../../static/home/vajra/jidukaohe2.png", //暗
					ItemTitle: "乡村评榜",
					style: "sv_print",
				},{
					IsUse: true,
					clickURL: "../../pages_JDKP/pages/jdkp_indexRating",
					ImageURL1: "../../static/home/vajra/jidukaohe.png", //亮
					ImageURL2: "../../static/home/vajra/jidukaohe2.png", //暗
					ItemTitle: "指标评榜",
					style: "sv_print",
				}
				// ,{
				// 	IsUse: true,
				// 	clickURL: "../../pages_FBXM/pages/publishProject/pp_list",
				// 	ImageURL1: "../../static/home/serve/sphy.png", //亮
				// 	ImageURL2: "../../static/home/serve/sphy2.png", //暗
				// 	ItemTitle: "发布项目",
				// 	style: "sv_print",
				// }
				]
				
			}
		},
		onLoad: function() {
			this.loadData();
		},
		onShow:function(){
			this.userData();
		},
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.showLoading({
					title: '加载信息中...'
				})
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						if (this.userInfo.duty == '村级职责人员') {
							this.level = 1;
						} else if (this.userInfo.duty == '县级职责人员' || this.userInfo.duty == '市级职责人员') {
							this.level = 2;
						}
						uni.hideLoading()
						console.log('获取个人信息', this.userInfo)
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title:'您暂未登录，已为您跳转登录页面',
							icon:'none',
							success: () => {
								uni.navigateTo({
									url : '../../pages/GRZX/userLogin',
								})
							}
						})
					}
				});
			},
			// 加载数据
			loadData: function() {
				uni.request({
					url: this.$home.KyInterface.getImage.Url,
					method: this.$home.KyInterface.getImage.method,
					data: {
						type: '3'
					},
					success: (res) => {
						console.log('轮播区', res)
						this.imageIndex = res.data.data.image
						console.log(this.imageIndex)
					},
					fail: function() {
						uni.showToast({
							title: 'banner图片加载异常',
							icon: 'none'
						})
					}
				})
			},

			natTo: function(item) {
				if (!item.IsUse) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				} else if (item.clickURL == '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: item.clickURL,
					});
				}
			}
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
			border-radius: 12upx;
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
			border-radius: 12upx;

			.sv_view3 {
				width: 20%;
				text-align: center;
				margin-top: 45upx;

				.sv_print {
					width: 106upx;
					height: 106upx;
				}

				.sv_print3 {
					height: 60upx;
					width: 52upx;
				}

				.sv_print2 {
					width: 79upx;
					height: 56upx;
				}

				.sv_text {
					font-size: 24upx;
					font-weight: 400;
					padding-top: 4upx;
					display: block;
				}
			}
		}
	}
</style>
