<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex" :hidden="stepsData.state == '已取消'"></uni-steps>
			<uni-steps :options="stepsList2" :active="StepsIndex" v-if="stepsData.state == '已取消'" activeColor="#FA3534"></uni-steps>
		</view>
		<!-- 申请信息 -->
		<!-- <view class="deta_view">
			<view class="deta_title">申请信息</view>
			<view class="deta_text"><text>审核状态：</text>{{statusMethod(stepsData.order_state)}}</view>
			<view class="deta_text"><text>申请乡村：</text>{{stepsData.villageName}}</view>
			<view class="deta_text"><text>问题类型：</text>{{stepsData.apply_type}}</view>
			<view class="deta_text">
				<text>相关图片：</text><text v-if="stepsData.image == null">未上传</text>
				<view class="imageView">
					<image class="imageS" v-if="stepsData.image !== null" v-for="(item,index) in stepsData.image" :key="index" :src="item" mode="aspectFill" @click="previewOpen(index)"></image>
				</view>
			</view>
			<view class="deta_text"><text>问题内容：</text>{{stepsData.content}}</view>
		</view> -->

		<!-- 申请信息 -->
		<view class="deta_view">
			<view class="deta_title">考评信息</view>
			<view class="deta_text"><text>考评标题：</text>{{stepsData.title}}</view>
			<view class="deta_text"><text>考评乡村：</text>{{stepsData.rural_name}}</view>
			<view class="deta_text"><text>考评截至：</text>{{informationDate(stepsData.reviewTime)}}</view>



		</view>

		<!-- 发布人信息 -->
		<view class="deta_view">
			<view class="deta_title">发布人信息</view>
			<view class="deta_text"><text>发布人：</text>{{stepsData.nick_name}}</view>
			<view class="deta_text"><text>发布时间：</text>{{informationDate(stepsData.update_time)}}</view>
			<view class="deta_text"><text>发布人电话：</text>{{phoneConvert(publisherPhone)}}</view>
		</view>

		<!-- 考评人信息 -->
		<view class="deta_view">
			<view class="deta_title">考评人信息</view>
			<view class="deta_text"><text>编号：</text>{{stepsData.examiner_number}}</view>
			<view class="deta_text"><text>姓名：</text>{{stepsData.examiner_name}}</view>
			<view class="deta_text"><text>电话：</text>{{phoneConvert(assessorPhone)}}</view>
		</view>


		<!-- 特派员信息 -->
		<!-- <view class="deta_view">
			<view class="deta_title">特派员信息</view>
			<view class="deta_text"><text>姓名：</text>{{managerData(stepsData.manager_name)}}</view>
			<view class="deta_text"><text>电话：</text>{{managerData(stepsData.manager_telephone)}}</view>
			<view class="deta_text"><text>技术类型：</text>{{managerData(stepsData.manager_technologyType)}}</view>
			<view class="deta_text"><text>擅长内容：</text>{{managerData(stepsData.manager_goodType)}}</view>
		</view> -->

		<view class="deta_view">
			<view class="deta_title">考评指标</view>
			<view class="deta_text">
				<view class="allBtn" @click="open()">查看指标详情</view>
			</view>
		</view>
		<!-- 执行结果 -->
		<view class="deta_view" v-if="StepsIndex == 2">
			<view class="deta_title">考评结果</view>
			<view class="deta_text"><text>分数：</text>{{stepsData.score}}分</view>
		</view>


		<!-- 失败原因 -->
		<view class="deta_view" v-if="StepsIndex == 3">
			<view class="deta_title">失败原因</view>
			<view class="deta_text"><text>内容：</text>该考评任务已被取消</view>
		</view>


		<uni-popup ref="popup" type="bottom">
			<view class="boxVlew">
				<view class="titleView">
					<text class="Nb_text1">指标详情</text>
					<text class="Nb_text2 jdticon icon-fork " @click="close()"></text>
				</view>
				<scroll-view class="noticeBox" scroll-y="ture">
					<view v-for="(item,index) in stepsData.item" :key="index" style="margin:12upx;">
						<view class="teskName">{{index+1}}.{{item.itemTitle}}</view>
						<view class="teskView">
							<view class="teskScore">满分:{{item.itemscore}}分</view>
							<view v-if="stepsData.state=='已完成'">
								<view class="teskGrade">评分:{{item.score}}分</view>
							</view>
							<view v-if="stepsData.state!='已完成'">
								<view class="teskGrade">评分:暂无评分</view>
							</view>
							<view>
								<image :src="imageDate(item.image)" class="teskimage" @click="goImgList(imageDate(item.image))"></image>
								<!-- <image v-if="item.image == '[]'" src="../static/tupian.png" mode="aspectFill"></image> -->
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>

		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.state == '已发布' && userInfo.duty == '村级职责人员' ">
			<view class="buttonView1" hover-class="btn_Click" @click="TelephoneClick(0)">联系发布人</view>
			<view class="buttonView2" hover-class="btn_Click" @click="TelephoneClick(1)">联系考评人</view>
		</view>

		<view class="operButton" v-if="stepsData.state !== '已发布' && userInfo.duty == '村级职责人员'">
			<view class="buttonView1" hover-class="btn_Click" @click="TelephoneClick(0)">联系发布人</view>
			<view class="buttonView2" hover-class="btn_Click" @click="TelephoneClick(1)">联系考评人</view>
		</view>

		<!-- 功能按钮 -->
		<!-- <view class="operButton">
			<view class="buttonView1 " hover-class="btn_Click" v-if="StepsIndex == 0 " @click="cancelShow = true">审批失败</view>
			<view class="buttonView2 " hover-class="btn_Click" v-if="StepsIndex == 0 " @click="examineSuccess">审批通过并派员</view>
		</view> -->

		<u-popup v-model="PersonShow" mode="center">
			<view>
				<!-- 顶部搜索框 -->
				<view class="topSerchView">
					<view class="SearchBar" elevation='5px'>
						<input class="addressInput" @input="onInput" placeholder="请输入类型搜索" />
					</view>
				</view>


				<!-- 搜索列表 -->
				<view class="stationList" :style="{ 'height':scrollHeight }" v-if="SearchStatus">
					<block v-for="(item,index) in commissionerSearchList" :key="index">
						<view class="listItem" @click="Listclick(item)">
							<rich-text :nodes="item.number +' - '+ item.good_type +' - '+ item.name +' - '+ item.telephone"></rich-text>
						</view>
					</block>
				</view>

				<!-- 原列表 -->
				<view class="stationList" :style="{ 'height':scrollHeight }" v-if="commissionerStatus">
					<block v-for="(item,index) in commissionerList" :key="index">
						<view class="listItem" @click="Listclick(item)">
							<rich-text :nodes="item.number +' - '+ item.good_type +' - '+ item.name +' - '+ item.telephone"></rich-text>
						</view>
					</block>
				</view>

				<view class="operButton">
					<text class="buttonView2" style="width: 100%;" @click="PersonShow = false">关闭弹框</text>
				</view>
			</view>
		</u-popup>

		<!-- 失败弹框 -->
		<u-popup v-model="cancelShow" mode="bottom" :closeable="true">
			<view class="box_Vlew">
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">请填写/选择审核失败的原因</text>
					</view>
				</view>
				<!-- 滑动区域 -->
				<scroll-view style="margin: 32upx 0;" scroll-x>
					<view style="display: flex;">
						<view class="box_scrollView" v-for="(item,index) in contentList" :key="index" @click="choiseListData(index)">
							<text class="scrollView_text">{{item}}</text>
						</view>
					</view>
				</scroll-view>

				<!-- 输入框 -->
				<view class="box_inputView">
					<input class="inputStyle" v-model="contentInputData" type="text" placeholder="填写/选择失败原因" />
				</view>

				<!-- 确认按钮 -->
				<view class="box_refundButtonView">
					<text class="box_refundButton" @click="approvalFailed(1)">确认</text>
				</view>
			</view>
		</u-popup>

		<!-- <previewImage ref="previewImage" :opacity="0.8" :imgs="stepsData.image"></previewImage> -->
	</view>
</template>

<script>
	import uniSteps from '../components/uni-steps/uni-steps.vue'; //引入时间轴
	import previewImage from '../components/kxj-previewImage/kxj-previewImage.vue'; //图片预览
	import uniPopup from "@/pages_JDKP/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniSteps, //声明时间轴组件
			previewImage, //声明图片预览组件
			uniPopup
		},
		data() {
			return {
				stepsList: [{
					title: '待考评'
				}, {
					title: '考评中'
				}, {
					title: '已考评'
				}], //时间轴的标题数组
				stepsList2: [{
					title: '待考评'
				}, {
					title: '考评中'
				}, {
					title: '已取消'
				}], //时间轴的标题数组
				StepsIndex: -1, //绿条时间轴的下标数值
				stepsData: '', //详情数据

				//-------------------以下是显示的电话号码参数-----------------
				publisherPhone: '', //发布人电话
				assessorPhone: '', //考评人电话


				id: '', //任务id
				PersonShow: false, //人员名单弹窗状态值
				userInfo: '', //用户信息
				cancelShow: false, //失败弹框状态值
				contentList: ['申请信息不正确', '问题与类型不符', '相关问题人员繁忙', '乡村暂不支持派员'], //可选失败内容
				contentInputData: '', //失败输入框数据

				SearchStatus: false, //搜索状态值
				commissionerStatus: true, //特派员搜索状态值
				commissionerList: [], //特派员列表
				commissionerSearchList: [], //特派员搜索列表
				commissionerID: '', //特派员ID
				scrollHeight: '800upx', //弹框高度默认值


			}
		},
		onLoad: function(e) {
			/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
			this.id = e.id;
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
						this.loadData()
						console.log('获取个人信息', this.userInfo)
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '您暂未登录，已为您跳转登录页面',
							icon: 'none',
							success: () => {
								uni.navigateTo({
									url: '../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},
			//加载列表数据
			loadData: function(e) {
				uni.request({
					url: this.$jdkp.KyInterface.getEvaluationById.Url,
					method: this.$jdkp.KyInterface.getEvaluationById.method,
					data: {
						id: this.id
					},
					success: (res) => {
						console.log(res)
						this.stepsData = res.data.data;
						this.publisherPhone = res.data.data.phoneNumber;
						this.assessorPhone = res.data.data.examiner_phone;
						if (res.data.data.state == '已发布') {
							this.StepsIndex = 1
						} else if (res.data.data.state == '已完成' || res.data.data.state == '已取消') {
							this.StepsIndex = 2
						}
						uni.hideLoading()
						uni.stopPullDownRefresh()
					},
					fail: (err) => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						uni.showToast({
							title: '加载数据失败，刷下拉刷新重试',
							icon: 'none'
						})
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

			//关键字搜索
			onInput: function(e) {
				console.log('监听输入', e)
				//以下示例截取淘宝的关键字，请替换成你的接口
				if (e.detail.value != '') {
					this.commissionerStatus = false;
					this.SearchStatus = true;
				} else {
					this.commissionerStatus = true;
					this.SearchStatus = false;
				}

				uni.showLoading();
				uni.request({
					url: this.$pyfw.KyInterface.getCommissionerList.Url,
					method: this.$pyfw.KyInterface.getCommissionerList.method,
					data: {
						applyType: e.detail.value
					},
					success: (res) => {
						console.log(res)
						if (res.data.status) {
							uni.hideLoading()
							this.commissionerSearchList = res.data.data;
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},

			//审批请求
			approvalFailed: function(e) {
				uni.showLoading({
					title: '提交中...'
				})
				console.log(this.id)
				console.log(this.stepsData.user_id)
				console.log(this.userInfo.userId)
				console.log(this.stepsData.user_id)
				console.log(this.contentInputData)
				uni.request({
					url: this.$pyfw.KyInterface.auditCommissionery.Url,
					method: this.$pyfw.KyInterface.auditCommissionery.method,
					data: {
						id: this.id,
						user_id: this.stepsData.user_id,
						userId: this.userInfo.userId,
						state: e,
						failReason: this.contentInputData,
						commissionerId: this.commissionerID,
					},
					success: (res) => {
						console.log(res)
						if (res.data.status) {
							uni.hideLoading()
							uni.showToast({
								title: '审核成功',
								success: () => {
									this.cancelShow = false;
									uni.startPullDownRefresh();
								}
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}

					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '提交失败，服务器异常，刷新后请重试',
							icon: 'none',
							success: () => {
								uni.startPullDownRefresh();
							}
						})
					}
				})
			},

			//点击插入文字
			choiseListData: function(e) {
				var a = this.contentList[e] + '，';
				var b = this.contentInputData;
				var c = b.concat(a)
				this.contentInputData = c;
			},

			//状态转编译
			statusMethod: function(e) {
				if (e == '申请中') {
					return '待审核'
				} else if (e == '已派员') {
					return '审核成功'
				} else if (e == '申请失败') {
					return '审核失败'
				} else {
					return e
				}
			},

			//审核成功，指派人员
			examineSuccess: function() {
				uni.showLoading({
					title: '检测人员情况...'
				})
				uni.request({
					url: this.$pyfw.KyInterface.getCommissionerList.Url,
					method: this.$pyfw.KyInterface.getCommissionerList.method,
					data: {
						applyType: this.stepsData.apply_type
					},
					success: (res) => {
						console.log(res)
						if (res.data.status) {
							uni.hideLoading()
							this.PersonShow = true;
							this.commissionerList = res.data.data;
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})

						}
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},

			//列表点击赋值
			Listclick: function(e) {
				console.log(e)
				uni.showModal({
					title: '您将选择‘' + e.name + '’作为特派员',
					content: '编号：' + e.number + '，手机号：' + e.telephone + '，技术类型：' + e.technology_type,
					success: (res) => {
						if (res.confirm) {
							this.commissionerID = e.id;
							this.approvalFailed(0)
						} else {
							this.commissionerID = ''
						}
					}
				})
			},
			//资讯时间
			informationDate: function(e) {
				if (e !== undefined) {
					var a = e.substr(0, 10)
					return a;
				} else {
					return '';
				}
			},
			//拨打申请人电话
			TelephoneClick: function(e) {
				if (e == 0) {
					if (this.stepsData.phoneNumber == '') {
						uni.showToast({
							title: '相关发布人电话错误，请联系客服处理',
							icon: 'none'
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: this.stepsData.phoneNumber
						})
					}

				} else {
					if (this.stepsData.examiner_phone == '') {
						uni.showToast({
							title: '相关考评人电话错误，请联系客服处理',
							icon: 'none'
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: this.stepsData.examiner_phone
						})
					}
				}

			},
			//打开popup下弹框
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},

			//电话转换
			phoneConvert: function(e) {
				var a = e.substr(0, 3) + '****' + e.substr(7, 11)
				return a
			},
			imageDate: function(e) {
				if (e == "") {
					return "暂无"
				} else {
					var a = JSON.parse(e);
					return a[0];
				}

			},
			
			//保存图片至本地并打开新页面
			goImgList(e) {
				uni.setStorageSync('imagePiclist', e);
				uni.navigateTo({
					url: 'imgPreview4',
				})
			},

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
			width: 35%;
			background: #F5F5F5;
			color: #333333;
			font-size: 26upx;
			line-height: 3.5;
		}

		.buttonView2 {
			width: 65%;
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

	//审核弹框
	.box_Vlew {
		padding: 16upx 40upx;
		padding-bottom: 24upx;
		background: #FFFFFF;

		//标题样式
		.box_refundView {
			margin: 24upx 0upx;

			//确认
			.box_refundContentView {
				margin-top: 64upx;
				text-align: center;

				.box_refundContentTitle {
					font-size: 36upx;
					font-weight: bold;
				}
			}
		}

		//滑动区域
		.box_scrollView {
			margin: 40upx 0;
			white-space: nowrap;

			.scrollView_text {
				margin-left: 24upx;
				padding: 16upx 32upx;
				font-size: 28upx;
				color: #AAAAAA;
				border: 1upx solid #AAAAAA;
				border-radius: 8upx;
			}
		}

		//输入区域
		.box_inputView {
			width: 100%;
			background: #EEEEEE;
			border-radius: 60upx;

			.inputStyle {
				// height: 96upx;
				padding: 26upx 44upx 26upx 44upx;
				font-size: 30upx;
			}
		}

		//确认按钮
		.box_refundButtonView {
			text-align: center;
			margin: 56upx 0;
			margin-top: 72upx;

			//确认按钮
			.box_refundButton {
				font-size: 34upx;
				color: #FFFFFF;
				border-radius: 56upx;
				background: #FF6600;
				padding: 24upx 160upx;
			}
		}
	}

	//关键字搜索
	.topSerchView {
		background-color: #DBDBDB;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		width: 750upx;

		.SearchBar {
			background-color: #FFFFFF;
			margin-right: 20rpx;
			margin-left: 20rpx;
			box-shadow: 0px 4px 9px 1px rgba(204, 204, 204, 1);
			flex-direction: row;
			border-radius: 9px;
			padding: 20rpx;
			align-items: center;
			justify-content: space-between;
		}

		//地址搜索输入
		.addressInput {
			color: #999999;
			font-size: 30rpx;
			font-weight: 300;
		}
	}

	//站点列表
	.stationList {
		background-color: #FFFFFF;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;

		.listItem {
			padding: 12rpx 0;
			margin-left: 20rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
	}

	.allBtn {
		padding-top: 12upx;
		font-size: 30upx;
		background-color: #fff;
		color: #06B4FD;
	}

	.boxVlew {
		width: 100%;
		padding: 16upx 40upx;
		// padding-bottom: 92upx;
		background: #FFFFFF;

		.titleView {
			margin: 24upx 0;

			//弹框标题
			.Nb_text1 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
				margin-bottom: 16upx;
			}

			//弹框关闭按钮
			.Nb_text2 {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		.noticeBox {
			height: 800upx;
			line-height: 32upx;

			.teskName {
				width: 660upx;
				padding: 8upx 0upx;
				// text-align: center;
				font-size: 32upx;
				font-weight: bold;
			}

			.teskView {
				position: relative;
				display: flex;

				.teskimage {
					width: 100upx;
					height: 100upx;
				}

				.teskScore {
					position: absolute;
					left: 0;
					margin-left: 160upx;
					margin-top: 20upx;
					font-size: 26upx;
					color: #888;
				}

				.teskGrade {
					position: absolute;
					left: 0;
					margin-left: 160upx;
					margin-top: 70upx;
					font-size: 26upx;
					color: #ff0000;
				}
			}

		}
	}
</style>
