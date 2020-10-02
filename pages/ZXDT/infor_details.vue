<template>
	<view class="container">
		<view class="title">
			<rich-text :nodes="information.Title"></rich-text>
		</view>
		<view class="time">
			<text>邵泰官方</text>
			<text style="margin-left: 20upx;">{{formatTime(information.CreateTime)}}</text>
			<!-- <text style="margin-left:24upx;" :v-if="information.author !==''">{{information.author}}</text> -->
		</view>
		<view class="content">
			<rich-text :nodes="information.ContentDetail" style="width: 700rpx;"></rich-text>
		</view>
		<view class="count">
		   <text>游览量：{{information.count}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information:{
					Title:'',
					CreateTime:'',
					ContentDetail:'',
					count : '',
				},
				aid : '',
				imageText : '', //图文
			}
		},
		onLoad:function(e) {
			console.log(e.AID)
			this.loadData(e.AID); 
		},
		methods: {
			//------------------获取资讯详情----------------
			loadData:function(e){
				uni.request({
					url: this.$home.KyInterface.GetNewsByAID.Url,
					method:this.$home.KyInterface.GetNewsByAID.method,
					data:{
						AID : e
					},
					success: (res) => {
						this.information.Title = res.data.data[0].Title;
						this.information.CreateTime = res.data.data[0].CreateTime;
						this.information.count = res.data.data[0].ViewCount;
						this.information.ContentDetail = res.data.data[0].Body.replace(/\< img/g, '<img ');
						this.information.ContentDetail = this.information.ContentDetail.replace(/\<img/g, '<img style="max-width:100%;height:auto;"');
						this.information.ContentDetail = this.information.ContentDetail.replace(/\ style="/g, ' style="max-width:100%;');
						console.log(res)
					},
					fail:function(){
						uni.showToast({
							title:'网络异常，获取资讯失败',
							icon:'none'
						})
					}
				})
			},
			
			//--------------------时间格式化--------------------
			formatTime: function(time) {
				var dateTime = time.replace('T', ' ').slice(0,16);
				if (dateTime.indexOf('1900') > -1) {
					return '';
				} else {
					return dateTime;
				}
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
