<template>
	<view>
		<view style="padding: 32upx 0;">
			<uni-steps :options="stepsList" :active="StepsIndex"></uni-steps>
		</view>
		
		<!-- 申请信息 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="申请信息" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>问题类型：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>问题内容：</text>这是我的家</view>
		</u-form-item>
		
		
		<!-- 特派员信息 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="特派员信息" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>姓名：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>电话：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>技术类型：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>擅长内容：</text>这是我的家</view>
		</u-form-item>
		
		<!-- 执行结果 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="执行结果" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>内容：</text>这是我的家</view>
		</u-form-item>
		
		<!-- 失败原因 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="失败原因" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>内容：</text>这是我的家</view>
		</u-form-item>
		
		<!-- 防触底空模块 -->
		<view style="width: 100%; height: 112upx;"></view>
		
		<!-- 功能按钮 -->
		<view class="operButton">
			<view class="buttonView1 " hover-class="btn_Click">取消申请</view>
			<view class="buttonView2 " hover-class="btn_Click">提醒派员</view>
		</view>
		
		
	</view>
</template>

<script>
	import uniSteps from '../components/uni-steps/uni-steps.vue'; //引入时间轴
	export default {
		components:{
			uniSteps //声明时间轴组件
		},
		data() {
			return {
				stepsList : [{
					title:'申请中'
				},{
					title:'执行中'
				},{
					title:'已完成'
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
			
		}
	}
</script>

<style lang="scss">
	.operButton{
		display: flex; 
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 96upx;
		text-align: center;
		.buttonView1{
			width: 25%; 
			background: #F5F5F5; 
			color: #333333;
			font-size: 26upx; 
			line-height: 3.5;
		}
		.buttonView2{
			width: 75%; 
			background: #18B566; 
			color: #FFFFFF;
			font-size: 32upx; 
			line-height: 3;
		}
	}
</style>
