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
		
		<!-- 特派员信息 -->
		<u-form-item :label-style="customStyle" :label-position="labelPosition" label="执行结果" :border-bottom="false" prop="name">
			<view style="padding: 0 32rpx;"><text>姓名：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>电话：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>技术类型：</text>这是我的家</view>
			<view style="padding: 0 32rpx;"><text>擅长内容：</text>这是我的家</view>
		</u-form-item>
		
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

</style>
