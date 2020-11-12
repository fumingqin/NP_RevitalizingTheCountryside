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

				<view v-if="type==0">
					<view>
						<view class="warning">
							<text class="numberWarnings" style="color: #70c778;" v-if="groupTitle.warnNum <= 3">警告次数：{{groupTitle.warnNum}}</text>
							<text class="numberWarnings" style="color: #F29100;" v-if="groupTitle.warnNum > 3 && groupTitle.warnNum <= 6">警告次数：{{groupTitle.warnNum}}</text>
							<text class="numberWarnings" style="color: #E3424B;" v-if="groupTitle.warnNum > 6">警告次数：{{groupTitle.warnNum}}</text>
						</view>
						<u-read-more :toggle="toggle" :show-height="showHeight">
							<u-parse :html="groupTitle.content" :tag-style="style" :lazy-load="true" :show-with-animation="true"></u-parse>
						</u-read-more>
						<view class="ruralPersonCharge">
							<text class="rural">乡村名称：{{groupTitle.ruralName}}</text>
							<text class="personCharge">负责人：{{groupTitle.personName}}</text>
						</view>
						<view class="buttonClass" v-if="userInfo.duty=='市级职责人员' || userInfo.duty=='县级职责人员'">
							<view class="btnClass" style="background: #70c778;" hover-class="ve_hover" v-if="groupTitle.warnNum <= 3" @click="warning">警告</view>
							<view class="btnClass" style="background: #F29100;" v-if="groupTitle.warnNum > 3 && groupTitle.warnNum <= 6"
							 @click="warning">警告</view>
							<view class="btnClass" style="background: #E3424B;" v-if="groupTitle.warnNum > 6" @click="warning">警告</view>
						</view>
					</view>
				</view>

				<view style="margin: 40upx 0 0 80upx;padding-bottom: 252upx;" v-if="type==1 && pdfFile==true">
					<view style="margin-bottom: 30upx;">
						<view style="width: 600upx;text-indent : 0em;">文件名：{{groupTitle.pdfName[0]}}</view>
						<l-file ref="lFile" @up-success="onSuccess"></l-file>
						<view>
							<view style="display: flex;">
								<view class="at_button" @tap="onOpenDoc(groupTitle.pdfFile[0])">预览</view>
								<view class="at_button" @tap="onDown(groupTitle.pdfFile[0])">下载</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 缺省提示 -->
				<view style="padding:200upx 0" v-if="type==1 && pdfFile==false">
					<u-empty text="暂无相关文件哦~" mode="list"></u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rotationChart: [], //轮播图
				groupTitle: [],
				title: '农田基础建设项目',
				time: '2020-02-10',
				browse: '122',
				showHeight: 600,
				toggle: false,
				post: '市级职责人员',
				type: 0,
				id: '',
				pdfFile: false,
				userInfo: [],
				// 字符串的形式
				style: {
					p: 'letter-spacing: 4rpx;text-align: justify;line-height: 48rpx;font-size:30rpx;text-justify: inter-ideograph; text-indent: 2em;padding-bottom: 20rpx;padding-top: 20rpx;',
					span: 'font-size: 30rpx'
				},
			}
		},

		onLoad: function(param) {
			this.id = param.id;
			console.log(this.id)
		},

		onShow() {
			uni.showLoading({
				title: '加载详情中...',
			})
			this.userData();
		},

		onPullDownRefresh: function() {
			this.userData();
		},

		onUnload() {
			uni.hideLoading();
		},

		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						console.log('获取个人信息', this.userInfo)
						this.loadData();
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '您暂未登录，已为您跳转登录页面',
							icon: 'none',
							success: () => {
								uni.navigateTo({
									url: '../../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},

			//加载数据
			loadData: function() {
				uni.request({
					url: this.$fbxm.KyInterface.addViews.Url,
					method: this.$fbxm.KyInterface.addViews.method,
					data: {
						id: this.id
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
					url: this.$fbxm.KyInterface.getProjectDetailByID.Url,
					method: this.$fbxm.KyInterface.getProjectDetailByID.method,
					data: {
						id: this.id
					},
					success: (res) => {
						console.log('详情', res)
						if (res.data.status == true) {
							uni.hideLoading();
							uni.stopPullDownRefresh();
							this.groupTitle = res.data.data;
							if (this.groupTitle.pdfFile[0].length == 0) {
								this.pdfFile = false;
							} else {
								this.pdfFile = true;
							}
							// console.log('列表数据',this.groupTitle)
						} else {
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

			//----------------预览--------------------
			onOpenDoc(e) {
				let url = e;
				/* 下载返回临时路径（退出应用失效） */
				this.$refs.lFile.download(url)
					.then(path => {
						/* 预览 */
						this.$refs.lFile.open(path);
					});
			},
			//--------------下载---------------------
			onDown(e) {
				let url = e;
				this.$refs.lFile.download(url, 'local')
					.then(path => {
					console.log(path);
				});
			},


			warning: function() {
				uni.showModal({
					title: '您确认警告吗？',
					success: (res) => {
						console.log(res)
						if (res.confirm == true) {
							uni.showLoading({
								title: '正在警告....'
							})
							uni.request({
								url: this.$fbxm.KyInterface.warnProject.Url,
								method: this.$fbxm.KyInterface.warnProject.method,
								data: {
									id: this.id,
									userId:this.userInfo.userId,
									// userId: 100004,
									ruralId: this.groupTitle.ruralId
								},
								success: (res) => {
									console.log('警告成功', res)
									if (res.data.status == true) {
										uni.hideLoading()
										uni.showToast({
											title: '警告成功',
											icon: 'none'
										})
										uni.startPullDownRefresh();
									} else {
										uni.hideLoading()
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
										uni.startPullDownRefresh();
									}

								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title: '服务器异常，请重试',
										icon: 'success'
									})
									uni.startPullDownRefresh();
								}
							})
						} else {

						}
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

	.ovof_dp_background {
		position: absolute;
		z-index: 999;
		top: 376upx;
	}

	.ovof_dp_bg_background {
		padding: 30upx;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		width: 100%;
		background: #FFFFFF;
	}

	.ovof_dp_bg_title {
		color: #333333;
		font-size: 40upx;
		font-weight: bold;
		padding-top: 20rpx;
	}

	.ovof_dp_bg_time {
		display: flex;
		margin-top: 20upx;

		.time {
			font-size: 30upx;
			color: #888;
		}

		.browse {
			padding-left: 20upx;
			font-size: 30upx;
			color: #888;
		}
	}

	.u-content {
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

	.ruralPersonCharge {
		position: relative;
		width: 100%;
		text-align: right;
		margin-top: 40upx;
		padding-right: 20upx;

		.rural {
			display: block;
			font-size: 32upx;
			color: #888;
		}

		.personCharge {
			display: block;
			font-size: 32upx;
			color: #888;
			padding-top: 20upx;
			padding-bottom: 190upx;
		}
	}

	.warning {
		position: relative;
		width: 100%;
		margin-top: 50upx;
		padding-left: 20upx;

		.numberWarnings {
			display: block;
			font-size: 32upx;
		}
	}

	.buttonClass {
		position: fixed;
		bottom: 34upx;
		width: 96%;

		.btnClass {
			width: 100%;
			padding: 20upx 0;
			color: #FFFFFF;
			text-align: center;
			border-radius: 15upx;
			font-size: 34upx;
		}
	}

	//点击态
	.ve_hover {
		transition: all .3s; //过度
		border-radius: 15upx;
		opacity: 0.9;
		background: #E4E7ED;
	}

	.at_button {
		text-indent: 0em;
		padding: 16upx 68upx;
		// font-size: 24upx;
		border-radius: 6upx;
		border: 1upx solid #888;
		color: #888;
		margin-right: 24upx;
	}
</style>
