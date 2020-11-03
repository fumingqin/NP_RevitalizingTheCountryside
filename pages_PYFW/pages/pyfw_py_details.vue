<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex" v-if="stepsData.order_state == '已派员' || stepsData.order_state == '已完成'"></uni-steps>
			<uni-steps :options="stepsList" :active="StepsIndex" v-if="stepsData.order_state == '已取消'" activeColor="#FA3534"></uni-steps>
		</view>
		
		<!-- 申请信息 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="申请信息" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>申请乡村：</text>{{stepsData.villageName}}</view>
			<view style="padding: 0 32rpx;"><text>申请人：</text>{{stepsData.nick_name}}</view>
			<view style="padding: 0 32rpx;"><text>联系电话：</text>{{stepsData.telephone}}</view>
		</u-form-item>
		
		
		<!-- 问题内容 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题内容" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>问题类型：</text>{{stepsData.apply_type}}</view>
			<view style="padding: 0 32rpx;">
				<text>相关图片：</text><text v-if="stepsData.image == null">未上传</text>
				<view class="imageView">
					<image class="imageS" v-if="stepsData.image !== null" v-for="(item,index) in stepsData.image" :key="index" :src="item" mode="aspectFill" @click="previewOpen(index)"></image>
				</view>
			</view>
			<view style="padding: 0 32rpx; margin-top: 16upx;">
				<text>问题内容：</text>
				<text>{{stepsData.content}}</text>
			</view>
		</u-form-item>
		
		<!-- 执行结果 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="处理结果" :border-bottom="false" prop="name" v-if="stepsData.order_state == '已完成'">
			<view style="padding: 0 32rpx;"><text>内容：</text>{{stepsData.result}}</view>
		</u-form-item>
		
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>
		
		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.order_state == '已派员'">
			<view class="buttonView1 " hover-class="btn_Click" @click="TelephoneClick">联系申请人</view>
			<view class="buttonView2 " hover-class="btn_Click" @click="cancelShow = true" >提交结果</view>
		</view>
		
		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.order_state !== '已派员'">
			<view class="buttonView3" style="width: 100%;" hover-class="btn_Click" @click="TelephoneClick">联系申请人</view>
		</view>
		
		<!-- 提交弹框 -->
		<u-popup v-model="cancelShow" mode="bottom" :closeable="true" >
			<view class="box_Vlew">
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">请填写/选择处理结果</text>
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
					<text class="box_refundButton" @click="Submit">确认</text>
				</view>
			</view>
		</u-popup>
		
		<previewImage ref="previewImage" :opacity="0.8"  :imgs="stepsData.image" ></previewImage>
	</view>
</template>

<script>
	import uniSteps from '../components/uni-steps/uni-steps.vue'; //引入时间轴
	import previewImage from '../components/kxj-previewImage/kxj-previewImage.vue'; //图片预览
	export default {
		components:{
			uniSteps, //声明时间轴组件
			previewImage //声明图片预览组件
		},
		data() {
			return {
				stepsList : [{
					title:'待处理'
				},{
					title:'处理中'
				},{
					title:'已处理'
				}], //时间轴的标题数组
				stepsList2 : [{
					title:'待处理'
				},{
					title:'处理中'
				},{
					title:'已取消'
				}], //时间轴的标题数组
				StepsIndex: -1, //绿条时间轴的下标数值		
				stepsData : '',//存放任务数据
				
				id : '', //任务id
				cancelShow : false,//提交弹框默认值
				contentInputData : '',//输入框内容
				contentList : ['问题已处理','问题较为困难','任务需加派人员','任务需要配合'],//可选失败内容
				
				//----------------uview样式--------------------------
				customStyle: {
					fontWeight: 'bold',
					fontSize: '17px',
					marginTop : '24rpx',
					padding: '0rpx 16px',
				},
				labelPosition: 'right',
			
			}
		},
		
		onLoad:function(e){
			uni.showLoading({
				title: '加载数据中...'
			})
			this.id = e.id;
			this.userData();
		},
		onPullDownRefresh: function() {
			this.loadData();
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
							title:'加载个人信息失败',
							icon:'none'
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
						if (res.data.data.order_state == '已派员') {
							this.StepsIndex = 1
						} else if (res.data.data.order_state == '已完成' || res.data.data.order_state == '已取消') {
							this.StepsIndex = 2
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
			
			
			//拨打申请人电话
			TelephoneClick:function(){
				uni.makePhoneCall({
					phoneNumber: this.stepsData.telephone
				})
			},
			
			//点击放大图片
			previewOpen:function(e) {
				console.log(e);
				this.$refs.previewImage.open(e); // 传入当前选中的图片地址或序号
			},
			
			//点击插入文字
			choiseListData:function(e){
				var a = this.contentList[e]+'，';
				var b = this.contentInputData;
				var c = b.concat(a)
				this.contentInputData = c;
			},
			
			//提交
			Submit:function(){
				uni.request({
					url: this.$pyfw.KyInterface.uploadResult.Url,
					method: this.$pyfw.KyInterface.uploadResult.method,
					data: {
						id: this.id,
						commissionerId : this.stepsData.manager_id,
						result : this.contentInputData,
					},
					success: (res) => {
						console.log(res)
						if(res.data.status){
							uni.hideLoading()
							uni.showToast({
								title:'提交成功',
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
						uni.stopPullDownRefresh()
						uni.showToast({
							title:'提交数据失败，下拉刷新重试',
							icon:'none'
						})
					}
				})
			}
			
			
		}
	}
</script>

<style lang="scss">
	//按钮样式
	.operButton{
		display: flex; 
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;
		.buttonView1{
			width: 35%; 
			background: #F5F5F5; 
			color: #333333;
			font-size: 26upx; 
			line-height: 3.5;
		}
		.buttonView2{
			width: 65%; 
			background: #18B566; 
			color: #FFFFFF;
			font-size: 32upx; 
			line-height: 3;
		}
		
		.buttonView3{
			width: 100%; 
			background: #18B566; 
			color: #FFFFFF;
			font-size: 32upx; 
			line-height: 3;
		}
	}
	
	//图片样式
	.imageView{
		display: flex;
		.imageS{
			display: block; 
			width: 212upx; 
			height: 212upx;
			margin-right: 20upx;
		}
	}
	
	
	//提交弹框
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
</style>
