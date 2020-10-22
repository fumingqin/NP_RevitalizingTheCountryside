<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex"></uni-steps>
		</view>
		
		<!-- 申请信息 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="申请信息" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>申请乡村：</text>东店村</view>
			<view style="padding: 0 32rpx;"><text>申请人：</text>你老大</view>
			<view style="padding: 0 32rpx;"><text>联系电话：</text>13489208672</view>
		</u-form-item>
		
		
		<!-- 问题内容 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="问题内容" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>问题类型：</text>设备故障</view>
			<view style="padding: 0 32rpx;">
				<text>相关图片：</text>
				<view class="imageView">
					<image class="imageS" v-for="(item,index) in imageList" :key="index" :src="item" mode="aspectFill" @click="previewOpen(index)"></image>
				</view>
			</view>
			<view style="padding: 0 32rpx; margin-top: 16upx;">
				<text>问题内容：</text>
				<text>设备故障设备故障设备故障设备故障设备故障设备故障设备故障设备故障设备故障设备故障</text>
			</view>
		</u-form-item>
		
		<!-- 执行结果 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="处理结果" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>内容：</text>无</view>
		</u-form-item>
		
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>
		
		<!-- 功能按钮 -->
		<view class="operButton">
			<view class="buttonView1 " hover-class="btn_Click" @click="TelephoneClick">联系申请人</view>
			<view class="buttonView2 " hover-class="btn_Click">提交结果</view>
		</view>
		
		<previewImage ref="previewImage" :opacity="0.8"  :imgs="imageList" :descs="descs" @longPress="longPress"></previewImage>
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
				imageList : ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603272374&di=485322939ce9c34f2e9d0ac64cf07fa6&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603282456065&di=b27df0ee0e13d05059bd0fd410417c55&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603282456065&di=41b9dbd27607b4b9e21e02148a7b5507&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg'],
				stepsList : [{
					title:'待处理'
				},{
					title:'处理中'
				},{
					title:'已处理'
				}], //时间轴的标题数组
				StepsIndex : 0 , //时间轴的下标数值		
						
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
		methods: {
			//拨打申请人电话
			TelephoneClick:function(){
				uni.makePhoneCall({
					phoneNumber:'13489208672'
				})
			},
			
			previewOpen:function(e) {
				console.log(e);
				this.$refs.previewImage.open(e); // 传入当前选中的图片地址或序号
			},
			
			//长按事件
			longPress(data) {
				console.log(data);
				uni.showModal({
					showCancel: false,
					title: '长按事件',
					content: '已触发长按事件,你可以在这里做更多',
					success: showResult => {
						
					}
				});
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
	
</style>
