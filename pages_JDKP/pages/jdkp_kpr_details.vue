<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex" v-if="stepsData.state == '已发布' || stepsData.state == '已完成'"></uni-steps>
			<uni-steps :options="stepsList2" :active="StepsIndex" v-if="stepsData.state == '已取消'" activeColor="#FA3534"></uni-steps>
		</view>
		
		
		<!-- 申请信息 -->
		<view class="deta_view">
			<view class="deta_title">考评信息</view>
			<view class="deta_text"><text>考评标题：</text>{{stepsData.title}}</view>
			<view class="deta_text"><text>考评乡村：</text>{{stepsData.rural_name}}</view>
			<view class="deta_text"><text>考评时间：</text>{{informationDate(stepsData.reviewTime)}}</view>
			<view class="deta_text">
				<text style="color: #FA3534;">考评内容：（以下）</text>
				<view style="width: 100%; height: 24upx;"></view>
				<rich-text :nodes="stepsData.content"></rich-text>
			</view>
		</view>
		
		
		<!-- 发布人信息 -->
		<view class="deta_view">
			<view class="deta_title">发布人信息</view>
			<view class="deta_text"><text>发布人：</text>{{stepsData.nick_name}}</view>
			<view class="deta_text"><text>发布时间：</text>{{informationDate(stepsData.update_time)}}</view>
			<view class="deta_text"><text>发布人电话：</text>{{stepsData.phoneNumber}}</view>
		</view>
		<!-- <view class="deta_view">
			<view class="deta_title">问题信息</view>
			<view class="deta_text"><text>问题类型：</text>{{stepsData.apply_type}}</view>
			<view class="deta_text">
				<text>相关图片：</text><text v-if="stepsData.image == null">未上传</text>
				<view class="imageView">
					<image class="imageS" v-if="stepsData.image !== null" v-for="(item,index) in stepsData.image" :key="index" :src="item"
					 mode="aspectFill" @click="previewOpen(index)"></image>
				</view>
			</view>
			<view class="deta_text"><text>问题内容：</text>{{stepsData.content}}</view>
		</view> -->
		
		<!-- 执行结果 -->
		<view class="deta_view" v-if="StepsIndex == 2">
			<view class="deta_title">考评结果</view>
			<view class="deta_text"><text>分数：</text>{{stepsData.score}}分</view>
		</view>
		
		
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>
		
		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.state == '已发布'">
			<view class="buttonView1 " hover-class="btn_Click" @click="TelephoneClick">联系发布人</view>
			<view class="buttonView2 " hover-class="btn_Click" @click="cancelShowClick" >提交评分</view>
		</view>
		
		<!-- 功能按钮 -->
		<view class="operButton" v-if="stepsData.state !== '已发布'">
			<view class="buttonView3" style="width: 100%;" hover-class="btn_Click" @click="TelephoneClick">联系发布人</view>
		</view>
		
		<!-- 提交弹框 -->
		<u-popup v-model="cancelShow" mode="bottom" :closeable="true" >
			<view class="box_Vlew">
				<view class="box_refundView">
					<view class="box_refundContentView">
						<text class="box_refundContentTitle">请为本次考评打分</text>
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
					<input class="inputStyle" v-model="contentInputData" type="number" placeholder="填写/选择失败原因"/>
				</view>
				
				<!-- 确认按钮 -->
				<view class="box_refundButtonView">
					<text class="box_refundButton" @click="Submit">确认</text>
				</view>
			</view>
		</u-popup>
		
		<!-- <previewImage ref="previewImage" :opacity="0.8"  :imgs="stepsData.image" ></previewImage> -->
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
					title:'待考评'
				},{
					title:'考评中'
				},{
					title:'已考评'
				}], //时间轴的标题数组
				stepsList2 : [{
					title:'待考评'
				},{
					title:'考评中'
				},{
					title:'已取消'
				}], //时间轴的标题数组
				StepsIndex: -1, //绿条时间轴的下标数值		
				stepsData : '',//存放任务数据
				
				id : '', //任务id
				cancelShow : false,//提交弹框默认值
				contentInputData : '',//输入框内容
				contentList : ['100','90','80','70','60','50','40','30','20','10','0'],//可选失败内容
			
			}
		},
		
		onLoad:function(e){
			this.id = e.id;
		},
		onShow:function(){
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
					url: this.$jdkp.KyInterface.getEvaluationDetailByID.Url,
					method: this.$jdkp.KyInterface.getEvaluationDetailByID.method,
					data: {
						id: this.id
					},
					success: (res) => {
						console.log(res)
						this.stepsData = res.data.data;
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
							title:'加载数据失败，刷下拉刷新重试',
							icon:'none'
						})
					}
				})
			},
			
			
			//拨打申请人电话
			TelephoneClick:function(){
				if(this.stepsData.phoneNumber == ''){
					uni.showToast({
						title:'相关发布人电话错误，请联系客服处理',
						icon:'none'
					})
				}else{
					uni.makePhoneCall({
						phoneNumber: this.stepsData.phoneNumber
					})
				}
				
			},
			
			//打开评分弹框
			cancelShowClick:function(){
				this.cancelShow = true;
			},
			
			//点击放大图片
			previewOpen:function(e) {
				console.log(e);
				this.$refs.previewImage.open(e); // 传入当前选中的图片地址或序号
			},
			
			//点击插入文字
			choiseListData:function(e){
				var a = this.contentList[e];
				var b = this.contentInputData;
				var c = b.concat(a)
				this.contentInputData = c;
			},
			
			//提交
			Submit:function(){
				uni.showLoading({
					title:'提交中...'
				})
				uni.request({
					url: this.$jdkp.KyInterface.addScore.Url,
					method: this.$jdkp.KyInterface.addScore.method,
					data: {
						id: this.id,
						examinerId : this.stepsData.examinerId,
						score : this.contentInputData,
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
			},
			
			//资讯时间
			informationDate: function(e) {
				console.log(e)
				// var tsetDate = e.replace('T',' ')
				if(e !== undefined){
					var a = e.substr(0, 10)
					return a;
				}else{
					return '';
				}
				
			},
			
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
		margin-top: 20upx;
		.imageS{
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
</style>
