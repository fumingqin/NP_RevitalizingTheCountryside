<template>
	<view class="container">
		<view class="title">
			<rich-text :nodes="listTitle.title"></rich-text>
		</view>
		<view class="time">
			<text>官方人员</text>
			<text style="margin-left: 20upx;">{{formatTime(listTitle.create_time)}}</text>
			<!-- <text style="margin-left:24upx;" :v-if="information.author !==''">{{information.author}}</text> -->
		</view>
		<view class="content">
			<rich-text :nodes="listTitle.content" style="width: 700rpx;"></rich-text>
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
				listTitle:[],
				aid : '',
				imageText : '', //图文
			}
		},
		onLoad:function() {
			this.loadData();
		},
		methods: {
			//------------------获取资讯详情----------------
			loadData:function(e){
				uni.getStorage({
					key: 'listTitleData',
					success: (res) => {
						console.log(res)
						this.listTitle=res.data;
					},
					fail: () => {
						
					}
				})
			},
			
			//--------------------时间格式化--------------------
			formatTime: function(e) {
				// console.log(e)
				var tsetDate = e.replace('T', ' ')
				var a = tsetDate.substr(0, 16)
				return a;
			},
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
