<template>
	<view>
		<!-- 用户反馈 -->
		<view class="user-talk" v-if="show">
			<view class="top-text">
				用户反馈
			</view>
			<view v-for="(item,index) in feedList" :key="index" :class="index==0?'':'bt'" class="mb">
				<view class="user-talkinfo">
					<image :src="headImg" class="user-topimage"></image>
					<text class="user-name">{{userName}}</text>
					<text class="user-time">{{formateTime(item.SuggestionTime)}}</text>
				</view>
				<view class="talkinfo">
					{{item.Suggestion}}
				</view>
				<view class="huifu" v-if="item.IsReply">
					<view class="huifu-view">
						<text class="huifu-user">{{item.Responder}}:</text>
						<text class="huifu-info">{{item.ReplyContent}}</text>
					</view>
					<view class="huifu-time">
						{{formateTime(item.ReplyTime)}}
					</view>
				</view>
				<!-- <view class="typeInfo">
					<view class="itemClass" v-for="(item1,index1) in item.typeList" :key="index1">
						{{item1}}
					</view>
				</view> -->
			</view>
		</view>
		
		<view class="noneData" v-if="!show">
			<!-- 您当前暂无反馈 -->
			<u-empty text="您当前暂无反馈" mode="list"></u-empty>
		</view>
		
		<view class="boxClass">
			<button class="feedClass btn_background" @click="feedClick">前往反馈</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,		//是否显示
				feedList:[],	//反馈列表	
				userName:'',	//用户昵称
				headImg:'',		//用户头像
				userId:'',		//用户id
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:'反馈列表',
			})
			const userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo == ""){
				uni.showToast({
					title: '您当前暂未登录',
					icon:'none',
				});
			}else{
				this.userName = userInfo.nickname;
				this.headImg = userInfo.portrait;
				this.userId = userInfo.userId;
			}
		},
		onShow() {
			this.loadFeedList();
		},
		methods: {
			//----------------------------加载反馈列表----------------------------
			loadFeedList(){
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url: this.$GrzxInter.Interface.GetMySuggestionList.value,
					method: this.$GrzxInter.Interface.GetMySuggestionList.method,
					data: {
						userID : this.userId,
					},
					success: res => {
						console.log(res);
						if(res.data.data.length > 0){
							this.show = true;
						}else{
							this.show = false;
						}
						this.feedList = res.data.data;
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
				
			},
			
			//---------------------------------前往反馈---------------------------------
			feedClick(){
				uni.navigateTo({
					url:'./Feedback'
				})
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

	.search-view {
		background-color: #FFFFFF;
		margin: 30upx;
		display: flex;
		flex-direction: row;
		border-radius: 24upx;
		padding: 26rpx 28rpx;
	}

	.search-image {
		width: 34upx;
		height: 34upx;
		padding-top: 6upx;
		padding-right: 10upx;
	}

	.search-input {
		
	}

	.guess-view {
		margin: 0upx 30upx 30upx 30upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.top-text {
		font-size: 34upx;
		font-weight: bold;
		color: #333333;
		margin-left: 29upx;
		padding-top: 30upx;
	}

	.guess-middle {
		width: 504upx;
		margin-left: 29upx;
		margin-top: 14upx;
	}
	
	.jiantou{
		width: 28upx;
		height: 13upx;
	}

	.btnClass{
		margin-left: 310upx;
		margin-top: 20upx;
		padding-bottom: 10upx;
	}

	.text-list{
		margin-top: 30upx;
	}

	.chatu {
		margin-left: 28upx;

	}

	.npzhcx-image {
		width: 694upx;
		height: 229upx;
	}

	.user-talk {
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 25upx;
		padding-bottom: 15upx;
		margin-bottom: 140upx;
	}

	.user-topimage {
		width: 72upx;
		height: 72upx;
		border-radius: 50%;
		margin-top: 7upx;
	}

	.user-talkinfo {
		padding-left: 30upx;
		padding-top: 30upx;
		display: flex;
	}

	.user-name {
		font-size: 32upx;
		color: #333333;
		padding-left: 20upx;
		width: 40%;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.user-time {
		font-size: 28upx;
		color: #999999;
		margin-top: 3upx;
		margin-left: 10%;
	}

	.talkinfo {
		width: 544upx;
		margin-left: 124upx;
		font-size: 34upx;
		color: #9F9C9F;
	}

	.user-image-view {
		margin-left: 108upx;
		margin-top: 40upx;
	}

	.user-image {
		width: 200upx;
		height: 220upx;
		margin-left: 20upx;
	}

	.huifu {
		width: 77%;
		background-color: #F5F9FC;
		margin-left: 124upx;
		margin-top: 25upx;
		border-radius: 20upx;
	}

	.huifu-view {
		padding: 27upx 27upx 10upx 27upx;
		text-align: justify;
	}

	.huifu-user {
		font-size: 30upx;
		color: #576B95;
	}

	.huifu-info {
		font-size: 30upx;
		color: #999999;
	}
	
	.huifu-time{
		font-size: 30upx;
		color: #999999;
		padding:0 0 10upx 27upx;
	}

	.pinglun-image-view {
		margin-left: 420upx;
	}

	.pinglun-image {
		width: 129upx;
		height: 129upx;
	}
	.fontSize{
		font-size: 30upx;
	}
	
	.typeInfo{
		display: flex;
		flex-direction: row;
		margin: 20upx 0 10upx 15%;
	}
	.itemClass{
		font-size: 24upx;
		padding: 10upx 20upx;
		background-color: #e7e7e7;
		border-radius: 30upx;
		margin-left: 20upx;
	}
	.mb{
		margin-bottom: 25upx;
	}
	.bt{
		border-top: 1upx solid #e6e6e6;
	}
	
	.boxClass{
		width: 100%;
		position: fixed;
		bottom: 0upx;
		left: 0%;
		background-color: #F4F6F8;
	}
	.feedClass{
		width: 90%;
		margin: 20upx 5%;
		color: #FFFFFF;
	}
	.noneData{
		color: #5a5a5b;
		display: flex; 
		justify-content: center;
		margin-top: 400upx;
	}
</style>
