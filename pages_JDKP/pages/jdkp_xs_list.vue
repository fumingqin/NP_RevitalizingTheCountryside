<template>
	<view>
		<!-- 头部切换栏 -->
		<u-tabs :list="headList" :is-scroll="false" :current="headCurrent" @change="headChange" height="104"></u-tabs>

		<!-- 资讯列表 -->
		<view class="infor_view" v-for="(item,index) in informationList" :key="index" v-if="index < page" @click="detailsClick(item.id)">
			<view class="view_titleView">
				<text class="tv_view">
					<text class="tv_label" style="background: #007AFF;" v-if="item.state == '已完成'">{{item.state}}</text>
					<text class="tv_label" style="background: #FF6600;" v-if="item.state == '已发布'">待考评</text>
					<text class="tv_label" style="background: #FA3534;" v-if="item.state == '已取消'">{{item.state}}</text>
					<text class="tv_title">{{item.title}}</text>
					<text class="tv_content"><text style="font-weight: bold;">乡村名：</text>{{item.rural_name}}</text>
					<text class="tv_content"><text style="font-weight: bold;">发布人：</text>{{item.nick_name}}</text>
					<text class="tv_content" selectable=""><text style="font-weight: bold;">考评截至：</text>{{informationDate(item.reviewTime)}}</text>
				</text>
			</view>

			<view class="view_contentView">
				<text>发布时间：{{informationDate(item.create_time)}}</text>
				<!-- <text class="cont_text"></text> -->
				<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
			</view>
			<u-gap height="4" bg-color="#f9f9f9"></u-gap>
		</view>

		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 缺省提示 -->
		<view style="margin-top: 360upx;" v-if="informationList.length == 0">
			<u-empty text="您暂无考评信息哦~" mode="news"></u-empty>
		</view>

		<!-- 派员编号 -->
		<view class="operButton">
			<text class="buttonView2" @click="operClick">发布考评</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				headList: [{
					name: '全部'
				}, {
					name: '执行中'
				}, {
					name: '其他'
				}], //头部数组
				headCurrent: 0, //头部tabs下标
				informationList: [], //资讯列表
				userInfo: '', //用户信息
				
				userStatus : false,
				
				//-------------前端分割加载更多--------------
				page : 8,//加载数据量
				isLoadMore:false,//是否加载中
			}
		},
		onLoad: function() {
			uni.showLoading({
				title: '加载信息中...'
			})
			this.userData();
		},
		onShow: function() {
			setTimeout(() => {
				if(this.userStatus){
					console.log(this.userStatus)
					this.loadData();
				}
			},2000)
		},
		onPullDownRefresh: function() {
			this.loadData();
		},
		onUnload: () => {
			uni.removeStorage({
				key: 'pyfw_list'
			})
		},
		onReachBottom:function(){
			this.page = this.page +8
		},
		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						if(this.userStatus == false){
							this.loadData();
						}
						console.log('获取个人信息', this.userInfo)
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title:'您暂未登录，已为您跳转登录页面',
							icon:'none',
							success: () => {
								uni.navigateTo({
									url : '../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},
			//加载接口数据
			loadData: function() {
				uni.request({
					url: this.$jdkp.KyInterface.getEvaluationByUserId.Url,
					method: this.$jdkp.KyInterface.getEvaluationByUserId.method,
					data: {
						userId: this.userInfo.userId
					},
					success: (res) => {
						console.log(res)
						this.userStatus = true;
						this.informationList = '';
						if (this.headCurrent == 0) {
							this.informationList = res.data.data
						} else if (this.headCurrent == 1 &&res.data.data.length!=0) {
							this.informationList = res.data.data.filter(item => {
								return item.state == '已发布';
							})
						} else if (this.headCurrent == 2&&res.data.data.length!=0) {
							this.informationList = res.data.data.filter(item => {
								return item.state == '已完成' || item.state == '已取消' ;
							})
						}
						uni.stopPullDownRefresh()
						uni.hideLoading()
					},
					fail: (err) => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						uni.showToast({
							title:'加载数据失败，刷下拉刷新重试',
							icon:'none'
						})
					}
				})
			},

			detailsClick: function(e) {
				console.log(e)
				uni.navigateTo({
					url: 'jdkp_xs_details?id=' + e
				})
			},


			//资讯时间
			informationDate: function(e) {
				// console.log(e)
				// var tsetDate = e.replace('T',' ')
				var a = e.substr(0, 10)
				return a;
			},


			//点击tab切换
			headChange: function(e) {
				this.headCurrent = e;
				uni.showLoading({
					title: '加载信息中...'
				})
				this.loadData(e);
			},

			//申请特派员
			operClick: function() {
				uni.navigateTo({
					url: 'jdkp_xs_edit'
				})
			}
		}
	}
</script>

<style lang="scss">
	//资讯列表样式
	.infor_view {
		padding: 0 32upx;
		margin-top: 32upx;

		.view_titleView {
			display: flex;

			.tv_view {
				padding-right: 32upx;

				.tv_label {
					font-size: 24upx;
					color: #FFFFFF;
					padding: 6upx 8upx;
					// border-radius: 4upx;
				}

				.tv_title {
					font-weight: bold;
					font-size: 34upx;
					margin-left: 12upx;
					line-height: 1.8;
				}

				.tv_content {
					display: block;
					font-size: 28upx;
					margin-top: 6upx;
					line-height: 1.7;
				}
			}

			.tv_image {
				width: 220upx;
				height: 160upx;
				// border-radius: 8upx;
			}
		}

		.view_contentView {
			font-size: 24upx;
			color: #AAAAAA;
			padding: 16upx 0;
			margin-bottom: 16upx;

			.cont_text {
				margin-left: 20upx;
			}

			.cont_icon {
				float: right;
				padding: 12upx 0;
				margin-right: 16upx;
			}
		}
	}

	//派员编号
	.operButton {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;

		.buttonView2 {
			width: 100%;
			background: #18B566;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}
	}
</style>
