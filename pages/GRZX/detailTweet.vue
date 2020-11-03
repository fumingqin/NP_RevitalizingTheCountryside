<template>
	<view class="container">
		<view class="title">
			<rich-text style="font-weight: bold;" :nodes="information.title"></rich-text>
		</view>
		<view class="time">
			<text>{{information.create_time}}</text>
			<!-- <text style="margin-left:24upx;" :v-if="information.author !==''">{{information.author}}</text> -->
		</view>
		<view class="content">
			<rich-text :nodes="information.content" style="width: 700rpx;"></rich-text>
		</view>
		<!-- <view class="count">
		   <text>游览量：{{information.count}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information:{
					title:'',
					create_time:'',
					content:'',
				},
				aid : '',
				imageText : '', //图文
			}
		},
		onLoad() {
			this.getArticleInfo(); 
		},
		onUnload() { //页面关闭时执行
			//------------------清除detailTweet缓存----------------
			uni.removeStorageSync('detailTweet');
		},
		methods: {
			//------------------获取资讯详情----------------
			getArticleInfo:function(){
				var that=this;
				uni.getStorage({
					key:'detailTweet',
					success:(res) =>{
						that.information.title = res.data.title;
						that.information.create_time = res.data.create_time;
						console.log(res.data.content);
						that.information.content = res.data.content.replace(/\< img/g, '<img ');
						that.information.content = that.information.content.replace(/\<img/g, '<img style="max-width:100%;height:auto;"');
						that.information.content = that.information.content.replace(/\ style="/g, ' style="max-width:100%;');
						console.log(that.information.content);
					},
				})	
			}
		},
	}
</script>

<style lang="scss">
	img{
		width: 100rpx;
	}
	.container {
		display: flex;
		flex-direction: column;
		.title{
			font-size: 40upx;  
			padding: 32upx 32upx;
		}
		.time {
			display: flex; 
			font-size: 30upx; 
			margin-left: 32upx;
			color: #888;
		}
		.imageView{
			padding: 0upx 32upx;
			margin-top: 24upx;
			image{
				width: 686upx;
			}
		}
		
		.content {
			display: flex; 
			padding: 32upx 32upx; 
			font-size: 33upx; 
			letter-spacing: 4upx; 
			line-height: 48upx; 
			color: #444;
			text-align: justify;
		}
		
		.count {
			margin: 32upx; 
			font-size: 30upx;
		}
	}

	
</style>
