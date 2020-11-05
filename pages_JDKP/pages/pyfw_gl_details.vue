<template>
	<view>
		<!-- 申请信息 -->
		<view class="deta_view">
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
			<view class="buttonView1 " hover-class="btn_Click" v-if="StepsIndex == 0 " @click="cancelShow = true">审批失败</view>
			<view class="buttonView2 " hover-class="btn_Click" v-if="StepsIndex == 0 " @click="examineSuccess">审批通过并派员</view>
		</view>

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
						<view class="listItem"  @click="Listclick(item)">
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
		<u-popup v-model="cancelShow" mode="bottom" :closeable="true" >
			<view class="box_Vlew">
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">请填写/选择审核失败的原因</text>
					</view>
				</view>
				<!-- 滑动区域 -->
				<scroll-view  style="margin: 32upx 0;" scroll-x>  
					<view style="display: flex;">
						<view class="box_scrollView" v-for="(item,index) in contentList" :key="index" @click="choiseListData(index)">
							<text class="scrollView_text">{{item}}</text>
						</view>
					</view>
				</scroll-view>
				
				<!-- 输入框 -->
				<view class="box_inputView" >
					<input class="inputStyle" v-model="contentInputData" type="text" placeholder="填写/选择失败原因"/>
				</view>
				
				<!-- 确认按钮 -->
				<view class="box_refundButtonView">
					<text class="box_refundButton" @click="approvalFailed(1)">确认</text>
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
				StepsIndex: -1, //绿条时间轴的下标数值
				stepsData: '', //详情数据
				id: '', //任务id
				PersonShow: false, //人员名单弹窗状态值
				userInfo: '', //用户信息
				cancelShow : false, //失败弹框状态值
				contentList : ['申请信息不正确','问题与类型不符','相关问题人员繁忙','乡村暂不支持派员'],//可选失败内容
				contentInputData : '', //失败输入框数据
				
				SearchStatus : false, //搜索状态值
				commissionerStatus : true,//特派员搜索状态值
				commissionerList : [],//特派员列表
				commissionerSearchList : [], //特派员搜索列表
				commissionerID: '',//特派员ID
				scrollHeight : '800upx',//弹框高度默认值
				
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
			//加载列表数据
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
						uni.hideLoading()
						uni.stopPullDownRefresh()
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
					data:{
						applyType : e.detail.value
					},
					success: (res) => {
						console.log(res)
						if(res.data.status){
							uni.hideLoading()
							this.commissionerSearchList = res.data.data;
						}else{
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon:'none'
							})
						}
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						})
					}
				})
			},
			
			//审批请求
			approvalFailed:function(e){
				uni.showLoading({
					title:'提交中...'
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
						id : this.id,
						user_id: this.stepsData.user_id,
						userId : this.userInfo.userId,
						state : e,
						failReason : this.contentInputData,
						commissionerId : this.commissionerID,
					},
					success: (res) => {
						console.log(res)
						if(res.data.status){
							uni.hideLoading()
							uni.showToast({
								title:'审核成功',
								success: () => {
									this.cancelShow = false;
									uni.startPullDownRefresh();
								}
							})
						}else{
							uni.hideLoading()
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
						
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title:'提交失败，服务器异常，刷新后请重试',
							icon:'none',
							success: () => {
								uni.startPullDownRefresh();
							}
						})
					}
				})
			},
			
			//点击插入文字
			choiseListData:function(e){
				var a = this.contentList[e]+'，';
				var b = this.contentInputData;
				var c = b.concat(a)
				this.contentInputData = c;
			},
			
			//状态转编译
			statusMethod:function(e){
				if(e == '申请中'){
					return '待审核'
				}else if(e == '已派员'){
					return '审核成功'
				}else if(e == '申请失败'){
					return '审核失败'
				}else{
					return e
				}
			},
			
			//审核成功，指派人员
			examineSuccess:function(){
				uni.showLoading({
					title:'检测人员情况...'
				})
				uni.request({
					url: this.$pyfw.KyInterface.getCommissionerList.Url,
					method: this.$pyfw.KyInterface.getCommissionerList.method,
					data:{
						applyType : this.stepsData.apply_type
					},
					success: (res) => {
						console.log(res)
						if(res.data.status){
							uni.hideLoading()
							this.PersonShow = true;
							this.commissionerList = res.data.data;
						}else{
							uni.hideLoading()
							uni.showToast({
								title: res.data.msg,
								icon:'none'
							})
							
						}
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						})
					}
				})
			},
			
			//列表点击赋值
			Listclick:function(e){
				console.log(e)
				uni.showModal({
					title:'您将选择‘' + e.name +'’作为特派员',
					content: '编号：'+e.number +'，手机号：' +e.telephone +'，技术类型：'+e.technology_type,
					success: (res) => {
						if(res.confirm){
							this.commissionerID = e.id;
							this.approvalFailed(0)
						}else{
							this.commissionerID = ''
						}
					}
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
		.box_scrollView{
			margin:40upx 0; 
			white-space: nowrap;
			.scrollView_text{
				margin-left:24upx; 
				padding: 16upx 32upx; 
				font-size: 28upx;  
				color: #AAAAAA; 
				border: 1upx solid #AAAAAA; 
				border-radius: 8upx;
			}
		}
		//输入区域
		.box_inputView{
			width: 100%; 
			background: #EEEEEE; 
			border-radius: 60upx;
			.inputStyle{
				height: 96upx; 
				padding:0 44upx; 
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
	
</style>
