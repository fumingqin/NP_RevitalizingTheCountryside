<template>
	<view>
		<!-- 问题描述 -->
		<view class="problem-info">
			<view class="top-text">
				建议描述
			</view>
			<!-- 建议描述文本域 -->
			<view class="problem-textare-view">
				<textarea v-model="complaintInfo" class="problem-textare" placeholder="请描述问题，更快帮您解决问题" maxlength="500" @input="Inputtext" />
			</view>
			<!-- 字数统计 -->
			<view class="top-view-bottomtext">
				{{textmarn}}/500字
			</view>
		</view>
		<!-- 提交 -->
		<view class="btnClass btn_background" @click="successClick">提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			complaintInfo:'',
			openType1:false,//默认不开启列表
			openType2:false,//默认不开启列表
			textmarn:0,//字数
			btncheck:false,//默认提交按钮样式
			userInfo:'',	//用户信息
			
			DriverID : '2000001',		//司机ID
			DriverName:'测试司机',		//司机姓名
			OrderID: '100000',			//订单ID
		}
	},
	onLoad(options){
		uni.setNavigationBarTitle({
			title:'我的投诉',
		})
		uni.getStorage({
			key:'userInfo',
			success: res => {
				this.userInfo = res.data;
			}
		})
		this.DriverID = options.driverID;
		this.DriverName = options.driverName;
		this.OrderID = options.orderID;
	},
	methods: {
		//字数统计
		Inputtext:function(e){
			this.textmarn=e.detail.cursor; 
		},
		successClick:function(e){
			if(this.complaintInfo == ""){
				uni.showToast({
					icon:'none',
					title:'请先描述问题'
				})
			}else{
				console.log(this.userInfo.userId);
				uni.request({
					url: this.$GrzxInter.Interface.Add_Complaint.value,
					method: this.$GrzxInter.Interface.Add_Complaint.method,
					data: {
						UserID : this.userInfo.userId,		//用户id
						ComplaintContent : this.complaintInfo,		//投诉内容
						Phone : this.userInfo.phoneNumber,	//用户手机号
						DriverID : this.DriverID,		//司机ID
						DriverName:this.DriverName,					//司机姓名
						OrderID: this.OrderID,				//订单ID
						AppType : this.$GrzxInter.systemConfig.openidtype,	//应用类型
						ProjectCode : this.$GrzxInter.systemConfig.applyName,		//项目名称
					},
					success: res => {
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						});
						if(res.data.status){
							setTimeout(function(){
								uni.navigateBack();
							},500)
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络连接失败',
							icon:'none'
						});
					},
				});
			}
		}
	}
}
</script>

<style>
	page {
		background-color: #F4F6F8;
	}
	.problem-info{
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin:20rpx 28rpx;
	}
	.problem-textare-view{
		margin-left: 30upx;
		margin-top: 10upx;
	}
	.problem-textare{
		width: 634upx;
		height: 250upx;
		font-size: 32upx;
	}
	.top-view-bottomtext{
		font-size: 28upx;
		color: #AAAAAA;
		text-align: right;
		padding: 40upx;
	}
	.top-text {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		padding-bottom: 10upx;
		font-weight: bold;
	}
	
	.btnClass{
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		padding: 30upx 0;
		color: #FFFFFF;
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 30rpx;
	}
	.jiantou{
		width: 28upx;
		height: 13upx;
	}
	.shangjiantou{
		margin-top: 20upx;
		margin-left: 302upx;
		padding-bottom: 20upx;
	}
	.jiantou1{
		margin-top: 10upx;
		margin-left: 325upx;
		padding-bottom: 10upx;
	}
</style>
