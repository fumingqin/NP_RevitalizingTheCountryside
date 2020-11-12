<template>
	<view>
		<!-- 头部切换栏 -->
		<u-tabs :list="headList" :is-scroll="false" :current="headCurrent" @change="headChange" height="104"></u-tabs>

		<!-- 资讯列表 -->
		<view class="infor_view" v-for="(item,index) in informationList" :key="index" @click="detailsClick(item.id)">
			<view class="view_titleView">
				<text class="tv_view">
					<text class="tv_label" style="background: #007AFF;" v-if="item.order_state !== '已取消' ">{{statusMethod(item.order_state)}}</text>
					<text class="tv_label" style="background: #FA3534;" v-if="item.order_state == '申请失败' || item.order_state == '已取消'">{{statusMethod(item.order_state)}}</text>
					<text class="tv_title">科技特派员服务</text>
					<text class="tv_content"><text style="font-weight: bold;">乡村名：</text>{{item.villageName}}</text>
					<text class="tv_content"><text style="font-weight: bold;">技术类型：</text>{{item.apply_type}}</text>
					<text class="tv_content" selectable=""><text style="font-weight: bold;">技术问题：</text>{{item.content}}</text>
				</text>
			</view>

			<view class="view_contentView">
				<text>申请时间：{{informationDate(item.create_time)}}</text>
				<!-- <text class="cont_text"></text> -->
				<u-icon class="cont_icon" name="more-dot-fill"></u-icon>
			</view>
			<u-gap height="4" bg-color="#f9f9f9"></u-gap>
		</view>

		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 缺省提示 -->
		<view style="margin-top: 240upx;" v-if="informationList.length == 0">
			<u-empty text="您暂时没有任务哦~" mode="news"></u-empty>
		</view>

		<!-- 派员编号 -->
		<view class="operButton">
			<text class="buttonView2">您的特派员编号：{{commissionerID}}</text>
		</view>

		<!-- 压屏弹框 -->
		<u-modal v-model="modalStatus"  confirm-text="确认" title="检测到您不是特派员"  @confirm="modalConfirm" >
			<view class="u-update-content">
				<rich-text :nodes="modalContent"></rich-text>
			</view>
		</u-modal>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				headList: [{
					name: '待处理'
				}, {
					name: '已处理'
				}, {
					name: '其他'
				}], //头部数组
				headCurrent: 0, //头部tabs下标
				informationList: [], //资讯列表
				listStatusIndex: '', //资讯缺省提示初始值
				userInfo: '', //用户信息
				modalStatus: false, //压屏弹框
				modalContent :  `您需与相关村级/县市级职责管理人员添加您的特派员资质信息`,
				commissionerID : '',
			}
		},
		onLoad: function() {

		},
		onShow: function() {
			this.userData();
		},
		onPullDownRefresh: function() {
			this.loadData();
		},
		onUnload: () => {
			uni.removeStorage({
				key: 'pyfw_list'
			})
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
						this.loadData();
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
				console.log(this.userInfo.phoneNumber)
				uni.request({
					url: this.$pyfw.KyInterface.getListByPhone.Url,
					method: this.$pyfw.KyInterface.getListByPhone.method,
					data: {
						telephone : this.userInfo.phoneNumber
					},
					success: (res) => {
						console.log(res)
						if(res.data.msg == "您当前不是特派员" && res.data.status == false ){
							uni.stopPullDownRefresh()
							uni.hideLoading()
							this.modalStatus = true;
						}else if(res.data.status == false){
							uni.stopPullDownRefresh()
							uni.hideLoading()
						}else{
							if (this.headCurrent == 0) {
								this.informationList = res.data.data.filter(item => {
									return item.order_state == '已派员';
								})
								this.commissionerID = res.data.data[0].number;
							}else if (this.headCurrent == 1){
								this.informationList = res.data.data.filter(item => {
									return item.order_state == '已完成'
								})
								this.commissionerID = res.data.data[0].number;
							}else if (this.headCurrent == 2){
								this.informationList = res.data.data.filter(item => {
									return item.order_state == '已取消'
								})
								this.commissionerID = res.data.data[0].number;
							}
							uni.stopPullDownRefresh()
							uni.hideLoading()
						}
					}
				})
			},

			detailsClick: function(e) {
				console.log(e)
				uni.navigateTo({
					url: 'pyfw_py_details?id=' + e
				})
			},


			//资讯时间
			informationDate: function(e) {
				// console.log(e)
				// var tsetDate = e.replace('T',' ')
				if(e !== undefined){
					var a = e.substr(5, 11)
					return a;
				}else{
					return '';
				}
			},

			//点击tab切换
			headChange: function(e) {
				this.headCurrent = e;
				uni.showLoading({
					title: '加载信息中...'
				})
				this.loadData(e);
			},

			
			//点击压屏框返回上页面
			modalConfirm:function(e){
				console.log(e)
				uni.navigateBack()
			},
			
			//状态转编译
			statusMethod:function(e){
				if(e == '已派员'){
					return '待处理'
				}else if(e == '已完成'){
					return '已处理'
				}else{
					return e
				}
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
					padding: 4upx 8upx;
					// border-radius: 4upx;
				}

				.tv_title {
					font-weight: bold;
					font-size: 34upx;
					margin-left: 12upx;
					line-height: 1.7;
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
	
	//压屏弹框文本样式
	.u-update-content {
			font-size: 26rpx;
			color: $u-content-color;
			line-height: 1.7;
			padding: 30rpx;
		}
	
</style>
