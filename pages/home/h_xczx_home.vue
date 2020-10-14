<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="rotationChart" :height="422" indicator-pos="bottomRight" name="ImageURL"></u-swiper>

		<!-- 金刚区 -->
		<swiper class="h_vajraDistrict">
			<swiper-item class="vd_item" v-for="(item,index) in functionArray" :key="index">
				<view class="item_view" v-for="(item2,index2) in item.array" :key="index2" v-if="item2.display == true" @click="itemClick(item2.entrance)">
					<image class="view_image" :src="item2.image" mode="aspectFit"></image>
					<text class="view_text">{{item2.name}}</text>
				</view>
			</swiper-item>
		</swiper>

		<!-- 资讯区 -->
		<u-notice-bar :list="information" :volume-icon="false" type="warning" font-size="26"></u-notice-bar>
		<!-- <view class="h_information" @click="itemClick('../ZXDT/zxdt_information')">
			<image class="inf_image" src="../../static/home/information/dongtai.png"></image>
			<view  class="inf_view">
				<swiper class="inf_view_swiper" vertical autoplay circular>
					<swiper-item v-for="(item,index) in information2" :key="index">
						<view class="inf_view_swiper_view">{{item.Title}}</view>
					</swiper-item>
				</swiper>
				<view class="inf_view_view">点击查看资讯动态</view>
			</view>
		</view> -->

		<!-- banner区 -->
		<view>
			<image style="width: 100%; height: 164upx;" src="../../static/home/temporary/banner.png" mode="aspectFit"></image>
		</view>

		<!-- 小功能引导区 -->
		<!-- <view class="h_guidanceArea">
			<u-row gutter="12">
				<u-col span="4">
					<view class="gui_view">
						<text class="gui_view_title">健康码</text>
						<text class="gui_view_text">快捷八闽健康码</text>
						<image class="gui_view_iamge" src="../../static/home/guidance/tuceng1.png" ></image>
					</view>
				</u-col>
				<u-col span="4">
					<view class="gui_view">
						<text class="gui_view_title">出行助手</text>
						<text class="gui_view_text">车站导航/找车车</text>
						<image class="gui_view_iamge" src="../../static/home/guidance/tuceng2.png" ></image>
					</view>
				</u-col>
				<u-col span="4">
					<view class="gui_view">
						<text class="gui_view_title">每日南平</text>
						<text class="gui_view_text">南平那些新鲜事</text>
						<image class="gui_view_iamge" src="../../static/home/guidance/tuceng3.png" ></image>
					</view>
				</u-col>
			</u-row>
		</view> -->
		<!-- 乡村特产 -->
		<view class="h_quickEntry">
			<view class="qui_titleView">乡村美景</view>
			<view class="sixBackground">
				<view v-for="(item,index) in quickEntryData" :key="index">
					<view class="darkCurtain"></view>
					<image :src="item.image"></image>
					<view class="sixView">
						<text class="sixText1">{{item.title}}</text>
						<text class="sixText2" :hidden="item.ticketEnglish==''">{{item.ticketEnglish}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		

		<!-- 公示项目 -->
		<view class="gs_view">
			<view class="gs_title">公示项目</view>
			<u-swiper class="gs_swiper" :list="advertisingMap" :effect3d="true" :title="true" name="ShowImageURL" bg-color="#ffffff"></u-swiper>
		</view>




		<!-- 隐藏协议弹出 -->
		<u-modal v-model="protocolStatus" :show-cancel-button="true" confirm-text="同意" title="服务协议和隐私政策" @confirm="agreeProtocol">
			<view class="h_popupText">
				<text>请你务必审慎阅读，充分理解“软件许可及服务协议”和“隐私政策”各条款。</br>你可阅读</text>
				<text style="color: #2F9BFE;" @click="agreementClick">《软件许可及服务协议》</text>
				<text>和</text>
				<text style="color: #2F9BFE;" @click="privacyClick">《隐私政策》</text>
				<text>了解详细信息。</br>如你同意，请点击“同意”开始接受我们的服务。</text>
			</view>
		</u-modal>

		<!-- 发现新版本弹出 -->
		<u-modal v-model="upgradeStatus" :show-cancel-button="true" confirm-text="升级" title="发现新版本" @confirm="agreeProtocol">
			<view class="h_popupText">
				<rich-text :nodes="upgradeContent"></rich-text>
			</view>
		</u-modal>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: ['', ''], //轮播图
				advertisingMap: ['', '', ''], //广告图
				information: ['振兴乡村来啦！11月1日试运行！快来体验吧！'], //新闻列表
				protocolStatus: false, //隐藏弹出层，f为不弹，t为弹
				upgradeStatus: false, //升级弹出层，f为不弹，t为弹
				currentDate: '', //当前时间
				upgradeContent: `
								1. 修复badg组件的size参数无效问题<br>
								2. 新增Modal模态框组件<br>
								3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
								4. 修复键盘组件在微信小程序上遮罩无效的问题
								`,
				quickEntryData: [{
					title: '武夷山',
					ticketEnglish : 'Wuyishan',
					image: '../../static/home/temporary/xianlu.png'
				}, {
					title: '芒荡山',
					ticketEnglish : 'Mangdangshan',
					image: '../../static/home/temporary/xianlu.png'
				},{
					title: '华阳山',
					ticketEnglish : 'Huayangshan',
					image: '../../static/home/temporary/xianlu.png'
				},{
					title: '青龙瀑布',
					ticketEnglish : 'Qinglongpubu',
					image: '../../static/home/temporary/xianlu.png'
				},{
					title: '溪源峡谷',
					ticketEnglish : 'Xiyuanxiagu',
					image: '../../static/home/temporary/xianlu.png'
				},{
					title: '花花世界',
					ticketEnglish : 'Huahuashijie',
					image: '../../static/home/temporary/xianlu.png'
				}], //快捷入口数据
				
				functionArray: [{
					array: [{
						name: '一村一档', //功能名称
						image: '../../static/home/vajra/yicunyidang.png', //功能图标
						display: true, //是否显示
						entrance: '../../pages_ZXGP/pages/ZXGP/TraditionSpecial/Home/ctkyIndex', //跳转路径
					}, {
						name: '乡村动态',
						image: '../../static/home/vajra/xiangcundongtai.png',
						display: true,
						entrance: '../../pages_ZXGP/pages/ZXGP/SpecialBus/Home/zxgpHomePage',
					}, {
						name: '政策发布',
						image: '../../static/home/vajra/fabudongtai.png',
						display: true,
						entrance: '../../pages_ZCFB/pages/ZCFB/issuePolicy',
					}, {
						name: '季度考核',
						image: '../../static/home/vajra/jidukaohe.png',
						display: true,
						entrance: '../../pages_BUS/pages/Bus/BusQuery',
					}, {
						name: '民情反馈',
						image: '../../static/home/vajra/minqingfankui.png',
						display: true,
						entrance: '',
					}]
				}], //功能数组
			}
		},

		onLoad: function() {
			// uni.clearStorage()
			let pro = uni.getStorageSync('protocol')
			if (pro !== true) {
				// this.protocolStatus = true;
			}
			this.loadData();
			this.getTodayDate();
			// #ifdef MP-WEIXIN
			// 校验小程序登录
			this.getLoginState();
			//#endif
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


				uni.request({
					url: this.$home.KyInterface.GetHomeStyle.Url,
					method: this.$home.KyInterface.GetHomeStyle.method,
					success: (res) => {
						// console.log('广告区',res)
						this.advertisingMap = [];
						for (let i = 0; i < res.data.data.length; i++) {
							var a = {
								AID: res.data.data[i].AID,
								ShowImageURL: res.data.data[i].ShowImageURL,
								title: res.data.data[i].Title,
							}
							this.advertisingMap.push(a);
						}
						// console.log(this.rotationChart)
					},
					fail: function() {
						uni.showToast({
							title: '首页广告图网络加载异常',
							icon: 'none'
						})
					}
				})

			},

			//获取时间
			getTodayDate() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var timer = year + '-' + month + '-' + day;
				this.currentDate = timer;
				// console.log(this.currentDate)
			},

			//点击跳转
			itemClick: function(entrance) {
				// console.log(entrance)
				if (entrance == '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: entrance,
					})
				}
			},

			//快捷车票跳转
			quickEntryClick: function(item) {
				// console.log(item)
				uni.navigateTo({
					url: '../../pages_ZXGP/pages/ZXGP/TraditionSpecial/Order/selectTickets?&startStation=' + item.start +
						'&endStation=' + item.end + '&date=' + this.currentDate,
				})
			},

			//同意添弹框缓存 - 隐私服务
			agreeProtocol: function() {
				uni.setStorage({
					key: 'protocol',
					data: true,
				})
			},
			//查看服务协议
			agreementClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.privacyService.url + '?title=软件许可及服务协议',
				})
			},
			//查看隐私政策
			privacyClick() {
				uni.navigateTo({
					url: this.$GrzxInter.Route.privacyService.url + '?title=隐私政策',
				})
			},

			// #ifdef MP-WEIXIN
			getLoginState() {
				uni.getStorage({
					key: 'isCanUse',
					success(res) {},
					fail(err) {
						uni.showModal({
							content: '您暂未登录，是否登录',
							confirmText: '去登录',
							cancelText: '暂不登录',
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/GRZX/wxAuthorize?type=index'
									})
								} else if (res.cancel) {
									// console.log('用户点击取消');
								}
							}
						})
					}
				})
			},
			//#endif


		}
	}
</script>

<style lang="scss">
	//页面全局样式
	page {
		background-color: #f9f9f9;
	}

	//轮播区样式
	.h_swiper {
		height: 422upx;

		.sw_item {
			width: 100%;
			height: 100%;

			.item_image {
				width: 100%;
				height: 422upx;
			}
		}
	}

	//金刚区样式
	.h_vajraDistrict {
		background: #FFFFFF;
		height: 220upx;
		padding: 0 16upx;

		.vd_item {
			display: flex;

			.item_view {
				width: 20%;
				text-align: center;
				padding: 32upx 0upx;

				.view_image {
					width: 104upx;
					height: 104upx;
				}

				.view_text {
					font-size: 28upx;
					color: #333333;
					display: block;
				}
			}
		}
	}

	//资讯区样式
	.h_information {
		background: #FFFFFF;
		padding: 36upx;
		display: flex;
		margin-bottom: 40upx;

		.inf_image {
			width: 146upx;
			height: 82upx;
		}

		.inf_view {
			margin-left: 20upx;
			width: 75%;

			.inf_view_swiper {
				width: 100%;
				height: 36upx;

				.inf_view_swiper_view {
					font-size: 26upx;
					height: 48upx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}

			.inf_view_view {
				margin-top: 12upx;
				font-size: 26upx;
				color: #aaa;
			}
		}

	}

	//小功能引导区
	.h_guidanceArea {
		margin: 40upx 0;

		.gui_view {
			// border-radius: 8upx; 
			// background: #FFFFFF; 
			padding: 37upx 20upx;
			position: relative;

			.gui_view_iamge {
				position: absolute;
				left: 0;
				top: 0;
				width: 240upx;
				height: 140upx;
				z-index: 1;
			}

			.gui_view_title {
				position: relative;
				z-index: 3;
				font-weight: bold;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.gui_view_text {
				position: relative;
				z-index: 2;
				font-size: 24upx;
				color: #aaa;
				display: block;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}

	//快捷入口样式
	.h_quickEntry {
		background: #FFFFFF;
		padding: 32upx 0upx 0 0;

		.qui_titleView {
			font-size: 34upx;
			font-weight: bold;
			margin-left: 28upx;
		}
	}
	
	//六宫格样式
	.sixBackground {
		display: flex;
		justify-content: space-between; //换行留白
		flex-direction: row; //换行对齐
		flex-wrap: wrap; //循环换行
		padding: 20upx;
	
		//黑色暗幕，在图片上方覆盖一层渐变黑
		.darkCurtain {
			position: absolute;
			overflow: hidden;
			width: 212upx;
			height: 144upx;
			border-radius: 12upx;
			margin: 12upx 12upx;
			background: rgba(7, 17, 27, 0.1);
		}
	
		image {
			width: 212upx;
			height: 144upx;
			border-radius: 12upx;
			opacity: 1.5;
			margin: 12upx 12upx;
		}
	
		.sixView {
			position: absolute;
			text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
			white-space: nowrap;
			overflow: hidden;
			color: #fff;
			max-width: 192upx;
			margin-left: 24upx;
			margin-top: -106upx;
	
			.sixText1 {
				font-weight: bold;
				font-size: 30upx;
			}
	
			.sixText2 {
				display: block;
				font-size: 24upx;
			}
		}
	}

	//弹出层-通用字体样式
	.h_popupText {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}

	.STZXIcon {
		width: 318upx;
		height: 188upx;
		padding-right: 16upx;
		padding-top: 6upx;
	}

	.KYCXIcon {
		width: 318upx;
		height: 188upx;
		padding-left: 16upx;
		padding-top: 6upx;
	}
	
	//公示项目
	.gs_view{
		background: #FFFFFF; 
		padding: 32upx 0 80upx 0;
		.gs_title{
			margin: 0upx 32upx 32upx 32upx; 
			font-size: 34upx; 
			font-weight: bold;
		}
		.gs_swiper{
			margin-top: 32upx;
		}
	}

	//-------------------------------点击状态---------------------------
</style>
