<template>
	<view>
		<!-- 轮播区 -->
		<u-swiper :list="rotationChart" :height="422" indicator-pos="bottomRight"></u-swiper>

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
			<image style="width: 100%; height: 164upx;" :src="bannerImage" mode="aspectFill"></image>
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
		<!-- 乡村美景 -->
		<view class="h_quickEntry">
			<view class="qui_titleView">乡村美景</view>
			<view class="sixBackground">
				<view v-for="(item,index) in quickEntryData" :key="index" v-if="index < 6" @click="navigateToClick(0,item.id)">
					<view class="darkCurtain"></view>
					<image :src="item.image"></image>
					<view class="sixView">
						<text class="sixText1">{{item.title}}</text>
					</view>   
				</view>
			</view>
		</view>
		<!--  -->
		<!-- 公示项目 -->
		<view class="gs_view">
			<view class="gs_title">公示项目</view>
			<u-swiper class="gs_swiper" :list="advertisingMap" :effect3d="true" :title="true" bg-color="#ffffff" interval="4500" @click="navigateToClick"></u-swiper>
		</view>

		<!-- 隐藏协议弹出 -->
		<u-modal v-model="protocolStatus" :show-cancel-button="true" confirm-text="同意" title="服务协议和隐私政策" @confirm="agreeProtocol">
			<scroll-view scroll-y="true">
				<view class="h_popupText">
					<text>请你务必审慎阅读，充分理解“软件许可及服务协议”和“隐私政策”各条款。</br>你可阅读</text>
					<text style="color: #2F9BFE;" @click="agreementClick">《软件许可及服务协议》</text>
					<text>和</text>
					<text style="color: #2F9BFE;" @click="privacyClick">《隐私政策》</text>
					<text>了解详细信息。</br>如你同意，请点击“同意”开始接受我们的服务。</text>
				</view>
			</scroll-view>
		</u-modal>

		<!-- 发现新版本弹出 -->
		<u-modal v-model="downShow" :show-cancel-button="true" confirm-text="升级" title="发现新版本" @confirm="downloadApk">
			<scroll-view scroll-y="true">
				<view class="h_popupText">
					<rich-text :nodes="upgradeContent"></rich-text>
				</view>
			</scroll-view>
		</u-modal>
		<!-- 发现新版本弹出 -->
		<u-modal v-model="downLoadShow" title="正在下载新版本" confirm-text="取消下载" @confirm="cancelDownload">
			<view class="textClass">
				<text class="text_content">请勿关闭APP,下载完成后请安装APP</text>
			</view>
			<view class="lineClass">
				<u-line-progress :percent="percent" :show-percent="true" :striped-active="true"></u-line-progress>
			</view>

		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: [], //轮播图
				advertisingMap: [], //公开项目
				information: [], //新闻列表
				protocolStatus: false, //隐藏弹出层，f为不弹，t为弹

				currentDate: '', //当前时间
				upgradeContent: '',
				quickEntryData: [], //乡村美景数组
				bannerImage: '', //首页banner图片
				version: '', //应用版本参数

				//------------------------5个区域请求次数，限制只请求3次，如果还是无数据就提示---------------------
				LoatIndex: 0, //轮播图请求次数
				LoatIndex2: 0, //轮播图请求次数
				LoatIndex3: 0, //轮播图请求次数
				LoatIndex4: 0, //轮播图请求次数
				LoatIndex5: 0, //轮播图请求次数
				//------------------------------------------------------------------------------------------
				//------------------------下载参数---------------------
				downShow: false, //新版本弹框
				downLoadShow: false, //下载进度条
				downContent: '', //进度显示内容
				downloadTask: '', //下载任务
				percent: 0, //下载进度

				//------------------------------------------------------------------------------------------
				functionArray: [{
					array: [{
						name: '一村一档', //功能名称
						image: '../../static/home/vajra/yicunyidang.png', //功能图标
						display: true, //是否显示
						entrance: '../../pages_YCYD/pages/YCYD/villageList', //跳转路径
					}, {
						name: '乡村动态',
						image: '../../static/home/vajra/xiangcundongtai.png',
						display: true,
						entrance: '../../pages_XCDT/pages/ruralDynamics/rd_generalList',
					}, {
						name: '政策发布',
						image: '../../static/home/vajra/fabudongtai.png',
						display: true,
						entrance: '../../pages_ZCFB/pages/ZCFB/policyList',
					}, {
						name: '乡村评榜',
						image: '../../static/home/vajra/jidukaohe.png',
						display: true,
						entrance: '../../pages_JDKP/pages/jdkp_appraisalList',
					}, {
						name: '民情反馈',
						image: '../../static/home/vajra/minqingfankui.png',
						display: true,
						entrance: '../../pages_MQFK/pages/publicFeedback/pf_list',
					}]
				}], //功能数组
			}
		},

		onLoad: function() {
			// #ifdef APP-PLUS
			let pro = uni.getStorageSync('protocol')
			if (pro !== true) {
				this.protocolStatus = true;
			}
			this.version = plus.runtime.version; //获取应用版本号
			this.iponeModel = plus.device.vendor; //获取手机厂商
			console.log(this.iponeModel)
			this.checkClick();
			//#endif
			var a = uni.getStorageSync('guidePageData')
			if (a !== true) {
				this.cacheLoadData();
				uni.navigateTo({
					url: 'guidePage',
				})
			} else {
				this.cacheLoadData();
			}

			// this.getTodayDate();
			// #ifdef MP-WEIXIN
			// 校验小程序登录
			// this.getLoginState();
			//#endif
		},

		onShow: function() {
			
		},

		onPullDownRefresh: function() {
			this.cacheLoadData();
		},
		methods: {
			//加载缓存数据
			cacheLoadData: function() {
				//轮播图缓存
				uni.getStorage({
					key: 'rotationData',
					success: (res) => {
						this.rotationChart = res.data
						this.rotationLoadData();
					},
					fail: (err) => {
						this.rotationLoadData();
					}
				})

				//banner缓存
				uni.getStorage({
					key: 'bannerData',
					success: (res) => {
						// console.log('拿到缓存了',res)
						this.bannerImage = res.data.image
						this.bannerLoadData();
					},
					fail: (err) => {
						this.bannerLoadData();
					}
				})

				//跑马灯缓存
				uni.getStorage({
					key: 'lampData',
					success: (res) => {
						// console.log('拿到缓存了',res)
						this.information = [];
						this.information.push(res.data.content)
						this.lampLoadData();
					},
					fail: (err) => {
						this.lampLoadData();
					}
				})

				//乡村美景缓存
				uni.getStorage({
					key: 'countrysideData',
					success: (res) => {
						console.log('拿到缓存了', res)
						this.quickEntryData = res.data;
						this.countrysideLoadData();
					},
					fail: (err) => {
						this.countrysideLoadData();
					}
				})


				//公开项目缓存
				uni.getStorage({
					key: 'projectData',
					success: (res) => {
						// console.log('拿到缓存了',res)
						this.advertisingMap = res.data;
						this.projectLoadData();
					},
					fail: (err) => {
						this.projectLoadData();
					}
				})

			},

			//轮播图请求
			rotationLoadData: function() {
				//轮播图
				uni.request({
					url: this.$home.KyInterface.getImage.Url,
					method: this.$home.KyInterface.getImage.method,
					data: {
						type: '1'
					},
					success: (res) => {
						uni.stopPullDownRefresh()
						console.log('轮播区', res)
						if (res.data.data == '') {
							if (this.LoatIndex <= 10) {
								this.LoatIndex = 0;
								// uni.showToast({
								// 	title: '服务器异常，请联系客服',
								// 	icon: 'none'
								// })
							} else {
								this.LoatIndex = this.LoatIndex + 1;
								this.rotationLoadData();
							}

						} else {
							if (res.data.data.length >= 2) {
								this.rotationChart = res.data.data
								uni.setStorage({
									key: 'rotationData',
									data: res.data.data,
								})
							} else {
								this.rotationChart = [];
								this.rotationChart.push(res.data.data)
								uni.setStorage({
									key: 'rotationData',
									data: this.rotationChart,
								})
							}

						}
					},
					fail: function() {
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，请下拉刷新页面',
							icon: 'none'
						})
					}
				})
			},

			//banner请求
			bannerLoadData: function() {
				//banner图
				uni.request({
					url: this.$home.KyInterface.getImage.Url,
					method: this.$home.KyInterface.getImage.method,
					data: {
						type: '2'
					},
					success: (res) => {
						uni.stopPullDownRefresh()
						// console.log('banner', res)
						if (res.data.data == '') {
							if (this.LoatIndex2 <= 10) {
								this.LoatIndex2 = 0;
								// uni.showToast({
								// 	title: '服务器异常，请联系客服',
								// 	icon: 'none'
								// })
							} else {
								this.LoatIndex2 = this.LoatIndex2 + 1;
								this.bannerLoadData();
							}
						} else {
							this.bannerImage = res.data.data.image
							uni.setStorage({
								key: 'bannerData',
								data: res.data.data,
							})
						}
					},
					fail: function() {
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，请下拉刷新页面',
							icon: 'none'
						})
					}
				})
			},

			//跑马灯请求
			lampLoadData: function() {
				//跑马灯
				uni.request({
					url: this.$home.KyInterface.getMarquee.Url,
					method: this.$home.KyInterface.getMarquee.method,
					data: {
						location: '首页'
					},
					success: (res) => {
						uni.stopPullDownRefresh()
						// console.log('跑马灯',res)
						if (res.data.data == '') {
							if (this.LoatIndex3 <= 10) {
								this.LoatIndex3 = 0;
								// uni.showToast({
								// 	title: '服务器异常，请联系客服',
								// 	icon: 'none'
								// })
							} else {
								this.LoatIndex3 = this.LoatIndex3 + 1;
								this.lampLoadData();
							}
						} else {
							this.information = [];
							this.information.push(res.data.data.content)
							uni.setStorage({
								key: 'lampData',
								data: res.data.data,
							})
						}
					},
					fail: function() {
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，请下拉刷新页面',
							icon: 'none'
						})
					}
				})
			},

			//乡村美景请求
			countrysideLoadData: function() {
				//乡村美景
				uni.request({
					url: this.$home.KyInterface.getEconomy.Url,
					method: this.$home.KyInterface.getEconomy.method,
					success: (res) => {
						uni.stopPullDownRefresh()
						// console.log('乡村美景',res)
						if (res.data.data == '') {
							if (this.LoatIndex4 <= 10) {
								this.LoatIndex4 = 0;
								// uni.showToast({
								// 	title: '服务器异常，请联系客服',
								// 	icon: 'none'
								// })
							} else {
								this.LoatIndex4 = this.LoatIndex4 + 1;
								this.countrysideLoadData();
							}
						} else {
							this.quickEntryData = res.data.data;
							uni.setStorage({
								key: 'countrysideData',
								data: res.data.data,
							})
						}

					},
					fail: function() {
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，请下拉刷新页面',
							icon: 'none'
						})
					}
				})
			},

			//公开项目请求
			projectLoadData: function() {
				//公开项目
				uni.request({
					url: this.$home.KyInterface.getProject.Url,
					method: this.$home.KyInterface.getProject.method,
					success: (res) => {
						uni.stopPullDownRefresh()
						// console.log('公开项目',res)
						if (res.data.data == '') {
							if (this.LoatIndex5 <= 10) {
								this.LoatIndex5 = 0;
								// uni.showToast({
								// 	title: '服务器异常，请联系客服',
								// 	icon: 'none'
								// })
							} else {
								this.LoatIndex5 = this.LoatIndex5 + 1;
								this.projectLoadData();
							}
						} else {
							this.advertisingMap = res.data.data;
							uni.setStorage({
								key: 'projectData',
								data: res.data.data,
							})
						}

					},
					fail: function() {
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '网络异常，请下拉刷新页面',
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

			//页面跳转
			navigateToClick: function(index, e) {
				console.log(index)
				console.log(e)
				if (index == 0) {
					uni.navigateTo({
						url: '../../pages_SMJJ/pages/shuimeiEconomy/se_detailsPage?id=' + e,
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: 'pages_FBRCP/pages/agricultureProducts/ap_details?id=' + e,
					})
				}

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

			//版本数字转换
			toNum: function(a) {
				var a = a.toString();
				//也可以这样写 var c=a.split(/\./);
				var c = a.split('.');
				var num_place = ["", "0", "00", "000", "0000"],
					r = num_place.reverse();
				for (var i = 0; i < c.length; i++) {
					var len = c[i].length;
					c[i] = r[len] + c[i];
				}
				var res = c.join('');
				return res;
			},

			//版本对比
			cpr_version: function(a, b) {
				//返回true，有新版本
				//返回false，无新版本
				var oldVersion = this.toNum(a);
				var newVersion = this.toNum(b);
				if (oldVersion < newVersion) {
					return true;
				} else {
					return false;
				}
			},

			//请求接口，获取版本信息
			checkClick: function() {
				uni.request({
					url: this.$GrzxInter.Interface.getVersion.value,
					method: this.$GrzxInter.Interface.getVersion.method,
					success: (res) => {
						console.log(res, "版本号");
						if (res.data.status) {
							// console.log('系统版本',this.version)
							// console.log('服务器',res.data.data.version)
							if (this.cpr_version(this.version, res.data.data.version)) {
								// console.log('我进来了')
								this.downShow = true;
								this.upgradeContent = res.data.data.content;
							}
						}
					},
					fail: () => {

					},
				});
			},
			//--------------------------下载按钮--------------------------
			downloadApk: function() {
				if(this.iponeModel == 'Apple'){
					this.downShow = false;
					uni.showToast({
						title:'苹果用户请手动前往App Store进行更新，敬请谅解！',
						icon:'none',
						duration:3000,
					})
				}else{
					this.downShow = false;
					this.downLoadShow = true;
					console.log("下载apk");
					var that = this;
					that.downloadTask = uni.downloadFile({
						url: 'http://27.148.155.9:9248/LoadAppWebsite/振兴乡村APP.apk',
						success: (downloadResult) => {
							console.log(downloadResult, "下载文件apk");
							if (downloadResult.statusCode === 200) {
								this.downLoadShow = false;
								uni.showToast({
									title: '下载完成',
									icon: 'none',
								});
								plus.runtime.install(
									downloadResult.tempFilePath, {
										force: true
									},
									// function() {
									// 	uni.showToast({
									// 		title: '应用更新完成稍后将重启应用',
									// 		icon:'none'
									// 	});
									// 	setTimeout(() => {
									// 		plus.runtime.restart();
									// 	}, 1000);
									// },
									function(e) {
										uni.showToast({
											icon: 'none',
											title: e
										});
									}
								);
							} else {
								uni.showToast({
									title: '应用下载失败',
									icon: 'none'
								});
							}
						},
						fail(e) {
							uni.showToast({
								title: e,
								icon: 'none'
							});
						},
						complete: () => {
							setTimeout(() => {
								uni.hideLoading();
							}, 1000);
						}
					});
					// 监听下载进度
					that.downloadTask.onProgressUpdate((e) => {
						that.percent = e.progress;
					})
				}
				
				
			},

			//--------------------------后台下载--------------------------
			bgDownloadApk() {
				this.downShow = false;
			},
			//--------------------------取消下载--------------------------
			cancelDownload() {
				this.downLoadShow = false;
				uni.showToast({
					title: '亲~你取消更新APP啦！下次记得更新哦~',
					icon: 'none'
				})
				this.downloadTask.abort();
			},
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
			margin-top: -74upx;

			.sixText1 {
				font-weight: bold;
				font-size: 30upx;
			}
		}
	}

	//弹出层-通用字体样式
	.h_popupText {
		height: 400upx;
		font-size: 28rpx;
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
	.gs_view {
		background: #FFFFFF;
		padding: 32upx 0 80upx 0;

		.gs_title {
			margin: 0upx 32upx 32upx 32upx;
			font-size: 34upx;
			font-weight: bold;
		}

		.gs_swiper {
			margin-top: 32upx;
		}
	}

	//进度条样式
	.lineClass {
		width: 90%;
		margin: 20upx 5% 40upx 5%;
	}

	.textClass {
		width: 100%;
		text-align: center;
		padding: 16upx 0 0 8upx;

		.text_content {
			color: #FD5745;
			font-size: 30upx;
		}
	}

	//-------------------------------点击状态---------------------------
</style>
