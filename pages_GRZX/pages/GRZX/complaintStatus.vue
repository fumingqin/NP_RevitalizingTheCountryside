<template>
	<view>
		<view class="progress">
			<view class="top-text">
				审核进度
			</view>
			<view class="progress-status">
				<uni-steps :options="options" direction="column" :active='active'></uni-steps>
			</view>
		</view>
		
		<view class="type">
			<view class="top-text">
				类别
			</view>
			<view class="type-text">
				{{cm_Detail.ProjectType}}
			</view>
		</view>
		
		<view class="complaintinfo">
			<view class="top-text">
				投诉内容
			</view>
			<view class="complaintinfo-text">
				{{cm_Detail.ComplaintContent}}
			</view>
		</view>
		
		<view class="backinfo" v-if="cm_Detail.IsReply">
			<view class="top-text">
				回复内容 
			</view>
			<view class="complaintinfo-text">
				{{cm_Detail.ReplyContent}} 
			</view>
		</view>
		<view class="backinfo" v-if="cm_Detail.IsReply">
			<view class="top-text">
				回复时间 
			</view>
			<view class="complaintinfo-text">
				{{formateTime(cm_Detail.ReplyTime)}} 
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/pages_GRZX/components/GRZX/uni-steps/uni-steps2.vue'
	export default {
		data() {
			return {
				active:0,//控制审核状态的显示
				options: [{
					title: '已提交',
				},
				{
					title: '审核中',
				},
				{
					title: '投诉结果',
				}],
				cm_Detail:'', //投诉详情
			}
		},
		components: {
			uniSteps
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:'投诉详情',
			})
			uni.getStorage({
				key:'complaintDetail',
				success:res=>{
					this.cm_Detail = res.data;
					this.load();
					uni.removeStorageSync('complaintDetail');
				},
				fail: () => {
					uni.showToast({
						title: '获取投诉详情失败',
						icon:'none'
					});
				}
			})
		},
		methods: {
			load(){
				if(this.cm_Detail.IsReply){
					this.options[2].title="投诉成功";
					this.active=2;
				}
			},
			
			//---------------------------------格式化时间---------------------------------
			formateTime(time){
				let date=time.replace('T',' ');
				return date.substring(0,16);
			},
		}
	}
</script>

<style>
	page {
		background-color: #F4F6F8;
	}

	.progress {
		margin: 30upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.progress-status {
		margin-left: 4upx;
		margin-top: 20upx;
	}

	.top-text {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		font-weight: 551;
	}

	.type {
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 25upx;
	}

	.complaintinfo {
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 25upx;
	}

	.backinfo {
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 25upx;
	}

	.type-text {
		font-size: 32upx;
		color: #999999;
		margin-left: 32upx;
		margin-top: 20upx;
	}

	.complaintinfo-text {
		font-size: 32upx;
		color: #333333;
		text-align: justify;
		color: #606264;
		line-height: 50upx;
		padding: 16rpx 32rpx 0 32rpx;
	}
</style>
