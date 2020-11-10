<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex" v-if="StepsIndex != 3 && StepsIndex != 4"></uni-steps>
			<uni-steps :options="stepsList2" :active="StepsIndex2" v-if="StepsIndex == 3" activeColor="#FA3534"></uni-steps>
			<uni-steps :options="stepsList3" :active="StepsIndex3" v-if="StepsIndex == 4" activeColor="#FA3534"></uni-steps>
		</view>

		<!-- 申请信息 -->
		<view class="deta_view">
			<view class="deta_title">申请信息</view>
			<view class="deta_text"><text>申请乡村：</text>{{stepsData.villageName}}</view>
			<view class="deta_text"><text>问题类型：</text>{{stepsData.apply_type}}</view>
			<view class="deta_text">
				<text>相关图片：</text><text v-if="stepsData.image == null">未上传</text>
				<view class="imageView">
					<image class="imageS" v-if="stepsData.image !== null" v-for="(item,index) in stepsData.image" :key="index" :src="item"
					 mode="aspectFill" @click="previewOpen(index)"></image>
				</view>
			</view>
			<view class="deta_text"><text>问题内容：</text>{{stepsData.content}}</view>
		</view>


		<!-- 特派员信息 -->
		<view class="deta_view">
			<view class="deta_title">特派员信息</view>
			<view class="deta_text"><text>姓名：</text>{{managerData(stepsData.manager_name)}}</view>
			<view class="deta_text"><text>电话：</text>{{managerData(stepsData.manager_telephone)}}</view>
			<view class="deta_text"><text>技术类型：</text>{{managerData(stepsData.manager_technologyType)}}</view>
			<view class="deta_text"><text>擅长内容：</text>{{managerData(stepsData.manager_goodType)}}</view>
		</view>

		<!-- 执行结果 -->
		<view class="deta_view" v-if="StepsIndex == 2">
			<view class="deta_title">执行结果</view>
			<view class="deta_text"><text>内容：</text>{{stepsData.result}}</view>
		</view>

		<!-- 失败原因 -->
		<view class="deta_view" v-if="StepsIndex == 3">
			<view class="deta_title">失败原因</view>
			<view class="deta_text"><text>内容：</text>{{managerData(stepsData.fail_error)}}</view>
		</view>

		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 功能按钮 -->
		<view class="operButton">
			<view class="buttonView1 " hover-class="btn_Click" v-if="StepsIndex == 0 " @click="cancelShow = true">取消申请</view>
			<view class="buttonView2 " hover-class="btn_Click" v-if="StepsIndex == 0 " @click="remindClick">提醒派员</view>
		</view>

		<!-- 取消弹框 -->
		<u-popup v-model="cancelShow" mode="bottom" :closeable="true">
			<view class="box_Vlew">
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">您确认取消申请吗?</text>
						<text class="box_refundContentText">一旦取消申请，将无法撤回</text>
					</view>
					<view class="box_refundButtonView">
						<text class="box_refundButton" @click="cancelClick">确认</text>
					</view>
				</view>
			</view>
		</u-popup>

		<previewImage ref="previewImage" :opacity="0.8" :imgs="stepsData.image"></previewImage>
	</view>
</template>

<script>
	import uniSteps from '../components/uni-steps/uni-steps.vue'; //引入时间轴
	import previewImage from '../components/kxj-previewImage/kxj-previewImage.vue'; //图片预览
	export default {
		components: {
			uniSteps, //声明时间轴组件
			previewImage //声明图片预览组件
		},
		data() {
			return {
				stepsList: [{
					title: '申请中'
				}, {
					title: '执行中'
				}, {
					title: '已完成'
				}], //时间轴的标题数组
				stepsList2: [{
					title: '提交申请'
				}, {
					title: '审核中'
				}, {
					title: '申请失败'
				}], //时间轴的标题数组
				stepsList3: [{
					title: '提交申请'
				}, {
					title: '审核中'
				}, {
					title: '已取消'
				}], //时间轴的标题数组
				StepsIndex: 0, //绿条时间轴的下标数值
				StepsIndex2: 2, //红条时间轴的下标数值
				StepsIndex3: 2, //红条时间轴的下标数值
				stepsData: '', //详情数据
				id: '', //申请id
				userInfo: '', //用户信息
				cancelShow : false, //取消弹框状态值
			}
		},
		onLoad: function(e) {
			// console.log(e)
			this.id = e.id;
		},
		onShow:function(){
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
					title: '加载数据中...'
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
			//加载详情数据
			loadData: function(e) {
				uni.request({
					url: this.$pyfw.KyInterface.getDetailById.Url,
					method: this.$pyfw.KyInterface.getDetailById.method,
					data: {
						id: this.id
					},
					success: (res) => {
						console.log(res)
						this.stepsData = res.data.data;
						if (res.data.data.order_state == '申请中') {
							this.StepsIndex = 0
						} else if (res.data.data.order_state == '已派员') {
							this.StepsIndex = 1
						} else if (res.data.data.order_state == '已完成') {
							this.StepsIndex = 2
						} else if (res.data.data.order_state == '申请失败') {
							this.StepsIndex = 3
						} else if (res.data.data.order_state == '已取消') {
							this.StepsIndex = 4
						}
						uni.stopPullDownRefresh()
						uni.hideLoading()
					}
				})
			},

			//---------------------数据转编译
			managerData: function(e) {
				if (e == '') {
					return '暂无'
				} else {
					return e
				}
			},

			//打开详情图
			previewOpen: function(e) {
				console.log(e);
				this.$refs.previewImage.open(e); // 传入当前选中的图片地址或序号
			},

			//取消申请
			cancelClick: function() {
				uni.showLoading({
					title:'提交中...'
				})
				uni.request({
					url: this.$pyfw.KyInterface.cancelCommissionery.Url,
					method: this.$pyfw.KyInterface.cancelCommissionery.method,
					data: {
						id: this.id,
						user_id: this.stepsData.user_id,
						userId: this.userInfo.userId
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						if(res.data.status){
							uni.showToast({
								title: '取消成功',
								success: () => {
									this.cancelShow = false;
									uni.startPullDownRefresh()
								}
							})
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none'
							})
						}
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '取消失败，等待刷新后重试',
							icon: 'none',
							success: () => {
								uni.startPullDownRefresh()
							}
						})
					}
				})
			},
			
			remindClick:function(){
				uni.showToast({
					title:'提醒成功',
				})
			}
		}

	}
</script>

<style lang="scss">
	.operButton {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;

		.buttonView1 {
			width: 25%;
			background: #F5F5F5;
			color: #333333;
			font-size: 26upx;
			line-height: 3.5;
		}

		.buttonView2 {
			width: 75%;
			background: #18B566;
			color: #FFFFFF;
			font-size: 32upx;
			line-height: 3;
		}
	}

	//图片样式
	.imageView {
		display: flex;
		margin-top: 20upx;

		.imageS {
			display: block;
			width: 212upx;
			height: 212upx;
			margin-right: 20upx;
		}
	}

	//主体文字样式
	.deta_view {
		padding: 0upx 32upx;

		.deta_title {
			margin: 8upx 0;
			font-weight: bold;
			font-size: 34upx;
			margin-top: 24upx;
		}

		.deta_text {
			font-size: 30upx;
			padding: 20upx 16upx;
		}
	}
	
	//须知弹框
	.box_Vlew {
		padding: 16upx 40upx;
		padding-bottom: 24upx;
		background: #FFFFFF;
		font-size: 36upx;
	
		.box_titleView {
			margin: 24upx 0;
	
			//弹框标题
			.box_title {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}
		}
	
		// 退款弹框
		.box_refundView {
			margin: 24upx 0upx;
	
			.box_refundText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #333;
			}
	
			//确认退票
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;
	
				.box_refundContentTitle {
					font-weight: bold;
				}
	
				.box_refundContentText {
					margin-top: 24upx;
					display: block;
					font-size: 28upx;
					color: #888;
				}
			}
	
			.box_refundButtonView {
				text-align: center;
				margin: 56upx 0;
	
				//确认按钮
				.box_refundButton {
					color: #FFFFFF;
					border-radius: 56upx;
					background: #FF6600;
					padding: 24upx 160upx;
				}
			}
		}
	}
</style>
